import MQTT from "../src/index"
import dotenv from "dotenv"
 
 
(async ()=>{

    dotenv.config() 
    const handler= (topic,message)=>{
        console.log("topic",topic)
        console.log("message",message.toString())
    }
    const mqtt = MQTT(process.env.MQTT_URI)
  
    const client= await mqtt.listen("SOME_TOPIC",handler,{connectOpts: {clientId : "client2",clean:false} ,subscribeOpts: {
        qos : 0, 
        retain : true
    }})
    setTimeout(()=>{
        client.end()
    },5 *1000)
     
    
})()