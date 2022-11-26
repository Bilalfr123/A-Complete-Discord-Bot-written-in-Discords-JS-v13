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
        const embed =new MessageEmbed()
        .setAuthor({
            name:`${wish} shard(s) given to ${user.user.username}`,
            iconURL:`${user.displayAvatarURL({dynamic:true})}`,
        })
        .setDescription(`Added by ${interaction.user.tag}`)
        .setColor('RANDOM')
        .addField('Reason',`${reason}`,true)
        .setFooter({
            text:'Shard logs',
            iconURL:`${guild.iconURL({dynamic:true})}`
        })
        .setTimestamp()
        // const wish1 = wish + "x c"
        //array of those roles
        let role = guild.roles.cache.find(r => r.name.includes(wish));
        const rolesID = guild.roles.cache.filter(r => r.name.toLowerCase().includes('shard')).map(r => r.id);
        console.log(rolesID)
        if (!role) {
            return interaction.reply ({
                content:`Could not find role with shard **${wish}**`,
                custom:true,
                ephemeral:true
            })
        }
        // if(!user.roles.cache.has(role.id)){
            //replace one  roles
    const roleExist = user.roles.cache.find(r => rolesID.includes(r.id))
    if (roleExist) {
        console.log(roleExist.name)
        const text = roleExist.name
        const text2 = text.split('')
        const text3 = text2[0]
        const text4 = parseInt(text3)
        console.log(text3)
        console.log(text4)
        console.log(wish)
        const addedRole = text4 + wish
        console.log(addedRole)
        let role2 = guild.roles.cache.find(r => r.name.includes(addedRole));
        if(!role2){
            return interaction.reply ({
                        content:'There is no shard role to be given to this user',
                        custom:true,
                        ephemeral:true
                    })
                }
        await  user.roles.remove(roleExist)
        await user.roles.add(role2)
        // await channel.send({embeds:[embed]})
    return interaction.reply ({
        content:'Shard(s) added',
        custom:true,
        ephemeral:true
    })
    }
    else if(!roleExist){
       await user.roles.add(role)
        // await channel.send({embeds:[embed]})
    return interaction.reply ({
        content:'Shard(s) added',
        custom:true,
        ephemeral:true
    })
    }
    //replace multiple roles
    //     const roles = guild.roles.cache.filter(r => rolesID.includes(r.id));  
    // const hasRoles = user.roles.cache.filter(r => roles.has(r.id));
    // if (hasRoles) {
        //   await user.roles.remove(hasRoles)
        // } 

        // if(user.roles.cache.has(role2.id)){
        //     return interaction.reply ({
        //         content:'The user already has wish',
        //         custom:true,
        //         ephemeral:true
        //     })
        // }
        
    
    
    
    
// }
// else{
//     return interaction.reply ({
//         content:'The user already has wish',
//         custom:true,
//         ephemeral:true
//     })
// }
   }
}