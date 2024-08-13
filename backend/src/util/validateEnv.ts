import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";
import "dotenv/config";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_URI: str(),
  PORT: port(),
});
