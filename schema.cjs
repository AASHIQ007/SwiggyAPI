const mongoose=require('mongoose')

const restaurantsSchema = new mongoose.Schema({
    name :{
        type : String,
        required:true
    },
    avgRating:{
        type :Number,
        required:true,   
    },
    costForTwo:{
        type : String,
        required:true
    },
    cuisines:{
        type: Array,
        required:true
    },
    contact:{
        type:Number,
        required:true,
    },
    place:{
        type: String,
        required:true
    }
},{versionKey:false})
const Restaurants = mongoose.model('restaurantslist',restaurantsSchema)


const userSchema = new mongoose.Schema({
    userName :{
        type : String,
        required:true,
    },
    email:{
        type :String,
        required:true,
    },
    password :{
        type : String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
    }
}, {versionKey: false})
const Users = mongoose.model('userDetails',userSchema)
module.exports={Restaurants,Users}
