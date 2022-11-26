const Levels = require("discord-xp");
const { MessageEmbed } = require("discord.js");
Levels.setURL('mongodb+srv://DARKLIGHT:ihackedwifi240@cluster0.qv89r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
let start;
let millis;
module.exports= (client) =>{
    client.on('voiceStateUpdate', async (oldState, newState) => {
    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;
    let id =oldState? oldState.id : newState.id;
    let member = oldState.member;
    let guild =oldState? oldState.member.guild.id:newState.member.guild.id;
    const channel = client.channels.cache.get('945921263472353283')
console.log(id)
console.log(guild)
        if (oldUserChannel === null && newUserChannel !== null) {
            // User Join a voice channel
            

             start = Date.now();
            console.log(start)
        }     
        
        if (oldUserChannel !== null && newUserChannel === null) {
        // User Leave a voice channel
     millis = Date.now() 
       console.log( 'left' + millis)
       console.log('joined' + start)
    }
    const newDate = millis-start;
console.log( 'minus one ' + newDate)
if (oldUserChannel !== null && newUserChannel === null) {  
    if(newDate <= '7000'){
        const randomAmountOfXp = Math.floor(Math.random() * 10) + 1; // Min 1, Max 30
        const hasLeveledUp = await Levels.appendXp(id, guild, randomAmountOfXp);
        console.log('small')
        
    }      
    else  if(newDate <= '15000'){
        const randomAmountOfXp = Math.floor(Math.random() * 20) + 1; // Min 1, Max 30
        const hasLeveledUp = await Levels.appendXp(id, guild, randomAmountOfXp);
        console.log('smaller')
        
    }      
    else  if(newDate >= '30000'){
        const randomAmountOfXp =100 // Min 1, Max 30
        console.log('smallest')
        // const randomAmountOfXp = Math.floor(Math.random() * 40) + 1; // Min 1, Max 30
        const hasLeveledUp = await Levels.appendXp(id, guild, randomAmountOfXp);

    }      

    }
//    else if (
//         oldUserChannel !== null &&
//         newUserChannel !== null &&
//         oldUserChannel.id != newUserChannel.id
//       ) {
//         // User Switch a voice channel
       


  }); 
}