import winston from "winston";
import dotenv from "dotenv";

dotenv.config();  

const environment = process.env.NODE_ENV || "development";  

const logger = winston.createLogger({
  level: environment === "production" ? "warn" : "debug",  
  transports: [
    new winston.transports.Console({
      level: environment === "production" ? "warn" : "http",  
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),

    new winston.transports.File({
      filename: "logs/combined.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default logger;
