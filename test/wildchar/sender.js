import MQTT from "../../src/index"
import dotenv from "dotenv"
 
 
(async ()=>{

    dotenv.config() 
    
    const mqtt = MQTT(process.env.MQTT_URI)
    const message = "SOME MESSAGE on Date: " + Date.now()
    const client= await mqtt.send("/task/1234/item/1234",message,{ connectOpts: {
        clientId : "client1",
        clean: false
    },publishOpts: {
        qos : 0, 
        retain : true
    }})
    console.log("message sent : ",message)
    client.end()
    
})()

 