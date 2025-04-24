import pino from 'pino';

interface LoggerAdapter {
  file: string;

  writeLog: (msg: string) => void;
  writeError: (msg: string) => void;
  writeWarning: (msg: string) => void;
}

export class BunLoggerAdapter implements LoggerAdapter {
  public file: string;
  private logger = pino();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string) {
    this.logger.info(`[${this.file} log] ${msg}`);
  }
  writeError(msg: string) {
    this.logger.error(`[${this.file} error] ${msg}`);
  }
  writeWarning(msg: string) {
    this.logger.warn(`[${this.file} warning] ${msg}`);
  }
}
