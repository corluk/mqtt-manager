import MQTT from "../../src/index"
import dotenv from "dotenv"
 
 
(async ()=>{

    dotenv.config() 
    const handler= (client) => {
        let  counter =  0 
        return (topic,message)=>{
            console.log("topic",topic)
            console.log("message",message.toString())
            
            
            if(counter > 0){
                console.log("disConnecting...")
                client.end()
            }
            counter++
        }
    }
    const mqtt = MQTT(process.env.MQTT_URI)
  
    const client= await mqtt.listen("SOME_TOPIC",handler,{connectOpts: {clientId : "client2",clean:false} ,subscribeOpts: {
        qos : 0, 
        retain : true
    }})
  
     
    
})()