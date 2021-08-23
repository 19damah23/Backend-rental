const vehicleModels = require("../models/vehicles");
const categoryModels = require("../models/categories");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs/promises");

const uploadImageHandler = async (req) => {
  if (req.files === null) {
    throw new Error("Image vehicles cannot be null");
  }

  const files = req.files.images;

  const vehicleImages = [];

  if (Array.isArray(files)) {
    files.map((file) => {
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size to large!");
      }

      const allowedExtension = [".png", ".jpg", ".jpeg"];
      const extension = path.extname(file.name);
      const fileName = `${uuid().split("-").join("")}${extension}`;
      const outputPath = path.join(__dirname, `/../assets/images/${fileName}`);

      if (!allowedExtension.includes(extension)) {
        throw new Error(`File type ${extension} are not supported!`);
      }

      vehicleImages.push(fileName);

      file.mv(outputPath);
    });
  }

  if (Array.isArray(files) === false) {
    const allowedExtension = [".png", ".jpg", ".jpeg"];
    const { images: file } = req.files;
    const extension = path.extname(file.name);

    if (file.size > 2 * 1024 * 1024) {
      throw new Error(`File size to large!`);
    }

    if (!allowedExtension.includes(extension)) {
      throw new Error(`File type ${extension} are not supported!`);
    }

    const fileName = `${uuid().split("-").join("")}${extension}`;
    const outputPath = path.join(__dirname, `/../assets/images/${fileName}`);

    vehicleImages.push(fileName);

    await file.mv(outputPath);
  }

  return {
    message: "Successfully uploaded",
    file_name: vehicleImages,
  };
};

// Create new vehicle
const addVehicle = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(400)
        .send({ message: `You don't have access rights to add vehicle data!` });

    const { name, location, description, status, category, price, stock } =
      req.body;

    if (!name) return res.status(400).send({ message: "Name cannot be null!" });
    if (!location)
      return res.status(400).send({ message: "Location cannot be null!" });
    if (!description)
      return res.status(400).send({ message: "Description cannot be null!" });
    if (!status)
      return res.status(400).send({ message: "Status cannot be null!" });
    if (!category)
      return res.status(400).send({ message: "Category cannot be null!" });
    if (!price)
      return res.status(400).send({ message: "Price cannot be null!" });
    if (!stock)
      return res.status(400).send({ message: "Stock cannot be null!" });

    const images = await uploadImageHandler(req);

    const date = new Date();
    const datetime =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

    const data = {
      id: uuid().split("-").join(""),
      name,
      location,
      description,
      category,
      price,
      stock,
      status,
      images: JSON.stringify(images.file_name),
      createdAt: datetime,
      updatedAt: datetime,
    };

    await vehicleModels.addVehicle(data);

    res.status(201).send({
      message: "Created new vehicle!",
      data,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

// get All data vehicles
const getAllVehicles = async (req, res, next) => {
  try {
    let { search, perPage, orderBy, sortBy, page } = req.query;

    search = search || "";
    page = parseInt(page) || 1;
    perPage = parseInt(perPage) || 16;
    orderBy = orderBy || "name";
    sortBy = sortBy || "DESC";
    offset = (page - 1) * perPage;

    const allData = await vehicleModels.getAllVehicles(search);
    const totalData = allData.length;
    const totalPage = Math.ceil(totalData / perPage);

    const dataPaginate = await vehicleModels.getVehiclesWithPaginate(
      perPage,
      offset,
      orderBy,
      sortBy,
      search
    );

    if (dataPaginate.length) {
      const vehicles = [];

      for (let i = 0; i < dataPaginate.length; i++) {
        let vehicle = dataPaginate[i];
        const parse = JSON.parse(dataPaginate[i].images);
        vehicle.images = parse;

        vehicles.push(vehicle);
      }

      res.status(200);
      res.json({
        meta: {
          totalData,
          page,
          perPage,
          totalPage,
        },
        data: vehicles,
      });
    }

    if (!dataPaginate.length)
      return res.status(404).send({ message: "Data not found" });
  } catch (error) {
    next(new Error(error.message));
  }
};

// get vehicle by id
const getVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = await vehicleModels.getVehicle(id);
    const image = JSON.parse(vehicle[0].images);
    vehicle[0].images = image;

    res.status(200);
    res.json({
      data: vehicle,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

// delete vehicle
const deleteVehicle = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(400)
        .send({
          message: "you do not have access rights to delete product data",
        });

    const { id } = req.params;

    const images = await vehicleModels.getVehicle(id);
    const oldImages = JSON.parse(images[0].images);

    await vehicleModels.deleteVehicle(id);

    oldImages.map((img) => {
      fs.unlink(path.join(__dirname, `/../assets/images/${img}`)),
        (err) => {
          if (err) {
            console.log(err.message);
          }
        };
    });

    res.status(202);
    res.json({
      message: "Vehicle successfully deleted!",
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

// edit vehicle data
const editVehicle = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).send({
        message: "you do not have access rights to delete product data",
      });

    console.log(req.body)

    const { id } = req.params;
    const { name, location, description, status, category, price, stock } =
      req.body;

    if (!name) return res.status(400).send({ message: "Name cannot be null!" });
    if (!location)
      return res.status(400).send({ message: "Location cannot be null!" });
    if (!description)
      return res.status(400).send({ message: "Description cannot be null!" });
    if (!status)
      return res.status(400).send({ message: "Status cannot be null!" });
    if (!category)
      return res.status(400).send({ message: "Category cannot be null!" });
    if (!price)
      return res.status(400).send({ message: "Price cannot be null!" });
    if (!stock)
      return res.status(400).send({ message: "Stock cannot be null!" });
    if (!req.files && !req.body.images)
      return res.status(400).send({ message: "Images cannot be null" });

    let oldImages = [];
    if (req.body.images) {
      const image = req.body.images
      if (image.length > 1) {
        oldImages = req.body.images
      } else {
        oldImages = req.body.images.split(',');
      }
    }

    let newImages = [];
    if (req.files) {
      newImages = (await uploadImageHandler(req)).file_name;
      console.log((await uploadImageHandler(req)).file_name)
    }

    const images = oldImages.concat(newImages);
    const date = new Date();
    const datetime =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

    const data = {
      name,
      location,
      description,
      category,
      price,
      stock,
      status,
      images: JSON.stringify(images),
      updatedAt: datetime,
    };

    await vehicleModels.editVehicle(data, id);

    res.status(200).send({
      message: "Successfully update vehicle!",
      data,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

const gropedByType = async (req, res, next) => {
  try {
    let grouped = {}
    const resData = await vehicleModels.gropedByType()

    const data = [];

      for (let i = 0; i < resData.length; i++) {
        let vehicle = resData[i];
        const parse = JSON.parse(resData[i].images);
        vehicle.images = parse;

        data.push(vehicle);
      }
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].category in grouped) {
        grouped[data[i].category].push(data[i])
      } else {
        let temp = []
        temp.push(data[i])
        grouped[data[i].category] = temp
      }
    }

    let vehicles = Object.keys(grouped)

    for (let i = 0; i < vehicles.length; i++) {
      vehicles[i] = grouped[vehicles[i]]
    }
    
    res.status(200);
    res.json({
      data: vehicles
     });
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  addVehicle,
  getAllVehicles,
  getVehicle,
  deleteVehicle,
  editVehicle,
  gropedByType
};
