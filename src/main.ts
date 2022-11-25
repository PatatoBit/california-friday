import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message, TextChannel } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";

import dotenv from "dotenv";
import { CronJob } from "cron";

dotenv.config();

export const bot = new Client({
  // To use only guild command
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {
  await bot.initApplicationCommands();

  console.log("Bot started");

  const job = new CronJob(
    "0 0 * * FRI",
    function () {
      console.log("Today is friday in California");
      const channel = bot.channels.cache.get(
        process.env.CHANNEL_ID!
      ) as TextChannel;

      channel?.send(
        "https://tenor.com/view/today-is-friday-in-california-gif-25066545"
      );
    },
    null,
    true,
    "America/Los_Angeles"
  );
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  // Log in with your bot token
  await bot.login(process.env.BOT_TOKEN);
}

run();
