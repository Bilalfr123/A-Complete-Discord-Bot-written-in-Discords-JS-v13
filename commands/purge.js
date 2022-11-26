module.exports ={
    
category :'Moderation' ,
description :'Deletes messages,must be less than 100 else error', 
permissions:['ADMINISTRATOR'],
slash:"both", 
testOnly:true,
guildOnly:true,
minArgs:1,
maxArgs:1, // optional arg if set min arg then it will be vital
expectedArgs:'<amount>',
callback :async({message,interaction,args,channel})=>{
//  const amount = args.length?parseInt(args.shift()):10//if the option is optional and not entered deletes 10 msgs
 const amount = parseInt(args.shift())//if the option is not optional and not entered deletes 10 msgs
if(amount>100){
   return ('please enter value less than 100')
    
}
if(message){
    await message.delete() //deletes the command message
} 
const {size} =await  channel.bulkDelete(amount,true) //doesnt delete messages older thsn 2weeks
 const reply = `Deleted ${size} message(s).`
 if(interaction){
     return reply
 }
 channel.send(reply)
},
}