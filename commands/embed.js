const { MessageEmbed } = require("discord.js")

module.exports ={
category:'Fun',
    description:'Embeds messages', 
    slash:'both',
    testOnly:true,
    permissions:['ADMINISTRATOR'],
    callback:async ({message,text,interaction})=>{
        // const json = JSON.parse(text)
        // console.log(json)
        const Embed =new MessageEmbed()
.setTitle('Basic guide')
.setDescription('Here you will find guide to the server')
.setAuthor({
    name:'Dark Light',
    iconURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png',
    url:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
})
.setColor('RED')
.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
.setFooter({
    text:'This is end',
    iconURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png'
})
.setImage('https://i.ytimg.com/vi/cAQJPf539BY/maxresdefault.jpg')
.addFields([{
        name:'Goal',
        value:'To make ourselves a big community',
        inline:true
        },{
            name:'Progress',
            value:"Everyone's busy with their lives",
            inline:true
        }])
.addField('LOL','I dont know what to add here',true)
.setThumbnail('https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_1280%2Cc_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg')
.setTimestamp()
return Embed

}
}