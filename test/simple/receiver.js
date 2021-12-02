import MQTT from "../../src/index"
import dotenv from "dotenv"
import { MqttClient } from "mqtt"
 
 
(async ()=>{

    dotenv.config() 
    const mqtt = MQTT(process.env.MQTT_URI)
    let counter= 0 
    const handler= async  (topic,message)=>{
            console.log("topic",topic)
            console.log("message",message.toString())
            
            
            if(counter > 0){
                console.log("disConnecting...")
                const otherConn = mqtt.newConnection()
                await otherConn.send("SOME_TOPIC","other message",{ connectOpts: {
                    clientId : "client1",
                    clean: false
                },publishOpts: {
                    qos : 0, 
                    retain : true
                }}) 
                otherConn.getClient().end()
                mqtt.getClient().end()
                
            }
            counter++
    }
    
    
  
     mqtt.listen("SOME_TOPIC",handler,{connectOpts: {clientId : "client2",clean:false} ,subscribeOpts: {
        qos : 0, 
        retain : true
    }})
    
     
    
})()