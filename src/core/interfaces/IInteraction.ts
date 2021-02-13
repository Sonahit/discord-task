import { GuildMember } from 'discord.js';
import { InteractionEnum } from '../enums/interaction.enum';

export type InteractionType = InteractionEnum;

export type InteractionOptionType = 1;

export type ApplicationCommandInteractionDataOption = {
  name: string;
  value: InteractionOptionType;
};

export type ApplicationCommandInteractionData = {
  id: string;

  name: string;

  options?: ApplicationCommandInteractionDataOption;
};

export interface IInteraction {
  id: string;

  type: InteractionType;

  data?: ApplicationCommandInteractionData;

  guild_id: string;

  channel_id: string;

  member: GuildMember;

  token: string;
  // Always 1
  version: number;
}
