import express = require("express");
import { getConnection } from "typeorm";

import { Plant } from "../entity";

// @POST - baseUrl/plants
export async function createPlant(req: express.Request, res: express.Response) {
  try {
    const { reading } = req.body;
    const plantRepository = getConnection().getRepository(Plant);

    const newPLant = new Plant();

    newPLant.reading = reading;

    await plantRepository.save(newPLant);

    return res.status(200).json({
      success: true,
      message: "New plant reading added",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @GET - baseUrl/plants
export async function getPlants(req: express.Request, res: express.Response) {
  try {
    const plantRepository = getConnection().getRepository(Plant);

    const [plants] = await plantRepository.findAndCount({
      select: ["id", "reading", "createdAt"],
    });

    return res.status(200).json({
      success: true,
      message: "All plants reading found",
      data: plants,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @GET - baseUrl/plants/last
export async function getLastPlant(
  req: express.Request,
  res: express.Response
) {
  try {
    const plantRepository = getConnection().getRepository(Plant);

    const perRequest: number = parseInt(<string>req.query.perRequest) || 1;

    const [lastPlant] = await plantRepository.findAndCount({
      select: ["id", "reading", "createdAt"],
      order: {
        ["createdAt"]: "DESC",
      },
      take: perRequest,
    });

    return res.status(200).json({
      success: true,
      message: "Last plant reading found",
      data: lastPlant,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}
