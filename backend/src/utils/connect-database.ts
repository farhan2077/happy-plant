import { createConnection } from "typeorm";

import { Plant } from "../entity/index";

export function connectDatabase() {
  return createConnection({
    type: "sqlite",
    database: "./db.sqlite",
    entities: [Plant],
    synchronize: true,
  });
}
