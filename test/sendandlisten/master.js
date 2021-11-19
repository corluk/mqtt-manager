import MQTT from "../../src/index"
import dotenv from "dotenv"
 
 
(async ()=>{

    dotenv.config() 
  
    const mqtt = MQTT(process.env.MQTT_URI)
    const saveItemTopic = "/item/save"
    const message = JSON.stringify({status:"init",taskId:1234})
    mqtt.send(saveItemTopic,message)

})()