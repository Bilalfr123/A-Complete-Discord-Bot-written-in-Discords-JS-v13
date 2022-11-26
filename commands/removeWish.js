const { MessageEmbed } = require("discord.js")
module.exports={
    category:'Fun',
    description:'Displays Bot information',
    Permissions:['ADMINISTRATOR'],
    testOnly:true,
    slash:true,
    options: [
        {
            name: 'user',
            description: 'The user to perform the action on',
            type: 'USER',
            required: true,
        },
        {
            name: 'amount',
            description: 'The role to perform the action on',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'reason',
            description: `The reason to perform.`,
            type: 'STRING',
            required: true,
        },
    ],
    callback:async({interaction,guild,client})=>{
const user = interaction.options.getMember('user')
const wish = interaction.options.getNumber('amount')
const reason = interaction.options.getString('reason')
const channel = guild.channels.cache.get('962781723215663176')
let role = guild.roles.cache.find(r => r.name.includes(wish));
const embed =new MessageEmbed()
.setAuthor({
    name:`${wish} wish(s) removed from ${user.user.username}`,
    iconURL:`${user.displayAvatarURL({dynamic:true})}`,
})
.setDescription(`Removed by ${interaction.user.tag}`)
.setColor('RANDOM')
.addField('Reason',`${reason}`,true)
.setFooter({
    text:'Audit logs',
    iconURL:`${guild.iconURL({dynamic:true})}`
})
.setTimestamp()
// const wish1 = wish + "x c"
if (!role) {
    return `Could not find role with wish ${wish}`
}
if(user.roles.cache.has(role.id)){
    user.roles.remove(role)
    await channel.send({embeds:[embed]})
     return interaction.reply ({
        content:'Role removed',
        custom:true,
        ephemeral:true
    })
}
else{
    return interaction.reply ({
        content:'The user doesnt has this role',
        custom:true,
        ephemeral:true
    })
}


   }
}