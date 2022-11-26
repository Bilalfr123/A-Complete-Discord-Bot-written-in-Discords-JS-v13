const { MessageEmbed } = require("discord.js")
const {version} = require('../package.json')
module.exports={
    category:'Fun',
    description:'Displays Bot information',
    Permissions:['ADMINISTRATOR'],
    testOnly:true,
    callback:async({message,args,client})=>{
       

            const {guild,channel} = message
            const user =message.mentions.users.first() || message.member.user
            const member = guild.members.cache.get(user.id)
const joinsv = new Date(member.joinedTimestamp).toLocaleDateString()
const joindc = new Date(user.createdTimestamp).toLocaleDateString()
const role =member.roles.cache.size -1  //default everyonerole
        const embed = new MessageEmbed()
        // .setDescription('Made by DarkLight')
      
.setAuthor({
            name:`User Info for"${user.username}"`,
            iconURL:`${user.displayAvatarURL()}`,
        })
        .addFields([{
            name:'User Tag',
            value:`${user.tag}`},
            {name:'User ID',
            value:`${user.id}`},
            {name:'Is Bot',
            value:`${user.bot}`},

            {name:" Nickname",
            value:`${member.nickname || 'None'}`},

            {name:`Joined Server`,
            value:`${joinsv}`},
     
     {name:'Joined Discord',
            value:`${joindc}`},
     
     {name:'Role(s) Count',
            value:`${role}`} //default everyonerole

])
.setColor('RED')
.setFooter({
    text:'Footer',
    iconURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png'
})
.setTimestamp()
return embed
   }
}