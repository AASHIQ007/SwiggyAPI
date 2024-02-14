const express =require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const {Restaurants,Users}=require('./schema.cjs')
// mongoose.
// const {ObjectId}=require('mongoose')

//skdjf
const app = express()
app.use(bodyParser.json())
app.use(cors())
async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://Aashiq07:12345@cluster0.timq95j.mongodb.net/ResDetails?retryWrites=true&w=majority')

        console.log('Connection Established ||||....(()).o(≧▽≦)o.(())....||||')
        const port = process.env.PORT || 8000
        app.listen(port,function(){ 
            console.log(`listening on port ${port}...`)
        })
    }catch(error){
        console.log(error)
        console.log('Couldn\'t Establish connection :(')
    }
    
}
connectToDb()

app.post('/add-restaurant', async function(request,response){
    try{
        await Restaurants.create({
            "name":request.body.name,
            "avgRating":request.body.avgRating,
            "costForTwo":request.body.costForTwo,
            "cuisines":request.body.cuisines,
            "contact":request.body.contact,
            "place":request.body.place
        })
        response.status(202).json({
            "status":"Success",
            "message":"user created"
        })
    }catch(error){
        response.status(500).json({
            "status":"User not Created",
            "message": "internal server error",
            "error": error
        })
    }
})

app.get('/get-restaurant-details',async function(request,response){
    try{
        const restaurantDetails = await Restaurants.find()
        response.status(200).json(restaurantDetails)
    }catch(error){ 
        response.status(500).json({
        "status":"failure",
        "message": "not fetched",
        "error": error
    })     
    }

})


app.post('/create-new-user', async function(request,response){
    try{
        await Users.create({
            "userName":request.body.userName,
            "password":request.body.password,
            "email":request.body.email,
            "contact": request.body.contact
        })
        response.status(202).json({
            "status":"Success",
            "message":"user created"
        })
    }catch(error){
        response.status(500).json({
            "status":"User not Created",
            "message": "internal server error",
            "error": error
        })
    }
})

app.delete("/delete-restaurant-detail/:id",async function(request,response){
    try{
        const restaurant = await Restaurants.findByIdAndDelete(request.params.id)
        if (restaurant) {
            await Restaurants.findByIdAndDelete(request.params.id)
            response.status(202).json({
                "status":"Success",
                "message":"deleted successfully"
            }) 
        }
        else{
            response.status(500).json({
                "status":"failure",
                "message": "entry not deleted",
            })
        }
        
    }catch(error)
    {
        response.status(500).json({
            "status":"failure",
            "message": "not deleted",
        })
    }
})


app.post('/validate-user',async function(request,response){
    try{
        const User= await Users.findOne({
            "email":request.body.email,
            "password":request.body.password
        })
        if (User) {
            response.status(200).json({
                "message":"valid user"
            })
        }
        else{
            response.status(401).json({
                "message":"invalid user"
            })
        }
    }catch(error){
        response.status(500).json({
            "message":"invalid user"
        })
    }
})