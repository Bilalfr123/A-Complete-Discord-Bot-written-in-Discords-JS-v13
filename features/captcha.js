// const { MessageAttachment, MessageEmbed } = require("discord.js");
// const { CaptchaGenerator } = require("captcha-canvas");
// module.exports = (client) =>{
//     client.on('guildMemberAdd' , async member =>{
//         const { user, guild } = member;
//    //Captca System
//    const captcha = new CaptchaGenerator()
//    .setDimension(150, 400)
//    .setCaptcha({ font: "Sans", size: 60, color: "#ffc733" })
//    .setDecoy({ opacity: 0.5 })
//    .setTrace({ color: "#ffc733" });

//  const captchaAttachment = new MessageAttachment(

//    await captcha.generate(),
//    "captcha.png"
//  );

//  const captchaEmbed = new MessageEmbed()

//    .setAuthor({ name: `Hello! Are you human? Let\'s find out!`, iconURL: `${guild.iconURL({ dynamic: true, size: 512 })}` })

//    .setDescription(
//      "\`\Please type the captcha below to be able to access this server!\`\n\n" +
//      "__**Additional Notes:**__\n\n" +
//      "> Type out the traced colored characters from left to right.\n" +
//      "> Ignore the decoy characters spread-around.")
//    .setImage("attachment://captcha.png")
//    .setColor('YELLOW')
//    .setFooter({text: 'Verification Period: 3 minutes'});

//  const msg = await member.send({
//    files: [captchaAttachment],
//    embeds: [captchaEmbed],
//  });
//  const filter = (message) => {
//    if (message.author.id !== member.id) return;
//    if (message.content === captcha.text) return true;
//    else member.send("Wrong Captcha");
//  };

//  try {
//    const response = await msg.channel.awaitMessages({
//      filter,
//      max: 1,
//      time: 180000,
//      errors: ["time"],
//    });

//    if (response) {
//      //True answer
//      member.roles.add(946014426002235442);
//      member.send(`✅ You passed the verification successfully. You can now access **${member.guild.name}** `);
//    }
//  } catch (err) {
//    //Failed to answer
//    await member.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly.`)
//    member.kick();
//  }
    //     //Captca System
    //      const captcha = new CaptchaGenerator()
    //        .setDimension(300, 400)
    //        .setCaptcha({ font: "Sans", size: 60, color: "#ffc733" })
    //        .setDecoy({ opacity: 0.5 })
    //        .setTrace({ color: "#ffc733" });
     
    //      const captchaAttachment = new MessageAttachment(
     
    //        await captcha.generate(),
    //        "captcha.png"
    //      );
    //      const id ='620547628857425920'
    //      const me = await client.users.fetch(id)
    //      const captchaEmbed = new MessageEmbed()
     
    //        .setAuthor({ name: `Hello! Are you human? Let\'s find out!`, iconURL: `${guild.iconURL({ dynamic: true, size: 512 })}` })
    //  .setThumbnail(`${user.displayAvatarURL({dynamic:true})}`)
    //        .setDescription(
    //          "\`\Please type the captcha below to be able to access this server!\`\n\n" +
    //          "__**Additional Notes:**__\n\n" +
    //          "> Type out the traced colored characters from left to right.\n" +
    //          "> Ignore the decoy characters spread-around.\n" +
    //          "> Please wait 2minutes after sending the **captcha**.")
    //        .setImage("attachment://captcha.png")
    //        .setColor('YELLOW')
    //        .setFooter({text: `Verification Period: 2 minutes \n Captcha System | Made by ${me.tag}`})
    //        .setTimestamp();
    //      try{const msg = await member.send({
    //        files: [captchaAttachment],
    //        embeds: [captchaEmbed],
    //      })
    //     }catch(err){
    //         console.log(err)
    //         return
    //     }
    //      console.log(captcha.text)
    //      const filter = (message) => {
    //          if (message.author.id !== member.id) return;
    //          if (message.content === captcha.text){
    //              console.log('hi')
    //              return true
    //          } 
    //          else member.send("Wrong Captcha");
    //         };
     
    //      try {
    //      const response = await msg.channel.awaitMessages({
    //          filter,
    //          max: 1,
    //          time: 15000,
    //          errors: ['time'],
    //         })
        
    //         if (response) {
    //          //True answer
    //          member.roles.add(`945936040257011822`);
    //          member.send(`✅ You passed the verification successfully. You can now access **${member.guild.name}** `)
    //        }
    //      } catch (err) {
    //        //Failed to answer
    //        await member.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly.`)
    //        member.kick();
    // }
// })
// }
