const { MessageEmbed } = require("discord.js")
const {version} = require('../package.json')
module.exports={
    category:'Fun',
    description:'Displays Bot information',
    Permissions:['ADMINISTRATOR'],
slash:'both',
    testOnly:true,
    callback:async({message,args,client,guild,interaction})=>{
        let totalMembers = 0
        for(const guild of client.guilds.cache){
            totalMembers += (await guild[1].members.fetch()).size
        }
        console.log(`${client.guilds.cache.size}`)
        console.log(totalMembers)
        const embed = new MessageEmbed()
        .setDescription('Made by DarkLight')
.setAuthor({
            name:`Information about the ${client.user.username} bot`,
            iconURL:'https://cdn.discordapp.com/attachments/686307613733945415/686613647723855878/pak_brawl_stars3.png',
        })
        .addFields([{
            name:'Bot Tag',
            value:`${client.user.tag}`,
            // inline:true
            },
        {
            name:'Bot ID',
            value:`${client.user.id}`,
            // inline:true
            },{
                name:'Bot Version',
                value:version,
            },
            {name:"Bot Owner's ID",
        value:'620547628857425920'},
        {name:'Time since last restart',value:`${process.uptime().toFixed(2)}s`},
        {
            name:'Server count',
            value: ` Serving ${client.guilds.cache.size} server(s)`
        },{
            name:'Total Members',
            value: `${totalMembers}`
        }

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