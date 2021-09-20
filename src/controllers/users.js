const { v4: uuid } = require('uuid');
const path = require('path');
const userModels = require('../models/users');

const uploadImageHandler = async (req) => {
  if (req.files === null) {
    throw new Error('Image vehicles cannot be null');
  }

  const allowedExtension = ['.png', '.jpg', '.jpeg'];
  const { avatar: file } = req.files;
  const extension = path.extname(file.name);

  if (file.size > 3 * 1024 * 1024) {
    throw new Error('File size to large!');
  }

  if (!allowedExtension.includes(extension)) {
    throw new Error(`File type ${extension} are not supported!`);
  }

  const fileName = `${uuid().split('-').join('')}${extension}`;
  const outputPath = path.join(__dirname, `/../assets/images/${fileName}`);

  await file.mv(outputPath);

  return {
    message: 'Successfully uploaded',
    file_name: fileName,
  };
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await userModels.getUser(id);
    const month = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    const date = new Date(data[0].birth);
    const datetime = `${date.getFullYear()}-${month[date.getMonth()]}-${date.getDate()}`;
    data[0].birth = datetime;

    res.status(200);
    res.json({
      data,
    });
  } catch (error) {
    next(new Error(error.messsage));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {
      name, email, address, phone, gender, birth,
    } = req.body;
    const { id } = req.params;

    let image = '';
    if (req.files) {
      image = await uploadImageHandler(req);
    }

    const data = {
      name,
      email,
      address,
      phone,
      gender,
      birth: new Date(birth).toISOString().slice(0, 10),
      avatar: image.file_name,
    };

    await userModels.updateUser(id, data);

    res.status(200);
    res.json({
      message: 'Successfully update profile',
    });
  } catch (error) {
    next(new Error(error.messsage));
  }
};

module.exports = {
  getUser,
  updateUser,
};
