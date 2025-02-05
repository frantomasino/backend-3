import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/config.js";
import mocksRouter from "./routes/mocks.router.js";
import logger from "./utils/logger.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  logger.http(`📢 ${req.method} ${req.url}`);
  next();
});


 app.use("/api/mocks", mocksRouter);


 mongoose
  .connect(config.mongoURI)
  .then(() => logger.info(`✅ Conectado a MongoDB en modo ${config.nodeEnv}`))
  .catch((err) => logger.error(`❌ Error al conectar a la base de datos: ${err.message}`));


  const port = config.port;
app.listen(port, () => {
  logger.info(`🚀 Servidor corriendo en el puerto ${port} en modo ${config.nodeEnv}`);
});
