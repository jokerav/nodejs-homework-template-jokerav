const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { basedir } = global;
const { createError } = require(`${basedir}/helpers`);

const { User } = require(`${basedir}/models/user`);
const avatarsDir = path.normalize(`${basedir}/public/avatars`);

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, avatarName);

    Jimp.read(`${tempUpload}`)
      .then((img) => {
        return (
          img
            .resize(250, 250)
            // копируем картинку в папку /public/avatars
            .write(resultUpload)
        );
      })
      .catch(createError(500));
    // удаляем оригинал
    await fs.unlink(`${tempUpload}`);

    // вот здесь я не уверен какой путь лучше сохранять в БД, абсолютный или относительный
    const avatarURL = `../../public/avatars/${avatarName}`;

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
