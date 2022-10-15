import { Box, Button, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const init={
  email: "",
  password: "",
}


const Login = () => {

  const [cred,setCred] = useState(init)

  const navigate = useNavigate()
    const handleChange=(e)=>{
       setCred({...cred ,
              [e.target.name] : e.target.value
        } )
    }

    const handleLoginUser= async()=>{
       
      let respond = await axios.post("http://localhost:8080/login", cred)

      
      console.log(respond.data)
        if(respond.data){
          alert(`${respond.data.message || "Invalid credentials "}`);
           if(respond.data.token){

            localStorage.setItem("token", respond.data.token)
            localStorage.setItem("name", respond.data.name)
            navigate("/")
           }
          
        }
        
      
    }

  return (
    <>
    <Box width="40%" margin="auto" >
           <Text textAlign="center" fontSize="30px" color="green" > Login </Text>
           <br />
           <br />
           <Input variant='flushed' placeholder='Enter your Email' onChange={(e)=> handleChange(e)}  name="email" />
           <br />
           <br />
           <Input variant='flushed' placeholder='Enter your password' onChange={(e)=> handleChange(e)}  name="password" />
           <br />
           <br />
           <Button colorScheme='linkedin' width="100%" onClick={()=> handleLoginUser()}> Login </Button>
           <br />
           <br />
           <Text textAlign="center" fontSize="25px" color="red"  > Or </Text>
           <br /><br />
           <Link to="/signup"> <Button colorScheme='pink' variant='solid' width="100%" >  Create an Account </Button>  </Link>

    </Box>
    </>
  )
}

export default Login