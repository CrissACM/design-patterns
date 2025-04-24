export class LocalLogger {
  constructor(private file: string) {}

  writeLog(msg: string) {
    console.log(`[${this.file} log] ${msg}`);
  }

  writeError(msg: string) {
    console.log(`[${this.file} error] ${msg}`);
  }

  writeWarning(msg: string) {
    console.log(`[${this.file} warning] ${msg}`);
  }
}
