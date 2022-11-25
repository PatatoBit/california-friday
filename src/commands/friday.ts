import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class General {
  @Slash({ description: "Today is friday in California", name: "friday" })
  async friday(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({ content: "`Success`", ephemeral: true });

    await interaction.channel?.send(
      "https://tenor.com/view/today-is-friday-in-california-gif-25066545"
    );
  }
}
