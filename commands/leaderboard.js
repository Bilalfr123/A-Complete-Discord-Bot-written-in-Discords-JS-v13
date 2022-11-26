const Levels = require("discord-xp");
const { Interaction } = require("discord.js");
const { MessageEmbed } = require("discord.js")

module.exports ={
    category:'Fun',
    description:'Check leaderboard',
    slash:'both',
    testOnly:true,
    callback:async({client,message,interaction})=>{
        const guild = message?message.guild : interaction.guild
        const user = message?message.author : interaction.user
        const channel = message?message.channel : interaction.channel
        const rawLeaderboard = await Levels.fetchLeaderboard(guild.id, 10); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
        
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
        
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
     
    
    //     const Embed =new MessageEmbed()
    //     .setTitle(`**Leaderboard of ${guild.name} **`)
    //     .setColor('RANDOM')
    //     .setThumbnail(`${guild.iconURL({display:true})}`)
    //     .setFooter({
    //         text:`Requested by ${user.tag}`,
    //         iconURL:`${user.displayAvatarURL()}`
    //     })
    //     .setDescription(`**Leaderboard**:\n\n${lb.join("\n\n")}`)
    //    .setTimestamp()
        channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`)
        // channel.send({
        //     embeds:[ Embed ]
        // })
        return({
            content:`${user} ran **!leaderboard** command`,
            ephemeral:true
        })
}
}