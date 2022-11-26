const Levels = require("discord-xp");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require('canvacord');
const {pos} = require('./leaderboard')
module.exports ={
    category:'Fun',
    description:'Check ur level',
    maxArgs:1,
    expectedArgs:'<user>',
    options:[
        {name:'user',
    description:'The level of user to checck on',
type:'USER'}
    ],
    slash:'both',
    testOnly:true,
    callback:async({client,message,interaction})=>{
        const target =message? message.mentions.users.first() || message.author : interaction.options.getUser('user') || interaction.user
const guild = message?message.guild :interaction.guild 

        const user = await Levels.fetch(target.id, guild.id); // Selects the target from the database.
        const channel = message?message.channel : interaction.channel

        if (!user) return channel.send("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.
      
        console.log(user.position)
        console.log(user.xp)
        console.log(Levels.xpFor(user.level + 1))
        console.log(target.discriminator)
        console.log(target.discriminator)
    
    
    //      const rank = new canvacord.Rank() // Build the Rank Card
    //     .setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
    //     .setCurrentXP(user.xp) // Current User Xp
    //     .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
    //     .setRank(_1_) // Position of the user on the leaderboard
    //     .setLevel(user.level) // Current Level of the user
    //     .setProgressBar("#F0001")
    //     .setUsername(target.username)
    //     .setDiscriminator(target.discriminator);
    // rank.build()
    //     .then(data => {   const attachment = new MessageAttachment(data, "RankCard.png");
    //     channel.send(attachment);
    // });
    channel.send(`> **${target.tag}** is currently level ${user.xp}.`); // We show the level.
    // return({
    //     content:'Done',
    //     ephemeral:true
    // })
        // const member = message.guild.members.cache.get(message.author.id)
        // console.log(message.author.id)
    //     if(user.level === '1'){
    //         message.member.roles.add('946014426002235442')
    //     }
    //    else if(user.level === '2'){
    //        message.member.roles.add('946818527854202940')
    //    }
    //    else if(user.level === '4'){
    //       member.roles.add('945936040257011822')
    // }
}
}