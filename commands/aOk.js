const { MessageEmbed} = require("discord.js")
module.exports={
    category:'Fun',
    description:'Adds Shard(s)',
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
        const user1 = interaction.member
        const user = interaction.options.getMember('user')
        const wish = interaction.options.getNumber('amount')
        const reason = interaction.options.getString('reason')
        const channel = guild.channels.cache.get('947950958787326043')
      const roleidsss =['950159869892263967','965806167999807538','949926264121200660']
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
       if(!user1.roles.cache.filter(r => roleidsss.includes(r.id))){
         console.log('no')
         return
        }
        let wish1;
        if(wish == '1'){

             wish1 = wish + 'x Shard of Awakening'
        }
        else{

         wish1 = wish + 'x Shards of Awakening'
        }
        let role = guild.roles.cache.find(r => r.name == wish1);
        if (!role) {
            return interaction.reply ({
                content:`Could not find role with shard **${wish}**`,
                custom:true,
                ephemeral:true
            })
        }
        const rolesID = guild.roles.cache.filter(r => r.name.toLowerCase().includes('shard')).map(r => r.id);
    const roleExist = user.roles.cache.find(r => rolesID.includes(r.id))
    if(!roleExist){
        console.log('user dont have role already')
       await user.roles.add(role)
        await channel.send({embeds:[embed]})
    return interaction.reply ({
        content:'Shard(s) added',
        custom:true,
        ephemeral:true
    })
    }
    const fullName = roleExist.name
    const splitName = fullName.split('')
    const joinedName = splitName[0] + splitName[1] + splitName[2]
        if(!joinedName.includes('x')){
            console.log('it has greater than 100')
            const textDetermining = parseInt(joinedName)
            const addedRole = textDetermining + wish + 'x Shards of Awakening'
            let role2 = guild.roles.cache.find(r => r.name == addedRole);
            if(!role2){
                return interaction.reply ({
                            content:'There is no shard role to be given to this user',
                            custom:true,
                            ephemeral:true
                        })
                    }
            await  user.roles.remove(roleExist)
            await user.roles.add(role2)
            await channel.send({embeds:[embed]})
        return interaction.reply ({
            content:'Shard(s) added',
            custom:true,
            ephemeral:true
        })
        }
        const textDetermining = joinedName.split('')
        const textDetermining1 = textDetermining[0] + textDetermining[1] 
        if(!textDetermining1.includes('x')){
            const text3 = parseInt(textDetermining1)
            const addedRole = text3 + wish + 'x Shards of Awakening'
            let role2 = guild.roles.cache.find(r => r.name == addedRole);
            if(!role2){
                return interaction.reply ({
                            content:'There is no shard role to be given to this user',
                            custom:true,
                            ephemeral:true
                        })
                    }
            await  user.roles.remove(roleExist)
            await user.roles.add(role2)
            await channel.send({embeds:[embed]})
        return interaction.reply ({
            content:'Shard(s) added',
            custom:true,
            ephemeral:true
        })
        }
        const textDetermining2 = textDetermining1.split('')
        const textDetermining3 = textDetermining2[0]
        const text3 = parseInt(textDetermining3)
        const addedRole = text3 + wish + 'x Shards of Awakening'
        let role2 = guild.roles.cache.find(r => r.name == addedRole);
        if(!role2){
            return interaction.reply ({
                        content:'There is no shard role to be given to this user',
                        custom:true,
                        ephemeral:true
                    })
                }
        await  user.roles.remove(roleExist)
        await user.roles.add(role2)
        await channel.send({embeds:[embed]})
    return interaction.reply ({
        content:'Shard(s) added',
        custom:true,
        ephemeral:true
    })
   }
}