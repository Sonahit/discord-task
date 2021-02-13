export interface ILogger {
  log(...args: string[]): void;

  warn(...args: string[]): void;

  error(...args: string[]): void;

  debug(...args: string[]): void;
}
