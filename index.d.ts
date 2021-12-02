
declare module MQTTHelper {
    
    export const MQTT : (uri:string)=>({

        listen(topic:string,handlerFn:( topic:string,message:Buffer)=>null ,opts:[]):null  
        send(topic:string,message:Buffer):null 

    })
}