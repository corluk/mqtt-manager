import MQTT from "../../src/index"
import dotenv from "dotenv"
 
 
(async ()=>{

    dotenv.config() 
    
    const mqtt = MQTT(process.env.MQTT_URI)
 
    const message = "SOME MESSAGE on Date: " + Date.now()
    await mqtt.send("SOME_TOPIC",message,{ connectOpts: {
        clientId : "client1",
        clean: false
    },publishOpts: {
        qos : 0, 
        retain : true
    }})
     
    mqtt.getClient().end()
    
})()

 