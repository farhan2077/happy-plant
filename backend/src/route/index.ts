import { Router } from "express";

import plantRouter from "./plants.route";

const router = Router();

router.use("/plants", plantRouter);

export default router;
