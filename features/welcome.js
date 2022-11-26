const { MessageEmbed, MessageAttachment,DiscordJS } = require("discord.js")
const Canvas = require('canvas');
const schema = require ( '../models/welcome-schema')
const welcomeData ={}
module.exports = (client) =>{
    client.on('guildMemberAdd' , async member =>{
const {guild,id} = member
if(!member.guild) return
const canvas = Canvas.createCanvas(1772, 633)
const ctx = canvas.getContext('2d')
const background = await Canvas.loadImage('https://image.freepik.com/free-vector/realistic-cosmic-galaxy-background-concept-space-nebula-cosmos_269299-629.jpg')
ctx.drawImage(background, 0 , 0, canvas.width, canvas.height)
ctx.strokeStyle = '#f2f2f2'
ctx.strokeRect(0, 0 , canvas.width, canvas.height)
var text1 = `${member.user.username}`
var text2 = `#${member.user.discriminator}`
var text3 = `Member #${member.guild.memberCount}`
var text4 = `Welcome to ${member.guild.name}`
if(text1.length >= 14) {
  ctx.font = 'bold 100px Sans-Serif'
  ctx.fillStyle = '#f2f2f2'
  ctx.fillText(text1, 720, canvas.height / 2 +20)
}
else {
  ctx.font = 'bold 150px Sans-Serif'
  ctx.fillStyle = 'BLACK' 
  ctx.fillText(text1, 720, canvas.height / 2 + 20)
}

ctx.font = 'bold 40px Sans-Serif'
ctx.fillStyle = '#f2f2f2'
ctx.fillText(text2, 730, canvas.height / 2 + 58)

ctx.font = 'bold 60px Sans-Serif'
ctx.fillStyle = '#f2f2f2'
ctx.fillText(text3, 750, canvas.height / 2 + 135)

ctx.font = 'bold 60px Sans-Serif'
ctx.fillStyle = 'black'
ctx.fillText(text4, 700, canvas.height / 2 - 150)

ctx.beginPath()
ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true)
ctx.closePath()
ctx.clip()

const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg'}))
ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500)
const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
let data = welcomeData[guild.id] //fetch data from local memory
// data not in lcal memory then fetch it from db
if(!data){
const results = await schema.findById(guild.id)
if(!results){
    return //no welcome figured for this channel
}
const {channelID ,text} = results
const channel = guild.channels.cache.get(channelID) 
data = welcomeData[guild.id] = [channel,text] //fetch data from local memory

}
// const embed = new MessageEmbed()
// .setImage("https://images.ctfassets.net/hrltx12pl8hq/4plHDVeTkWuFMihxQnzBSb/aea2f06d675c3d710d095306e377382f/shutterstock_554314555_copy.jpg")
data[0].send({
    content:data[1].replace(/@/g, `<@${id}>`),
    allowedMentions:{
        
    },
    files:
  [attachment]
// embeds:[welcome]
   
})
    })
}