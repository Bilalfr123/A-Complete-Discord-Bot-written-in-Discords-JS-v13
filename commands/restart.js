const { CommandInteraction, Client } = require("discord.js");
const config = require("../config.json");
require ('dotenv/config')
module.exports = {
  description: "Restart Bot",
  category:'Moderation',
slash:true,
testOnly:true,
ownerOnly:true,
  callback:async({interaction, client})=> {
    const { guild, member } = interaction
    if (!config.ownerIDS.includes(member.id)) {
      return interaction.reply({
        content: "You do not have permission to restart this bot",
      })
    }
    await interaction
      .reply({ content: "Restarting..." })
      .then(() => {
        client.destroy();
        console.log(
          `[Client] Restarting by ${member.user.username} in ${guild.name}`
        )
      })
      .then(() => {
        client.login(process.env.Token);
        console.log("[Client] Ready");
      })
  }
}