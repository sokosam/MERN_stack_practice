import env from "./util/validateEnv";
import mongoose from "mongoose";
import app from "./app";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_URI)
  .then(() => {
    console.log("Mongoose connected");

    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch(console.error);
