import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });

const config = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET,  
};

export default config;
