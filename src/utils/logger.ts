import * as config from 'config';
import * as winston from 'winston';

export class Logger {
  public static logInstance = null;
  constructor() {
    this.initLoggerInstance();
  }

  private initLoggerInstance() {
    if (!Logger.logInstance) {
      const tsFormat = () => (new Date()).toLocaleTimeString();
      const logOptions = config.get('settings.logging');

      const transports = [new (winston.transports.Console)({ colorize: logOptions.isColourize, timestamp: tsFormat })];

      if (logOptions.enableFileLog) {
        transports.push(new (winston.transports.File)({
          filename: logOptions.fileLogPath,
          timestamp: tsFormat,
          level: logOptions.fileLogLevel,
        }));
      }
      Logger.logInstance = new (winston.Logger)({
        transports
      });

      if (logOptions.logLevel) {
        Logger.logInstance.level = logOptions.logLevel;
      }
    }
  }

  public debug(message: string, obj?: any) {
    Logger.logInstance.debug(message, obj);
  }

  public info(message: string, obj?: any) {
    Logger.logInstance.info(message, obj);
  }

  public error(message: string, obj?: any) {
    Logger.logInstance.error(message, obj);
  }
}