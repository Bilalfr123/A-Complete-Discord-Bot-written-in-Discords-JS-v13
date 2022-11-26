
module.exports ={
    category :'Fun' ,
    description :' Replies with pong!!!.', 
    slash:"both", 
    testOnly:true,
    cooldown: '60s',
    callback :()=>{
        return  'pong!'
    }
}