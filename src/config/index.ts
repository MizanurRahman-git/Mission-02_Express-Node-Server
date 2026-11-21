import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT,
  connection_string: process.env.DATABASE_URL as string,
  secret_string : process.env.SECRET_KEY as string,
  refreshSecret_string : process.env.REFRESH_SECRET_KEY as string
};

export default config;
