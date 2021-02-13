import 'reflect-metadata';
import { Client } from 'discord.js';
import { App } from './core/app';
import { AppConfig } from './core/types';
import * as dotenv from 'dotenv';
import { AppModuleFactory } from './core/factories/app-module.factory';
import { AppModule } from './app.module';

async function bootstrap() {
  const env = dotenv.config();
  const application = new App(new Client(), env.parsed as AppConfig);
  const app = await new AppModuleFactory(application).create(AppModule);
  app.client.on('message', app.handleMessages.bind(app));
}

bootstrap();
