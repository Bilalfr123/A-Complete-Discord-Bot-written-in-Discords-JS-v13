const { MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")

module.exports ={
    category:'Moderation',
    description:'Adds role ',
    minArgs:3,
    maxArgs:3,
    expectedArgs:'<channel> <messageId> <role>',
    expectedArgsTypes:['CHANNEL', 'STRING', 'ROLE'],
    slash:'both',
    testOnly:true,
    init:(client)=>{
client.on('interactionCreate' , interaction =>{ 
    if(!interaction.isSelectMenu()){
        return
    }
    const {customId,values,member} = interaction
    if(customId === 'Auto_roles'){
        const component = interaction.component
        const removed = component.options.filter((option)=>{
            return !values.includes(option.value)
        })
for(const id of removed){
    member.roles.remove(id.value)
}
for(const id of values){
    member.roles.add(id)
}
interaction.reply({
    content:'Roles Updated!!',
    ephemeral:true
})
    }
})
    },
    callback:async({message,interaction,args,client})=>{
        const channel =  (message ? message.mentions.channels.first() : interaction.options.getChannel('channel') )
        if(!channel || channel.type!== 'GUILD_TEXT'){
            return 'Please mention a text channel'
        }
        const messageId =args[1]
        const role = message ? message.mentions.roles.first(): interaction.options.getRole('role')
        if(!role){
            return 'Unknown Role!'
        }
        const targetMessage= await channel.messages.fetch(messageId,{
            cache:true,
            force:true
        }).catch(() => undefined)
        if(!targetMessage){
            return 'Unknown messageId!'
        }
        if(targetMessage.author.id !== client.user.id){
            return `Please enter message provided by <@${client.user.id}>`
        }
        let row = targetMessage.components[0]
        if(!row){
            row = new MessageActionRow()
        }
        const option = [{
            label:role.name,
            value:role.id
        }]
        let menu = row.components[0]
        if(menu){
            for(const o of menu.options){
                if(o.value === option[0].value){
                    return{
                        custom:true,
                        content:`<@${o.value} is already part of this menu.`,
                        ephemeral:true,
                        allowedMentions:{
                            roles:[]
                        }
                    }
                }
            }
            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
            
        }else{
            row.addComponents(
                new MessageSelectMenu()
                .setCustomId('Auto_roles')
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder('Select your role...')
                .addOptions(option)
            )
        }
        const row1 = new MessageActionRow()
        .addComponents(
       new MessageButton()
       .setURL('https://www.google.com')
    .setStyle('LINK')
     .setLabel('Visit Our Web')
        )
        
        targetMessage.edit({
            components:[row,row1]
        })
        return{
            custom:true,
            content:`Added <@${role.id}> to auto-roles menu.`,
            ephemeral:true,
            allowedMentions:{
                roles:[]
            }
        }
    }
}