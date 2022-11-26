const { MessageActionRow, MessageButton } = require("discord.js")

module.exports={
    category:'Moderation',
    description:"bans a member after confirmation",
    // requireRoles:true,
    slash:"both",
    testOnly:true,
    guildOnly:true,
    minArgs:2,
    expectedArgs:'<user> <reason>',
    expectedArgsTypes:['USER','STRING'],
    callback: async({message,interaction,args,channel,client})=>{
        const target =  message ? message.mentions.members?.first() : interaction.options.getMember('user')
        if(!target){
            return 'Please tag someone to ban.'
        }
        if(!target.bannable){
return {
    custom:true,
    content: 'cant ban this user.',
    ephemeral:true
   
}
        }
//         const row = new MessageActionRow()
//  .addComponents(
// new MessageButton()
//  .setCustomId('ban_yes')
//  .setLabel('Confirm')
//  .setStyle("SUCCESS")
//  .setEmoji('🧨')
//  )
//  .addComponents(
//  new MessageButton()
// .setCustomId('ban_no')
// .setLabel('Cancel')
// .setStyle('DANGER')
//  )
        args.shift()
        const reason =   args.join(' ')
        await client.users.fetch(target.id).then((user)=>{
                        user.send(
                           `You have been banned from the server due to ${reason}`
                    )
                        })
                        target.ban({  reason,
                days:7 //messages of user to delete
            })
        return `Successfully banned <@${target.id}>`
    //     if(interaction){
            
    //        interaction.reply({
    //             content:'Are you sure about that?',
    //             ephemeral:true,
    //             components:[row],
    //             files:['https://i.makeagif.com/media/2-26-2017/IjaWcm.gif'],
    //         })
    //     }
    //     else{
    //    await client.users.fetch(target.id).then((user)=>{
    //             user.send(
    //                `You have been banned from the server due to ${reason}`
    //         )
    //             })
    //         target.ban({
    //             reason,
    //             days:7 //messages of user to delete
    //         })
            
    //         message.reply({
    //         content:`Successfully banned <@${target.id}>`,
         
    //     })
    //     }
     
//         const collector = channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
//         collector.on('collect',async i => {
//             if (i.user.id === interaction.user.id && i.customId ==='ban_yes' )   {
//                 await client.users.fetch(target.id).then((user)=>{
//                     user.send(`You have been banned permanently from the server due to ${reason}`,  
//                     )
//                 })
//                 i.reply({
                    
//                     content:`Successfully banned <@${target.id}>`,
//                 })
//                 target.ban({
//                     reason,
//                     days:7 //messages of user to delete
//                 })
                
// 	}
//     else if(i.user.id === interaction.user.id && i.customId ==='ban_no'){
// i.reply({
//     content:`Operation cancelled by the user <@${i.user.id}> `
// })
//     } else {
// 		i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
// 	}
// });

//  collector.on('end', async(collect) => {
// 	console.log(`Collected ${collect.size} interactions.`);
// });
    }
}