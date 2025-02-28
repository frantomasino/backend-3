import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mocksRouter from "./routes/mocks.router.js";
import logger from "./utils/logger.js"; 
import { swaggerUi, swaggerSpecs } from "./docs/swagger.js"; 

dotenv.config();

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  logger.http(`📢 ${req.method} ${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.send("🚀 ¡Bienvenido a mi API! Usa /api/mocks para ver los datos.");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("✅ Conectado a MongoDB");


    app.use("/api/mocks", mocksRouter);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); 


    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      logger.info(`🚀 API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`❌ Error al conectar a MongoDB: ${err.message}`);
  });

export default app;
