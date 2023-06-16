// Task1: initiate app and run server at 3000
const express=require('express');
const morgan=require('morgan');
const app=new express();
require('dotenv').config()
app.use(morgan('dev'));
 const PORT=process.env.PORT;                                                                                                                                                                                                                    
     app.listen(PORT,()=>{
console.log(`server running on port ${PORT}`);
});
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose=require('mongoose');
mongoose.connect(process.env.mongodb_url)
.then(()=>{
    console.log('connected to my local db')
})
.catch(()=>{
    console.log('error !! connection lost')
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const employSchema=mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
});
const employData=mongoose.model('employ',employSchema);



//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async (req,res)=>{
    try {
       const data=await employData.find();
       res.status(200).json(data);
     
    } catch (error) {
       res.status(400).json('cannot get') ;
    }
})


//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',async (req,res)=>{
try {
    const data=await employData.findone();
    res.status(200).json(data);
  
 } catch (error) {
    res.status(400).json('cannot get') ;
 }
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async (req,res)=>{
    try {
       const item=req.body;
       const newdata=await employData(item);
       newdata.save();
        res.status(200).json('post successful');
    } catch (error) {
    res.status(400).json('no post');
    }
    })
    






//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
        let id=req.params.id
        console.log('id check',id)
        const updated=await employData.findByIdAndDelete(id)
        res.send('deleted successfully')
    }catch(error){
        console.log(error)
        res.send('error')
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.get('/api/employeelist',async(req,res)=>{
    try{
        const id=req.body._id
        console.log({"_id":id},{$set:{"name":req.body.name,"location":req.body.location,"position":req.body.position,"salary":req.body.salary}})
        const updated=await employData.findByIdAndUpdate(id)
        res.status(200).json('updated successfully');
    }catch(error){
        console.log(error)
        res.send('error')
    }
})

//     try{
//         console.log(params)
//     }
//     catch(error){
//         console.log(error)
//         res.send('not updated')
//     }
// })

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



