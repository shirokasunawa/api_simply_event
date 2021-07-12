const express= require('express')
const router = express.Router()
const UserClient = require('../models/userClient')
const imgModel = require('../models/image');
const Pub = require('../models/pub');
const UserSociety = require('../models/userSociety')
const Products = require('../models/products')
const Event = require('../models/events')
const Checklists = require('../models/checklists')
const Conversation = require('../models/conversation')
const MessageClient = require('../models/messageClient')
const MessageSociety = require('../models/messageSociety')
const TypeEvents = require('../models/typeEvents')
const TypeActions = require('../models/typeactions')
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


module.exports = router

//Getting all client
router.get('/client', async (req,res)=>{
    //res.send('Hello')
    try{
        const usersClient  = await UserClient.find({}).populate([{
            path: "_events",
             model: Event ,
            select: ['titreEvent','budgetEvent','_checklists'],
            populate: {
                path: '_checklists',
               // model: Checklists,
               select: ['titreCheclist','productChecklist'],
               populate: {
                path: 'productChecklist',
               // model: Checklists,
               select: ['typeProduct','priceProduct'],

            }

            }
        }]) // key to populate
        .then(usersClient => {
           res.json(usersClient); 
        });
       
    } catch(error) {
        res.json({message : error.message})
    }
})

//Getting all society
router.get('/society', async (req,res)=>{
    //res.send('Hello')
    try{
        const usersSociety  = await UserSociety.find({}).populate({
            path: "_products",
            select: ['typeProduct','nomProduct','priceProduct']
        }) // key to populate
        .then(usersSociety => {
           res.json(usersSociety); 
        });
        

    } catch(error) {
        res.json({message : error.message})
    }
})
//Getting one client
router.get('/client/:id', async (req,res)=>{
    try{
        const userclient=  await UserClient.find({_id: req.params.id}).populate([{
            path: "_events",
             model: Event ,
            select: ['titreEvent','budgetEvent','_checklists']
            
            

           
        }])
        .then(userclient => {
            console.log(userclient)
            res.json(userclient);
        });
  
    }catch(error)
    {
        res.json({message : error.message})
    }

})
//Getting one society
router.get('/society/:id',async (req,res)=>{
    try{
        const userSociety=  await UserSociety.findById(req.params.id).populate({
            path: "_products",
            select: ['typeProduct','nomProduct','priceProduct']
        })
        .populate({
            path: "_pubs",
            model: Pub ,
            select: ['img','typeAbo','dateFin','nbrClick','nbrClickReel','endroit'],
            populate: {
                path:'img',
                model: imgModel ,
                select: ['img']
            }
        })
      
        .then(usersSociety => {
           res.json(usersSociety); 
        });
    }catch(error)
    {
        res.json({message : error.message})
    }
})
//deleting one user of client
router.delete('/client/:id',async (req,res)=>{
   // req.params.id
   try{
    const userclient=  await UserClient.findById(req.params.id).remove() ;
    
    res.json({message: 'user supprimé'})

    } catch(error) {
        res.status(404).json({message : error.message})
    }

})

//deleting one user of society
router.delete('/society/:id',async (req,res)=>{
    // req.params.id
    try{
        const usersociety=  await UserSociety.findById(req.params.id).remove() ;
        
        res.json({message: 'society supprimé'})
    
        } catch(error) {
            res.status(404).json({message : error.message})
        }
 
 })






//Updating one user of client
router.put('/client/:id', (req, res, next) => {
    UserClient.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //Updating one user of society
router.put('/society/:id', (req, res, next) => {
    UserSociety.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //Creating one user of client
  router.post('/client/', (req, res, next) => {
    //delete req.body._id;
    const userClient = new UserClient({
      ...req.body
    });

    userClient.save()
      .then(() => res.status(201).json(userClient))
      .catch(error => res.status(400).json({ error }));
  });
  
  //Creating one user of society
  router.post('/society/', (req, res, next) => {
    //delete req.body._id;
    const userSociety = new UserSociety({
      ...req.body
    });
    userSociety.save()
      .then(() => res.status(201).json(userSociety))
      .catch(error => res.status(400).json({ error }));
  });

  //Products
  router.get('/product', async (req,res)=>{
    //res.send('Hello')
    try{
        const products  = await Products.find({})
        .populate({
            path: 'seller',
           
            select: ['nameUser','roleUser'] 
          }).exec(function(err, products) {
            res.json(products);
            // do something
        });

    } catch(error) {
        res.json({message : error.message})
    }
})
//getting one product
router.get('/product/:id', async (req,res)=>{
    try{
        const products=  await  Products.findById(req.params.id).populate({
            path: 'seller',
           
            select: ['nameUser','roleUser'] 
          }).exec(function(err, products) {
            res.json(products);
            // do something
        });
   
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})
router.delete('/product/:id',async (req,res)=>{
    // req.params.id
    try{
     const products=  await Products.findById(req.params.id).remove() ;
     
     res.json({message: 'produit supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

 router.put('/product/:id', (req, res, next) => {
    Products.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'product modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  router.post('/product/', (req, res, next) => {
    //delete req.body._id;
    const products = new Products({
      ...req.body
    });
    products.save()
      .then(() => res.status(201).json({ message: 'product enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //insert and assign product to userSociety with id userSociety

  router.post('/product/:id', async (req, res, next) => {
 
  
  //Get Society
  try{    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return false;
    
 //create a new product
 const products = new Products({
    ...req.body
  });
    const _id = ObjectId(req.params.id);
    const userSociety = await UserSociety.findById(_id, function(err, doc) {
        if (err) {
          throw err;
        }
        if (!doc) {
          res.send(404);
        }
        return res.send(doc);
      });
  //assign userSociety as a product's seller
  products.seller =userSociety;
  //Save the products
  products.save();
   

  //add product to the userSociety's selling array products
  
      userSociety._products.push(products)

  //save the userSociety 
  userSociety.save();
  res.status(201).json(products);
  }catch(error) {
      res.status(404).json({message : error.message})
  }

    
  });

  //asign product already created to userSociety already created

  router.post('/product/:idproduct/:idUserSociety', async (req, res, next) => {
 
  
    //Get Society
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idproduct) ) return false;
        if( !mongoose.Types.ObjectId.isValid(req.params.idUserSociety) ) return false;
      
   //create a new product
   
      const _idproduct = ObjectId(req.params.idproduct);
      const _idusersociety = ObjectId(req.params.idUserSociety);
      const userSociety = await UserSociety.findById(_idusersociety, function(err, doc) {});

        const product = await Products.findById(_idproduct, function(err, doc) {  });
    //assign userSociety as a product's seller
    product.seller =userSociety;
    //Save the products
    product.save();
     
  
    //add product to the userSociety's selling array products
    
        userSociety._products.push(product)
  
    //save the userSociety 
    userSociety.save();
    res.status(201).json(product);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

   

    //event

    //Getting all event
router.get('/event', async (req,res)=>{
    //res.send('Hello')
    try{
        const event  = await Event.find({})
        .populate({
            path: 'owner',
           
            select: ['nom','adresseMail'] 
          }).exec(function(err, event) {
            res.json(event);
            // do something
        });
       

    } catch(error) {
        res.json({message : error.message})
    }
})

//Getting one event
router.get('/event/:id', async (req,res)=>{
    try{
        const event=  await Event.findById(req.params.id)
        /*.populate({
            path: 'owner',
            model: UserClient,
            select: ['nameUser','roleUser'] 
          }).exec(function(err, event) {
            res.json(event);*/
            .populate({
                path: 'owner',
               
                select: ['nom','adresseMail'] 
              })
              .populate({
                path: '_typeEvent',
               
                select: ['libelle'] 
              })
              .populate({
                path: '_checklists',
               
                select: ['titreCheclist','productChecklist'] 
              })
              .exec(function(err, event) {
                res.json(event);
                // do something
            });
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})

//Creating one event 
router.post('/event/', (req, res, next) => {
    //delete req.body._id;
    const event = new Event({
      ...req.body
    });

    event.save()
      .then(() => res.status(201).json(event))
      .catch(error => res.status(400).json({ error }));
  });

  router.delete('/event/:id',async (req,res)=>{
    // req.params.id
    try{
     const event=  await Event.findById(req.params.id).remove() ;
     
     res.json({message: 'event supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

 router.put('/event/:id', (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'event modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //asign event already created to userClient already created
  router.post('/event/:idevent/:iduserclient', async (req, res, next) => {
 
  
    //Get Society
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idevent) ) return false;
        if( !mongoose.Types.ObjectId.isValid(req.params.iduserclient) ) return false;
      
   //create a new product
   
      const _idevent = ObjectId(req.params.idevent);
      const _iduserclient = ObjectId(req.params.iduserclient);
      const userClient = await UserClient.findById(_iduserclient, function(err, doc) {});

        const event = await Event.findById(_idevent, function(err, doc) {  });
    //assign userSociety as a product's seller
    
    event.owner =userClient;
    //Save the products
    event.save();
     
  
    //add product to the userSociety's selling array products
    
    userClient._events.push(event);
  
    //save the userSociety 
    userClient.save();
    res.status(201).json(event);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

    //Checklist
 //Getting all checklists
router.get('/checklist', async (req,res)=>{
    //res.send('Hello')
    try{
        const checklists  = await Checklists.find({}).populate({
            path: 'created',
           
            select: ['titreEvent','budgetEvent'] 
          }).exec(function(err, checklists) {
            res.json(checklists);
            // do something
        });        
       

    } catch(error) {
        res.json({message : error.message})
    }
})


//Getting one event
router.get('/checklist/:id', async (req,res)=>{
    try{
        const checklists=  await Checklists.findById(req.params.id).populate({
            path: 'created',
           
            select: ['titreEvent','budgetEvent'] 
          }).exec(function(err, checklists) {
            res.json(checklists);
            // do something
        });        
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})

//Creating one checklist 
router.post('/checklist/', (req, res, next) => {
    //delete req.body._id;
    const checklists = new Checklists({
      ...req.body
    });

    checklists.save()
      .then(() => res.status(201).json(checklists))
      .catch(error => res.status(400).json({ error }));
  });

  router.delete('/checklist/:id',async (req,res)=>{
    // req.params.id
    try{
     const checklist=  await Checklists.findById(req.params.id).remove() ;
     
     res.json({message: 'checklist supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

 router.put('/checklist/:id', (req, res, next) => {
    Checklists.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'checklist modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //asign checklist already created to event already created

  router.post('/checklist/:idchecklist/:idevent', async (req, res, next) => {
 
  
    //Get Society
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idchecklist) ) return false;
        if( !mongoose.Types.ObjectId.isValid(req.params.idevent) ) return false;
      
   //create a new product
   
      const _idevent = ObjectId(req.params.idevent);
      const _idchecklist = ObjectId(req.params.idchecklist);
      const checklists = await Checklists.findById(_idchecklist, function(err, doc) {});

        const event = await Event.findById(_idevent, function(err, doc) {  });
    //assign userSociety as a product's seller
    
    event._checklists.push(checklists);
    //Save the products
    event.save();
     
  
   checklists.created = event;
  
    //save the userSociety 
    checklists.save();
    res.status(201).json(checklists);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

    // ASSIGN PRODUCT TO CHECKLIST ANS ADD POPULATE  CLIENT
    //asign checklist already created to event already created

  router.post('/checklistproduct/:idchecklist/:idproduct', async (req, res, next) => {
 
  
    //Get Society
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idchecklist) ) return false;
        if( !mongoose.Types.ObjectId.isValid(req.params.idproduct) ) return false;
      
   //create a new product
   
      const _idchecklist = ObjectId(req.params.idchecklist);
      const _idproduct = ObjectId(req.params.idproduct);
      const checklists = await Checklists.findById(_idchecklist, function(err, doc) {});

        const product = await Products.findById(_idproduct, function(err, doc) {  });
    //assign userSociety as a product's seller
    
    checklists.productChecklist = product;
    //Save the products
    checklists.save();
     
  
   
    res.status(201).json(checklists);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });


//Conversation 

//Getting one event
router.get('/conversation/:id', async (req,res)=>{
    try{
        const conversation=  await Conversation.findById(req.params.id).populate({
            path: '_idUserClient',
           
            select: ['nom'] 
          })
          .populate({
            path: '_idUserSociety',
           
            select: ['nameUser'] 
          })
          .populate('_messagesClient')
       .exec(function(err, conversation) {
                res.json(conversation);
                // do something
            });
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})

//Creating one conversation 
router.post('/conversation/:idclient/:idsociety', async (req, res, next) => {
 
  
    //Get Society
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idsociety) ) return false;
        if( !mongoose.Types.ObjectId.isValid(req.params.idclient) ) return false;
       // if( !mongoose.Types.ObjectId.isValid(req.params.idconversation) ) return false;
      
  

   
      const _idclient = ObjectId(req.params.idclient);
      const _idsociety = ObjectId(req.params.idsociety);
     // const _idconversation = ObjectId(req.params.idconversation);
      const client = await UserClient.findById(_idclient, function(err, doc) {});

        const society = await UserSociety.findById(_idsociety, function(err, doc) {  });
        //const conversation = await Conversation.findById(_idconversation, function(err, doc) {  });

        const conversation = new Conversation({
            ...req.body
          });
       
    //assign conversation as a client and usersociety id
    
    conversation._idUserClient = client;
    conversation._idUserSociety = society;
    //Save the products
    conversation.save();
     
  
   
    res.status(201).json(conversation);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

  router.delete('/conversation/:id',async (req,res)=>{
    // req.params.id
    try{
     const conversation=  await Conversation.findById(req.params.id).remove() ;
     
     res.json({message: 'conversation supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

  router.get('/conversation', async (req,res)=>{
    //res.send('Hello')
    try{
        const conversation  = await Conversation.find({}).populate({
            path: '_idUserClient',
           
            select: ['nom'] 
          })
          .populate({
            path: '_idUserSociety',
           
            select: ['nameUser'] 
          })
         .populate([{
            path: "_messagesClient",
             model: MessageClient ,
            select: ['content','dateTime','idUserClient'],
        }])
        .populate([{
            path: "_messagesSociety",
             model: MessageSociety ,
            select: ['content','dateTime','idUserSociety'],
        }])
         /* .populate({
            path: '_messagesClient',
            select: ['content'] 
          })       */
        .exec(function(err, conversation) {
            res.json(conversation);
            // do something
        });        
       

    } catch(error) {
        res.json({message : error.message})
    }
})

//Message user 

router.get('/messageclient/:id', async (req,res)=>{
    try{
        const messageClient=  await MessageClient.findById(req.params.id)
       .exec(function(err, messageClient) {
                res.json(messageClient);
                // do something
            });
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})

//Creating one 
router.post('/messageclient/', (req, res, next) => {
    //delete req.body._id;
    const messageClient = new MessageClient({
      ...req.body
    });

    messageClient.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }); 
router.post('/messageclient/:idmessageclient/:idconversation', async (req, res, next) => {
 
  
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idmessageclient) ) return false;
     
        if( !mongoose.Types.ObjectId.isValid(req.params.idconversation) ) return false;
      
        const _idmessageclient = ObjectId(req.params.idmessageclient);

   
      
      const _idconversation = ObjectId(req.params.idconversation);
      

       
        const conversation = await Conversation.findById(_idconversation, function(err, doc) {  });

        const messageClient = await MessageClient.findById(_idmessageclient, function(err, doc) {  });
       
    //assign conversation as a client and usersociety id
    
  
     
  conversation._messagesClient.push(messageClient);
conversation.save();
   
    res.status(201).json(conversation);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

  router.delete('/messageclient/:id',async (req,res)=>{
    // req.params.id
    try{
     const messageClient=  await MessageClient.findById(req.params.id).remove() ;
     
     res.json({message: 'message supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

  router.get('/messageclient', async (req,res)=>{
    //res.send('Hello')
    try{
        const messageClient  = await MessageClient.find({})
        
        .exec(function(err, messageClient) {
            res.json(messageClient);
            // do something
        });        
       

    } catch(error) {
        res.json({message : error.message})
    }
})


//Message society

router.get('/messagesociety/:id', async (req,res)=>{
    try{
        const messagesociety=  await MessageSociety.findById(req.params.id)
       .exec(function(err, messagesociety) {
                res.json(messagesociety);
                // do something
            });
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})

//Creating one 
router.post('/messagesociety/', (req, res, next) => {
    //delete req.body._id;
    const messagesociety = new MessageSociety({
      ...req.body
    });

    messagesociety.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }); 
router.post('/messagesociety/:idmessagesociety/:idconversation', async (req, res, next) => {
 
  
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idmessagesociety) ) return false;
     
        if( !mongoose.Types.ObjectId.isValid(req.params.idconversation) ) return false;
      
        const _idmessagesociety = ObjectId(req.params.idmessagesociety);

   
      
      const _idconversation = ObjectId(req.params.idconversation);
      

       
        const conversation = await Conversation.findById(_idconversation, function(err, doc) {  });

        const messageSociety = await MessageSociety.findById(_idmessagesociety, function(err, doc) {  });
       
    //assign conversation as a client and usersociety id
    
  
     
  conversation._messagesSociety.push(messageSociety);
conversation.save();
   
    res.status(201).json(conversation);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

  router.delete('/messagesociety/:id',async (req,res)=>{
    // req.params.id
    try{
     const messageSociety=  await MessageSociety.findById(req.params.id).remove() ;
     
     res.json({message: 'message supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

  router.get('/messagesociety', async (req,res)=>{
    //res.send('Hello')
    try{
        const messageSociety  = await MessageSociety.find({})
        
        .exec(function(err, messageSociety) {
            res.json(messageSociety);
            // do something
        });        
       

    } catch(error) {
        res.json({message : error.message})
    }
})

//typeEvent

router.get('/typeEvents/:id', async (req,res)=>{
    try{
        const typeEvents=  await TypeEvents.findById(req.params.id)
       .exec(function(err, typeEvents) {
                res.json(typeEvents);
                // do something
            });
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})

//Creating one 
router.post('/typeEvents/', (req, res, next) => {
    //delete req.body._id;
    const typeEvents = new TypeEvents({
      ...req.body
    });

    typeEvents.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }); 
router.post('/typeEvents/:idtypeevents/:idevent', async (req, res, next) => {
 
  
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idtypeevents) ) return false;
     
        if( !mongoose.Types.ObjectId.isValid(req.params.idevent) ) return false;
      
        const _idtypeevents = ObjectId(req.params.idtypeevents);

   
      
      const _idevent = ObjectId(req.params.idevent);
      

       
        const typeEvents = await TypeEvents.findById(_idtypeevents, function(err, doc) {  });

        const event = await Event.findById(_idevent, function(err, doc) {  });
       
    //assign conversation as a client and usersociety id
    
  
     
    event._typeEvent=typeEvents;
    event.save();
   
    res.status(201).json(event);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

  router.delete('/typeEvents/:id',async (req,res)=>{
    // req.params.id
    try{
     const typeEvents=  await TypeEvents.findById(req.params.id).remove() ;
     
     res.json({message: 'type event supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

  router.get('/typeEvents', async (req,res)=>{
    //res.send('Hello')
    try{
        const typeEvents  = await TypeEvents.find({})
        
        .exec(function(err, typeEvents) {
            res.json(typeEvents);
            // do something
        });        
       

    } catch(error) {
        res.json({message : error.message})
    }
})

router.put('/typeEvents/:id', (req, res, next) => {
    TypeEvents.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'checklist modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //TypeActions
  


router.get('/typeActions/:id', async (req,res)=>{
    try{
        const typeActions=  await TypeActions.findById(req.params.id)
       .exec(function(err, typeActions) {
                res.json(typeActions);
                // do something
            });
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})

//Creating one 
router.post('/typeActions/', (req, res, next) => {
    //delete req.body._id;
    const typeActions = new TypeActions({
      ...req.body
    });

    typeActions.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }); 
  //assign typeEvent to typeActions
router.post('/typeActions/:idtypeevents/:idtypeactions', async (req, res, next) => {
 
  
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idtypeevents) ) return false;
     
        if( !mongoose.Types.ObjectId.isValid(req.params.idtypeactions) ) return false;
      
        const _idtypeactions = ObjectId(req.params.idtypeactions);

   
      
      const _idtypeevents = ObjectId(req.params.idtypeevents);
      

       
        const typeEvents = await TypeEvents.findById(_idtypeevents, function(err, doc) {  });

        const typeActions = await TypeActions.findById(_idtypeactions, function(err, doc) {  });
       
    //assign conversation as a client and usersociety id
    
  
     
    typeActions._typeEvent.push(typeEvents);
    typeActions.save();
   
    res.status(201).json(typeActions);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

  router.delete('/typeActions/:id',async (req,res)=>{
    // req.params.id
    try{
     const typeActions=  await TypeActions.findById(req.params.id).remove() ;
     
     res.json({message: 'type event supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

  router.get('/typeActions', async (req,res)=>{
    //res.send('Hello')
    try{
        const typeActions  = await TypeActions.find({})
        .populate({
            path: '_typeEvent',
            model: TypeEvents ,
            select: ['libelle'] 
          })
        
        .exec(function(err, typeActions) {
            res.json(typeActions);
            // do something
        });        
       

    } catch(error) {
        res.json({message : error.message})
    }
})

router.put('/typeActions/:id', (req, res, next) => {
    TypeActions.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'checklist modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });




  ///photo
  
  
  //Creating one user of client
  router.post('/photo/', (req, res, next) => {
    //delete req.body._id;
    const img = new imgModel({
      ...req.body
    });

    img.save()
      .then(() => res.status(201).json(img))
      .catch(error => res.status(400).json({ error }));
  });

  
  router.get('/photo', async (req,res)=>{
    //res.send('Hello')
    try{
        const img  = await imgModel.find({})
        
        .exec(function(err, img) {
            res.json(img);
            // do something
        });        
       

    } catch(error) {
        res.json({message : error.message})
    }
})

router.put('/photo/:id', (req, res, next) => {
    imgModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'img modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  router.delete('/photo/:id',async (req,res)=>{
    // req.params.id
    try{
     const img=  await imgModel.findById(req.params.id).remove() ;
     
     res.json({message: 'img supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

 
router.get('/photo/:id', async (req,res)=>{
    try{
        const img=  await imgModel.findById(req.params.id)
       .exec(function(err, img) {
                res.json(img);
                // do something
            });
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})

//Pub

  //Creating one user of client
  router.post('/pub/', (req, res, next) => {
    //delete req.body._id;
    const pub = new Pub({
      ...req.body
    });

    pub.save()
      .then(() => res.status(201).json(pub))
      .catch(error => res.status(400).json({ error }));
  });

  
  router.get('/pub', async (req,res)=>{
    //res.send('Hello')
    try{
        const pub  = await Pub.find({})
        
        .exec(function(err, pub) {
            res.json(pub);
            // do something
        });        
       

    } catch(error) {
        res.json({message : error.message})
    }
})

router.put('/pub/:id', (req, res, next) => {
    Pub.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'img modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  router.delete('/pub/:id',async (req,res)=>{
    // req.params.id
    try{
     const pub=  await Pub.findById(req.params.id).remove() ;
     
     res.json({message: 'pub supprimé'})
 
     } catch(error) {
         res.status(404).json({message : error.message})
     }
 
 })

 
router.get('/pub/:id', async (req,res)=>{
    try{
        const pub=  await Pub.findById(req.params.id)
       .exec(function(err, pub) {
                res.json(pub);
                // do something
            });
            
       
    }catch(error)
    {
        res.json({message : error.message})
    }
  
})


  //asign event already created to userClient already created
  router.post('/pub/:idpub/:idimage', async (req, res, next) => {
 
  
    //Get Society
    try{    if( !mongoose.Types.ObjectId.isValid(req.params.idpub) ) return false;
        if( !mongoose.Types.ObjectId.isValid(req.params.idimage) ) return false;
      
   //create a new product
   
      const _idpub = ObjectId(req.params.idpub);
      const _idimage = ObjectId(req.params.idimage);
      const pub = await Pub.findById(_idpub, function(err, doc) {});

        const img = await imgModel.findById(_idimage, function(err, doc) {  });
    //assign userSociety as a product's seller
    
    pub.img =img;
    //Save the products
    pub.save();
     

    res.status(201).json(pub);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
  
      
    });

    //asign pub to an user society pub's
    router.post('/pubSociety/:idpub/:idusersociety', async (req, res, next) => {
 
  
        //Get Society
        try{    if( !mongoose.Types.ObjectId.isValid(req.params.idpub) ) return false;
            if( !mongoose.Types.ObjectId.isValid(req.params.idusersociety) ) return false;
          
       //create a new product
       
          const _idpub = ObjectId(req.params.idpub);
          const _idusersociety = ObjectId(req.params.idusersociety);
          const pub = await Pub.findById(_idpub, function(err, doc) {});
    
            const userSociety = await UserSociety.findById(_idusersociety, function(err, doc) {  });
        //assign userSociety as a product's seller
        
        userSociety._pubs.push(pub);
        //Save the products
        userSociety.save();
         
    
        res.status(201).json(userSociety);
        }catch(error) {
            res.status(404).json({message : error.message})
        }
      
          
        });