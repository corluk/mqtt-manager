import mqtt, { connect } from "mqtt"

 
export default (uri)=>{

    


        
        const send = (topic,msg,opts  )=>{

            opts = opts || {}
            const  connectOpts = {...{},...opts.connectOpts}
            const  subscribeOpts = {...{},...opts.subscribeOpts}
            const  publishOpts = {...{},...opts.publishOpts}

            
            return new Promise((resolve,reject)=>{

                const client = mqtt.connect(uri,connectOpts) 
                client.on("error",(err)=> reject(err))
                client.on("connect",()=>{
                    
                    client.subscribe(topic, subscribeOpts ,(err,granted)=>{

                        
                        if(err){
                            reject(err)

                        }
                        client.publish(topic,msg, publishOpts)
                        
                        resolve(client)                
                    })
                        
                  
                })

            })
        
            

        }
       
       const  listen =  (topic,handlerFn,opts)=>{
            
            opts = opts || {}
            let connectOpts = {...{},...opts.connectOpts}
            let subscribeOpts = {...{},...opts.subscribeOpts}
                
            const client = mqtt.connect(uri,connectOpts) 
            client.on("message",handlerFn(client))
        

            client.on("connect",()=>{
                   client.subscribe(topic,subscribeOpts,(err,granted)=>{
                       
                        if(err){
                            throw new Error(err.message)
                        }
                        
                         
                       
                    })
               
                })      

        }
    
        return {send,listen}
}   