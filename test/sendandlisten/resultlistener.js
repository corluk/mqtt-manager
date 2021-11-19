import MQTT from "../../src/index"
import dotenv from "dotenv"
 
 
(async ()=>{

    dotenv.config() 
    const handler= (client)=>{
        
        let counter = 0    
        
        return (topic,message)=>{
        console.log("topic",topic)
        console.log("message",message.toString())
         
        counter++;
    }
    }
    const mqtt = MQTT(process.env.MQTT_URI)
  
    mqtt.listen("/item/save/result",handler)
    
     
    
})()
 