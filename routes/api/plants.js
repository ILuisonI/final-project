const express = require("express");
const router = express.Router();
const PlantsServiceModel = require("../../model/plantsService/plantsService");
const normalizePlant = require("../../model/plantsService/helpers/normalizationplantService");
const {
  createPlantValidation,
  idPlantValidation } = require("../../validation/plantsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");

//http://localhost:8181/api/plants
router.get("/", async (req, res) => {
  try {
    const allPlants = await PlantsServiceModel.getAllPlants();
    res.json(allPlants);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/plants/my-plants
router.get("/my-plants",
  authmw,
  permissionsMiddleware(true, false, false, false),
  async (req, res) => {
    try {
      const allOwnPlants = await PlantsServiceModel.getPlantsByUserId(req.userData._id);
      res.json(allOwnPlants);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/plants/my-fav-plants
router.get("/my-fav-plants",
  authmw,
  async (req, res) => {
    try {
      const likedPlants = await PlantsServiceModel.getLikedPlants(req.userData._id);
      res.json(likedPlants);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/plants/my-cart
router.get("/my-cart",
  authmw,
  async (req, res) => {
    try {
      const plantsInCart = await PlantsServiceModel.getPlantsInCart(req.userData._id);
      res.json(plantsInCart);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/plants/:id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await idPlantValidation({ id });
    const plantFromDB = await PlantsServiceModel.getPlantById(id);
    res.json(plantFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/plants
router.post("/",
  authmw,
  permissionsMiddleware(true, false, false, false),
  async (req, res) => {
    try {
      let normalPlant = normalizePlant(req.body, req.userData._id);
      await createPlantValidation(normalPlant);
      await PlantsServiceModel.createPlant(normalPlant);
      res.json({ msg: "Plant Created Successfully" });
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/plants/:id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await idPlantValidation({ id });
    const plantFromDB = await PlantsServiceModel.getPlantById(id);
    await createPlantValidation(req.body);
    let editedPlant = normalizePlant(req.body, plantFromDB.user_id);
    await PlantsServiceModel.updatePlant(
      id,
      editedPlant
    );
    res.json({ msg: "Plant Edited Successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/plants/like-plant/:id
router.patch("/like-plant/:id",
  authmw,
  async (req, res) => {
    try {
      const id = req.params.id;
      await idPlantValidation({ id });
      let plant = await PlantsServiceModel.getPlantById(req.params.id);
      if (!plant) {
        res.json({ msg: "Could Not Find Plant!" });
      } else {
        await PlantsServiceModel.likePlant(
          plant,
          req.userData._id
        );
        res.json({ msg: "Plant Like Changed Successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/plants/add-to-cart/:id
router.patch("/add-to-cart/:id",
  authmw,
  async (req, res) => {
    try {
      const id = req.params.id;
      await idPlantValidation({ id });
      let plant = await PlantsServiceModel.getPlantById(req.params.id);
      if (!plant) {
        res.json({ msg: "Could Not Find Plant!" });
      } else {
        await PlantsServiceModel.addPlantToCart(
          plant,
          req.userData._id
        );
        res.json({ msg: "Plant Cart Changed Successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/plants/:id
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true, false),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idPlantValidation({ id });
      const plantFromDB = await PlantsServiceModel.deletePlant(req.params.id);
      if (plantFromDB) {
        res.json({ msg: "Plant Deleted Successfully" });
      } else {
        res.json({ msg: "Could Not Find The Plant" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;