const translate = require(`@iamtraction/google-translate`);
const { MessageEmbed } = require('discord.js');

module.exports = {
 category:'fun',
    description: 'translate any word to any languge you want',
    slash:true,
    testOnly:true,
    options: [
        {
            name: 'lang_name',
            description: 'The languge to translate to',
            type: 'STRING',
            required: true,
        },
        {
            name: 'the_message',
            description: 'The message to translate ',
            type: 'STRING',
            required: true,
        },
    ],
   callback:async({interaction,client}) =>{
    const id ='620547628857425920'
    const  user = await client.users.fetch(id)
        const la = interaction.options.getString(`lang_name`)
        const msg = interaction.options.getString(`the_message`)

        translate(msg, { to: la })
            .then((res) => {
                var ee = new MessageEmbed()
                    .setTitle(`Translate`)
                    .setColor(`BLUE`)
              
        .setTimestamp()
                    .addField(`Before : `, `${msg}`)
                    .addField(`After : `, `${res.text}`)
                    .addField(`Language : `,`${la} `)
                    .setImage('https://www.cnet.com/a/img/1e91wTJ8JC1LvRh2w_itBQvQXr8=/940x0/2018/06/12/f6743c60-6b51-40fb-8aa7-8edc9d7e634f/gettyimages-887454050.jpg')
                    .setFooter({
                        text:`Modified by ${user.tag}`,
                        iconURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png'
                    })
                interaction.reply({ embeds: [ee] });
            })
            .catch((err) => {
                interaction.reply({ content: `${err.message}` });
            })
    }
}