const { MessageEmbed } = require("discord.js")
const {version} = require('../package.json')
module.exports={
    category:'Fun',
    description:'Displays Bot information',
    Permissions:['ADMINISTRATOR'],
    testOnly:true,
    callback:async({message,args,client})=>{
       

            const guild = message.guild
        const guildid =guild.id
        const ownerid = guild.ownerId
        const owner = await message.guild.fetchOwner();

  const {name,region,memberCount,afkTimeout} = guild
// 
  const icon = guild.iconURL()
        const embed = new MessageEmbed()
        .setDescription('Made by DarkLight')
        .setThumbnail(icon || 'None')
        .setTitle(`Information about "${name}"`)
      
// .setAuthor({
//             name:`Information about "${name}"`,
//             iconURL:`${icon}`,
//         })
        .addFields([{
            name:'Region',
            value:`${region}`},
            {name:'Guild ID',
            value:`${guildid}`},

            {name:" Owner",
            value:`${owner}`},

            {name:`Owner's ID`,
            value:`${ownerid}`},
     
     {name:'Total Members',
            value:`${memberCount}`},
     
     {name:'AFK Timeout',
            value:`${afkTimeout/60}`}

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