const pschema = require ( '../models/punish-schema') 
module.exports ={
category:'Moderation',
description:'Mutes temporarily',
permissions:['ADMINISTRATOR'],
minArgs:3, //args = string array of arguments
expectedArgs:'<user> <duration> <reason>',
expectedArgsTypes:['USER', 'STRING', 'STRING'], //in slash we can mention
slash:'both',
testOnly:true,
callback:async({member:staff,interaction,args,guild,message,client})=>{
if(!guild){
    return 'You can use this only in a server'
}
let userId =args.shift() //removes user and then return it
const duration = args.shift()
const reason = args.join(' ')
// let user: User | undefined
if(message){
user  = message.mentions.users?.first()
}
else{
    user  =  interaction.options.getUser('user') 
}
if(!user){
    userId = userId.replace(/[<@!>]/g, '')
    user = await client.users.fetch(userId).catch(() => undefined)
    console.log(user)
    if(!user){
        return `Could not find the user with ID "${userId}"`
    }
}
userId = user.id
let time 
let type
try {
    const split = duration.match(/\d+|\D+/g)
    time = parseInt(split[0])
    console.log(time)
    type = split[1].toLowerCase()
} catch (e) {
    return `Invalid time format! Example format: \"10d\" where 'd' = days' , h = 'hours' and 'm' = minutes.`
}
if(type === "h"){
    time *=60
}
else if(type === "d"){
    time *=60*24
}
else if(type !== "m"){
   return 'Please use "m","h","d" for minutes,hours and days respectively'
}
// const expires = new Date()
// expires.setMinutes(expires.getMinutes()+time)
const time2 =60000*time
const expiryUnix = Date.now() + time2
const expires = new Date(expiryUnix)
const result = await pschema.findOne({
    guildId : guild.id,
    userId,
    type:'mute'
})
if(result){
  return  `<@${userId}> is already muted in this server.`
}
try{
    const member = await guild.members.fetch(userId)
    if(member){
        const muteRole = guild.roles.cache.find((role) => role.name === 'Muted') //role name
        if(!muteRole){
            return 'The "Muted" role does not exist on this server'
        }
        member.roles.add(muteRole)
        await client.users.fetch(userId).then((user)=>{
            user.send(
               `You have been temporarily muted in the server brawl stars pk https://discord.gg/mPjr35ZM due to ${reason} for ${duration}`
        )
            })
        
    } 
    await new pschema({
        userId,
        guildId : guild.id,
        staffId:staff.id,
        reason,
        expires,
        type:'mute'
    }).save()
}
catch(ignored){
return `Can not mute <@${userId}>`
}
return `<@${userId}> has been muted for "${duration}"`
}
}