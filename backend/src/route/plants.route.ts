import { Router } from "express";

import {
  createPlantController,
  getPlantsController,
  getLastPlantController,
} from "../controller";

const plantRouter = Router();

plantRouter.route("/").get(getPlantsController).post(createPlantController);

plantRouter.route("/last").get(getLastPlantController);

export default plantRouter;
