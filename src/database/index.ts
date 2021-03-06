import "reflect-metadata";
import { DataSource } from "typeorm";
import { Compliment } from "./entities/Compliment";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/database/database.sqlite",
  migrations: ["src/database/migrations/*.ts"],
  entities: [User, Tag, Compliment],
  synchronize: true,
  logging: false,
  // cli: {
  //   migrationsDir: "src/database/migrations",
  // },
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
