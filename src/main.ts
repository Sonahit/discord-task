import { Client } from 'discord.js';
import 'reflect-metadata';
import { App } from './core/app';
import { AppConfig } from './core/types';
import * as dotenv from 'dotenv';
import { AppModuleFactory } from './core/factories/app-module.factory';
import { AppModule } from './app.module';

async function bootstrap() {
  const env = dotenv.config();
  const application = new App(new Client(), env.parsed as AppConfig);
  await new AppModuleFactory(application).create(AppModule);
}

bootstrap();
