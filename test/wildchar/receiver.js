import MQTT from "../../src/index"
import dotenv from "dotenv"
 
 
(async ()=>{

    dotenv.config() 
    const handler= (client)=>{
        
        let counter = 0    
        console.log("client",client)
        return (topic,message)=>{
        console.log("topic",topic)
        console.log("message",message.toString())
        if(counter > 1){
            client.end() 

        }
        counter++;
    }
    }
    const mqtt = MQTT(process.env.MQTT_URI)
  
    const client=   mqtt.listen("/task/+/item/+",handler,{connectOpts: {clientId : "client2",clean:false} ,subscribeOpts: {
        qos : 0, 
        retain : true
    }})
    
     
    
})()