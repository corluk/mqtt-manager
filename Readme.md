# Ligthweigth MQTT wrapper for nodejs 

Purpose of package  is to minify effort applyling mqtt protocol in nodejs.
***usage***

*listener* 

    import MQTT from "@corluk/mqtt-manager" 

    const mqtt = MQTT(process.env.MQTT_URI)
  
    const client= await mqtt.listen("SOME_TOPIC",handler,{connectOpts: {clientId : "client2",clean:false} ,subscribeOpts: {
        qos : 0, 
        retain : true
    }})

*sender* 
    
    import MQTT from "@corluk/mqtt-manager" 
    const mqtt = MQTT(process.env.MQTT_URI)
    const message = "SOME MESSAGE on Date: " + Date.now()
    const client= await mqtt.send("SOME_TOPIC",message,{ connectOpts: {
        clientId : "client1",
        clean: false
    },publishOpts: {
        qos : 0, 
        retain : true
    }})
    console.log("message sent : ",message)
    client.end()

*listen and send * 
    import MQTT from "@corluk/mqtt-manager" 
    const mqttListener  = MQTT(process.env.MQTT_URI) 

    const handler =(topic,message)=>{

        switch(topic){
            case "ping": 
                mqtt.send("pong")
            break; 
        }
         
        
    }
    setTimeout(()=>{
        mqtt.listen("pong",handler)
    },1000)
    const mqttPublisher  = mqttListener.newConnection() 
    mqttPublisher.send("ping")
    
