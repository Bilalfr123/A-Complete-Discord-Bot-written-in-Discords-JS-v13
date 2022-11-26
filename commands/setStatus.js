module.exports = {
    category:"Fun",
    description:'Sets bot status',
    slash:true,
    ownerOnly:true,
    testOnly:true,
    options: [
        {
            name: 'text',
            description: 'The status of bot to show',
            type: 'USER',
            required: true,
        },],
    callback:({client})=>{
        const text = interaction.options.getString('text')
client.user?.setPresence({
    status:"dnd",
    activities:[{
        name:text,url:(test),type:"PLAYING"
    }
    ],
})
return 'Status Updated!'
}
}