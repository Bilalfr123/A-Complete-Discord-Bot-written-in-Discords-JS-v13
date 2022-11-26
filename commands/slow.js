module.exports={
    category:'Moderation',
    description:'Sets slow-mode to the channel',
    Permissions:['ADMINISTRATOR'],
    minArgs:1,
    maxArgs:1,
    expectedArgs:'<Duration>',
    testOnly:true,
    callback:({message,args})=>{
 
const {channel} = message
  let duration = args.toString().toLowerCase()

  if(duration === 'off'){
      duration =0
    }
    if(duration >= 21601){
      message.reply('int value should be less than or equal to 21600')
    }
    if(isNaN(duration)){
    message.reply('Please enter either number of seconds or the word "off"')
    return
  }
  channel.setRateLimitPerUser(duration)
 return `The slow-mode for this channel has been set to "${duration} seconds." `

   }
}