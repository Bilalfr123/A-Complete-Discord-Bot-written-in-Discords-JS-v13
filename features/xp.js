// const Levels = require("discord-xp");
// Levels.setURL('mongodb+srv://DARKLIGHT:ihackedwifi240@cluster0.qv89r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'); 
// module.exports = (client) =>{
//     client.on("messageCreate", async (message) => {
//         if (!message.guild) return;
//         if (message.author.bot) return;
        
//         const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
//         const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
//         if (hasLeveledUp) {
//           const user = await Levels.fetch(message.author.id, message.guild.id);
//           const id ='620547628857425920'
//           const me = await client.users.fetch(id)
//           const levelEmbed = new MessageEmbed()
//           .setTitle(`${message.guild.name}`)
//           .setDescription(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`)
//           .setThumbnail(`${message.author.displayAvatarURL({dynamic:true})}`)
//           .setImage('https://repository-images.githubusercontent.com/311585905/1f120980-5e81-11eb-9182-f7951d8b')
//           .setColor('RANDOM')
//           .setFooter({
//               text:`Leveling System | Made by ${me.tag}`
//           })
//           .setTimestamp()
//           message.channel.send({ embeds:[levelEmbed] });
//         }
//       });
// }