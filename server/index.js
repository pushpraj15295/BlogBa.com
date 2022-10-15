
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "./models/User.model.js";
import cors from "cors"
//npm install jsonwebtoken
import jwt from "jsonwebtoken";

import dotenv from "dotenv"
dotenv.config();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  
  // res.sendFile(__dirname + "/index.html")
   res.send("wellcome to home")

} );




const blacklist = [];   // store it after in database

// signup ******************************************************
app.post("/signup", async (req, res) => {
  const { name, email, password, age } = req.body;
  //  console.log(name, email, password)

  //saving new user to database
  const newUser = new UserModel({ name, email, password, age });

  await newUser.save();
  //  console.log("newUser",newUser)
  res.send("User created successfully");
});

// user search by id token *****************************************
app.get("/user/:id", async(req, res) => {
     const {id} = req.params;
     const user = await UserModel.findById(id);

    //  console.log(user);
    const token = req.headers["authorization"];
     if(blacklist.includes(token)){
        return 401;
     }

    if(!token){
        return res.status(401).send("Unauthorized");
    }
    //varify jwd token with secret key
     try{
        //jwt.decode(token)
        jwt.verify(token ,process.env.SECRET_KEY)

        const user = await UserModel.findById(id);
        return res.send(user)
     }catch(e){

         console.log(e.message)
         if(e.message === "jwt expired"){
            blacklist.push(token)
         }
        return res.status(401).send("Token is unvalid");
     }

    //  res.send(user);
});



//login + JWT *************************************
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });

  if (!user) {
    return res.send("Invalid credentials");
  }
  //we generate the token here + sicret KEY +  expire time 
  //1st
  const token = jwt.sign(
    { id: user._id, email: user.email, age: user.age },
    process.env.SECRET_KEY,
    { expiresIn : "300 seconds"}
  );
 //2nd
  const refreshToken = jwt.sign({ id: user._id, email: user.email}, process.env.REFRESH_KEY )

  res.send({ message: "Login successful", token , name : user.name ,refreshToken });
    
    
});


// for refreshToken *************************************

app.post("/refresh" , async (req, res) => {

    // const refreshToken = req.body.token;
    const refreshToken = req.headers.authorization;
    try{

      const data = jwt.verify(refreshToken,process.env.REFRESH_KEY)

      // if refresh token is valid genrate a new main token + with secret key of main token
      const maintoken = jwt.sign(data,process.env.SECRET_KEY)

      return res.send({token:maintoken})

    }catch(e){
        return res.send("refresh token invalid")
        //login again
    }
})

// logout *******************************************************
app.post("/logout" , async (req, res) => {

     const token = req.headers.authorization;

     blacklist.push(token)
     // put both refresh and main token into blacklist 
})



// github request *******************************************


app.get("/github/callback", (req, res) => {

     console.log(req.query.code);   // use this code to access privet github APIs

     res.send("sign in with github success")
})

// google request ****************************************

app.get("/google/callback", (req, res) => {
   
   res.send("sign in with google success")
})



// port
mongoose.connect("mongodb://localhost:27017/nem201").then(() => {
  app.listen(8080, () => {
    console.log("server running on port : http://localhost:8080");
  });
});
