import { ILogger } from './interfaces/ILogger';

export class Logger implements ILogger {
  log(...args: string[]): void {
    console.log(...args);
  }
  warn(...args: string[]): void {
    console.warn(...args);
  }
  error(...args: string[]): void {
    console.error(...args);
  }

  debug(...args: string[]): void {
    console.debug(...args);
  }
}
