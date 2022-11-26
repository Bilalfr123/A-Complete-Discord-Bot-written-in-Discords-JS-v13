const { MessageEmbed, CommandInteractionOptionResolver } = require("discord.js")
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
            name: 'reason',
            description: `The reason to perform.`,
            type: 'STRING',
            required: true,
        },
        {
            name: 'amount',
            description: 'The role to perform the action on',
            type: 'NUMBER',
            required: true,
        },
    ],
    callback:async({interaction,guild,client})=>{
        const user = interaction.options.getMember('user')
        const wish = interaction.options.getNumber('amount')
        const reason = interaction.options.getString('reason')
        const channel = guild.channels.cache.get('962781723215663176')
        const embed =new MessageEmbed()
        .setAuthor({
            name:`${wish} wish(s) given to ${user.user.username}`,
            iconURL:`${user.displayAvatarURL({dynamic:true})}`,
        })
        .setDescription(`Added by ${interaction.user.tag}`)
        .setColor('RANDOM')
        .addField('Reason',`${reason}`,true)
        .setFooter({
            text:'Wish logs',
            iconURL:`${guild.iconURL({dynamic:true})}`
        })
        .setTimestamp()
        // const wish1 = wish + "x c"
        //array of those roles
        let role = guild.roles.cache.find(r => r.name.includes(wish));
        const rolesID = guild.roles.cache.filter(r => r.name.toLowerCase().includes('x c')).map(r => r.id);
        console.log(rolesID)
        if (!role) {
            return `Could not find role with wish **${wish}**`
        }
        if(!user.roles.cache.has(role.id)){
            //replace one  roles
    // const roleExist = user.roles.cache.find(r => rolesID.includes(r.id))
    // if (roleExist) {
    //     await  user.roles.remove(roleExist)
    // }
    //replace multiple roles
        const roles = guild.roles.cache.filter(r => rolesID.includes(r.id));  
    const hasRoles = user.roles.cache.filter(r => roles.has(r.id));
    if (hasRoles) {
          await user.roles.remove(hasRoles)
        } 
        
       
        await user.roles.add(role)
    
    
    await channel.send({embeds:[embed]})
    return interaction.reply ({
        content:'wish added',
        custom:true,
        ephemeral:true
    })
    
}
else{
    return interaction.reply ({
        content:'The user already has wish',
        custom:true,
        ephemeral:true
    })
}
   }
}