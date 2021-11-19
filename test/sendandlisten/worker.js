import MQTT from "../../src/index"
import dotenv from "dotenv"
 
 
(async ()=>{
    const mqtt = MQTT(process.env.MQTT_URI)
    const saveTopic = "/item/save"

    dotenv.config() 
    const handler = (client)=>{

        return (topic,message)=>{
            console.log("recived topic", topic)
            try{
                const obj = JSON.parse(message.toString())
                obj.status = "success"
                mqtt.send(saveTopic+"/result",JSON.stringify(obj))
            }catch(err){
                console.log("error",err.message)
            }
            
        }
    }
    
    
    
    mqtt.listen(saveTopic,handler)
  
    
})()

 