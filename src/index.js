import mqtt, { connect } from "mqtt"

export default (uri)=>{

    

    return {
        
        send : (topic,msg,opts  )=>{


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
        
            

        },
        listen: (topic,handler,opts)=>{
            
            
            let connectOpts = {...{},...opts.connectOpts}
            let subscribeOpts = {...{},...opts.subscribeOpts}
           
            

            
            
            
            return new Promise((resolve,reject)=>{

                const client = mqtt.connect(uri,connectOpts) 
                client.on("message",handler)
                
               
                client.on("connect",()=>{
                   client.subscribe(topic,subscribeOpts,(err,granted)=>{
                       
                        if(err){
                            reject(err)
                        }
                        
                        resolve(client)
                       
                    })
               
                })


            })
                
                
               
               
              

           
        }
    }

}