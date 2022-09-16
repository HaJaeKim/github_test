const { message } = require('statuses');
const {createLogger,transports,format} = require('winston');
const accessLogStream = require('./log');
const { combine, timestamp, simple, colorize, printf, label } = format;

const printFormat =  printf(({ timestamp, label, level, message }) =>{
    return `${timestamp} [${label}] ${level} : ${message}`;
 });

const printLogFormat = combine(
    label({
        label:"레이블 테스트",
    }),
     //colorize(),
     timestamp({
         format:"YYYY-MM-DD HH:mm:ss",
     }),
     //json()
     printFormat
 );

 const printLogFormat_Console = combine(
    colorize(),
    simple()
 );

 const opts = {
    file: new transports.File({
        filename: "access.log",
        dirname: "./logs", 
        level: "info",
        format: printLogFormat,
    }),
    console:  new transports.Console({
        level: "info",
        format: printLogFormat_Console,
    }),
 }

const logger = createLogger({
    transports: [opts.file],
});

if (process.env.NODE_ENV !== "production"){
    logger.add(opts.console);
}

logger.stream ={
    write: (message) => logger.info(message),
}

module.exports =  logger;