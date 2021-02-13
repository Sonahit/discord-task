export type AppConfig = {
  PREFIX: string;

  TOKEN: string;

  DB_USER: string;

  DB_PASS: string;

  DB_PORT: string;
};

export type Type<T> = {
  new (...any: any[]): T;
};
