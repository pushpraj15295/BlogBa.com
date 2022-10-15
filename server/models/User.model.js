
import {Schema ,model}  from "mongoose";


const UserSchema = new Schema({

    name : String,
    email : String,
    password : String, 
    age : Number,
})

export const UserModel = model("user" ,UserSchema);

// Role Based access control