import mqtt, { connect } from "mqtt"

 
export default (uri)=>{

    
        const Connection = ()=>{

            let _client = null 
            let isListening = false 
            const getClient = ()=> { 
               
            
             return    _client 
            }
                const send = (topic,msg,opts  )=>{
                if(isListening){
                    throw new Error("already listening can not sent the same connection.Generate new one ")
                }
                opts = opts || {}
                const  connectOpts = {...{},...opts.connectOpts}
                const  subscribeOpts = {...{},...opts.subscribeOpts}
                const  publishOpts = {...{},...opts.publishOpts}
    
                
                return new Promise((resolve,reject)=>{
    
                    const client = mqtt.connect(uri,connectOpts) 
                    client.on("error",(err)=> reject(err))
    
                    client.on("connect",()=>{
                         
                        _client = client    
                        
                        console.log("publishing : ",topic)
                            
                            client.publish(topic,msg, publishOpts,(err,packet)=>{
                                if(err){
                                    reject(err.message)
                                }
                                resolve(packet)
                            })
                            
                                           
                         
                            
                      
                    })
    
                })
            
                
    
            }
           const newConnection  = ()=>{
                return Connection(uri)
           }
           const  listen =  (topic,handlerFn,opts)=>{
                
                opts = opts || {}
                let connectOpts = {...{},...opts.connectOpts}
                let subscribeOpts = {...{},...opts.subscribeOpts}
                    
                const client = mqtt.connect(uri,connectOpts) 
                client.on("message",handlerFn)
            
    
                client.on("connect",()=>{
                    _client = client 
                       client.subscribe(topic,subscribeOpts,(err,granted)=>{
                           
                            if(err){
                                throw new Error(err.message)
                            }
                            isListening = true 
                             
                           
                        })
                   
                    })      
    
            }
            return {send,listen,newConnection,getClient}
        }
        
        const connection = Connection()
        return {send : connection.send,
                listen:connection.listen , 
                newConnection:connection.newConnection,
                getClient:connection.getClient}
}   