const vehicleModels = require("../models/vehicles");
const { v4: uuid } = require("uuid");
const path = require("path");

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

      productImages.push(fileName);

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
    if (req.user.role != "admin")
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
    page = parseInt(page) || 1
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
      return res.status(404).send({ message: 'Data not found' });
  } catch (error) {
    next(new Error(error.message));
  }
};

module.exports = {
  addVehicle,
  getAllVehicles
};
