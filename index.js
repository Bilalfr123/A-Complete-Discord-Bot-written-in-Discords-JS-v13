const DJS = require('discord.js')
const {Intents} = DJS
const path = require('path')
const mongoose = require('mongoose')
const WOK = require('wokcommands')
const warNSchema = require ( './models/warn-schema')
const pschema = require ( './models/punish-schema')

require ('dotenv/config')
const client = new DJS.Client({
    intents : [
        Intents.FLAGS.GUILDS ,
        Intents.FLAGS.GUILD_MESSAGES ,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
     Intents.FLAGS.GUILD_MEMBERS,
     Intents.FLAGS.GUILD_VOICE_STATES

    ]
})
client.on('ready' , ()=> {
    console.log('The bot is ready') //whenever client/bot is online 
new WOK(client, {
    // The name of the local folder for your command files
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    mongoUri:process.env.MONGO_URI,
    dbOptions:{
        keepAlive:true //coneection stay alive as bot is online
    },
    testServers:['945921263472353280'],
    botOwners: ['620547628857425920'],
})

})
client.on('messageCreate' ,async (message)=>{
//     const reply = 'sex'
//     let message2 = message.content.toLowerCase()
//     if( message2=== reply){
//         message.reply('pls dont use bad word')
//         const  userid =  message.author.id
//           client.users.fetch('620547628857425920').then((user)=>{
//               user.send(`<@${userid}> sent ${message2}`)
//           })
// message.author.send({
//     content: 'pong'
// })
// }
// })
const userid = message.author.id
const staffid = '620547628857425920'
const guildid =message.guild.id
const reason = 'Used a bad word'
const guild =message.guild
const reply = 'sex'
if(message.content === 'sex'){
const warning = await warNSchema.create({

    userId :userid,
    staffId:staffid,
    guildId:guildid,
    reason,
})
warNSchema.countDocuments({userId: userid, guildId: guildid}, async(err, number) => {
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
               `You have been temporarily muted in the server brawl stars pk https://discord.gg/mPjr35ZM due to ${reason} for 2days`
        )
            })
        
    } 
    await new pschema({
        userId:userid,
        guildId : guildid,
        staffId:staffid,
        reason,
        expires,
        type:'mute'
    }).save()
}

    
        
    else if(number >= 10){
        const expiryUnix = Date.now() + 60000 // 600000*minutes
        const expires = new Date(expiryUnix)
        await client.users.fetch(userid).then((user)=>{
            user.send(
               `You have been banned in the server due to ${reason}  for 10 days.You also reached 10 warns.`
        )
    })
        await guild.members.ban(userid,{days:7,reason})
        await new pschema({
            userId:userid,
            guildId : guildid,
            staffId:staffid,
            reason,
            expires,
            type:'ban'
        }).save()
    }
    })
 
    message.reply('Check ur dm theres a gift for u😂👀')
message.author.send(`you got a warning due to using bad word "${message.content}"`)
    }

})

client.login(process.env.Token) //login bot
