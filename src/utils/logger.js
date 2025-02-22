import winston from "winston";

const logger = winston.createLogger({
  level: 'info',  
  transports: [
    
    new winston.transports.Console({
      level: 'http',  
      format: winston.format.combine(
        winston.format.colorize(),  
        winston.format.simple()  
      ),
    }),

    new winston.transports.File({
      filename: 'logs/error.log', 
      level: 'error',  
      format: winston.format.combine(
        winston.format.timestamp(),  
        winston.format.json()  
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',  
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default logger;
