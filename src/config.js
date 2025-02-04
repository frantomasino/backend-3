import dotenv from "dotenv";

 dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",  
};

export default config;
