const { MessageEmbed, Channel } = require('discord.js')
const warnSchema = require ( '../models/warn-schema')
const pschema = require ( '../models/punish-schema') 


module.exports = {
    category:'Moderation',
    description:'Adds a warning',
    permissions:['ADMINISTRATOR'],
    slash:true,
    testOnly:true,
    options:[{
        name:'add',
        description:'Adds warning to a user',
        type:"SUB_COMMAND",
        options:[
            {
                name:'user',
                description:'The user to add the warning to',
                type:"USER",
                required:true
            },
            {
                name:'reason',
                description:'The reason for warning',
                type:"STRING",
                required:true
            },
        ]
        
    },{
        name:'remove',
        description:'removes warning from a user',
        type:"SUB_COMMAND",
        options:[
            {
                name:'user',
                description:'The user to remove the warning from',
                type:"USER",
                required:true
            },
            {
                name:'id',
                description:'The Id of the warning to be removed',
                type:"STRING",
                required:true
            },
        ]
        
    },{
        name:'list',
        description:'Lists the warning(s) of a user',
        type:"SUB_COMMAND",
        options:[
            {
                name:'user',
                description:'The user to list the warning(s) for',
                type:"USER",
                required:true
            }
        ]
        
    },   {
        type: "SUB_COMMAND",
        name: "search",
        description: "Search ID for warning",
        options: [
           {
          name:'user',
          description:'The user to list the warning(s) for',
          type:"USER",
          required:true
      },
          {
            name: "searchid",
            type: "STRING",
            description: "The  ID for warning.",
            required: true,
          }
        ],
      },
],
callback:async({guild,member:staff,interaction,client})=>{
const subCommand =interaction.options.getSubcommand() //when command ran first subcommand appears then ,other
const user  =  interaction.options.getUser('user')
const reason  =  interaction.options.getString('reason')
const id  =  interaction.options.getString('id')
let userid =user.id
console.log(userid)
if(subCommand === 'add'){
    const warning = await warnSchema.create({
        userId :user?.id,
        staffId:staff.id,
        guildId:guild?.id,
        reason,
    })
    await client.users.fetch(userid).then((user)=>{
        user.send(
           `You have received a warning in brawl stars pk due to ${reason}.\n\n Your warning id is ${warning.id}`
    )
        })
    warnSchema.countDocuments({userId: user.id, guildId: guild.id}, async(err, number) => {
        if(number == 5){
            const expiryUnix = Date.now() + 60000
const expires = new Date(expiryUnix)   
                const member = await guild.members.fetch(userid)
                if(member){
                    const muteRole = guild.roles.cache.find((role) => role.name === 'Muted') //role name
                    if(!muteRole){
                        return 'The "Muted" role does not exist on this server'
                    }
                    member.roles.add(muteRole)
                    await client.users.fetch(userid).then((user)=>{
                        user.send(
                           `You have been muted in the server due to ${reason}  for 2 days.You also reached 5 warns.`
                    )
                })
            }
                await new pschema({
                    userId:userid,
                    guildId : guild.id,
                    staffId:staff.id,
                    reason,
                    expires,
                    type:'mute'
                }).save()
            
           
        }
        else if(number >= 10){
            const expiryUnix = Date.now() + 864000000 // 600000*minutes
            const expires = new Date(expiryUnix)
            await client.users.fetch(userid).then((user)=>{
                user.send(
                   `You have been banned from the server due to ${reason}  for 10 days.You also reached 10 warns.`
            )
                })
                
                    await guild.members.ban(userid,{days:7,reason}) //messages to delete
                    
                    await new pschema({
                        userId:userid,
                        guildId : guild.id,
                        staffId:staff.id,
                        reason,
                        expires,
                        type:'ban'
                    }).save()
                
               
            }
        
    return{
        custom:true,
        content:`Added warning ${warning.id} to <@${user?.id}>`,
        allowedMentions:{
            user:[]
        }
    }
    })
}
else if(subCommand === 'remove'){
    const warning = await warnSchema.findByIdAndDelete(id).catch(() => null)
    if(!warning){
        return 'Please enter valid warning id'
    }
    await client.users.fetch(userid).then((user)=>{
        user.send(
           `Your warning is removed in brawl stars pk which was due to ${warning.reason}.\n\n Your warning id is ${warning.id}`
    )
        })
    return{
        custom:true,
        content:`Removed warning ${warning.id} from <@${user?.id}>`,
        allowedMention:{
            user:[]
        }
        
    }
    
}
else if(subCommand === 'list'){
    const warnings = await warnSchema.find({
        userId :user?.id,
        guildId:guild?.id,
    })
    let description = `The warnings for <@${user?.id}> are :\n\n`
    for(const warn of warnings){
description += `**ID:** ${warn._id}\n`
description +=`**DATE:** ${warn.createdAt.toLocaleString()}\n`
description += `**  Reason:** ${warn.reason}\n`
description += `**Staff:** ${warn.staffId}\n\n`
    }
    console.log(warnings.size)
const embed = new MessageEmbed().setDescription(description)
return embed
}


}
}
