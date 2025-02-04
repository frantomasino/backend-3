import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import mocksRouter from './routes/mocks.router.js';  
import logger from "./utils/logger.js";  

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  logger.http(`📢 ${req.method} ${req.url}`);  
  next();
});


app.use('/api/mocks', mocksRouter);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info(`✅ Conectado a MongoDB en modo ${process.env.NODE_ENV}`))
  .catch((err) => logger.error(`❌ Error al conectar a la base de datos: ${err.message}`));


  const port = process.env.PORT || 8080;
app.listen(port, () => {
  logger.info(`🚀 Servidor corriendo en el puerto ${port}`);
});
