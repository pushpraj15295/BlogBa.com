import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const init={
    name:"",
    email: "",
    password: "",
    age: "",
}

const Signup = () => {

  const [cred,setCred] = useState(init)

  const navigate = useNavigate()
    const handleChange=(e)=>{
      const {name,value} = e.target
       setCred({...cred ,
              [name] : value
        } )
    }
  
    console.log(cred)

    const handleSignupUser= async()=>{
       
      let respond = await axios.post("http://localhost:8080/signup",cred)

      // console.log(cred)
      console.log(respond.data)
        if(respond.data){
          alert(`${respond.data}`)
          navigate("/login")
        }
        
      
    }
  return (
    <>
      <Flex>
      <Box width="40%" margin="auto" >
           <Text textAlign="center" fontSize="30px" color="green" > Sign Up </Text>
           <br /><br />
           <Input variant='flushed' placeholder='Enter your name'  onChange={(e)=> handleChange(e)}  name="name" min="4" max="12" required />
           <br />
           <br />
           <Input variant='flushed' placeholder='Enter your Email' onChange={(e)=> handleChange(e)}  name="email"  />
           <br />
           <br />
           <Input variant='flushed' placeholder='Enter your password' onChange={(e)=> handleChange(e)}  name="password" required />
           <br />
           <br />
           <Input type="number" variant='flushed' placeholder='Enter your age' onChange={(e)=> handleChange(e)}  name="age"  />
           <br /><br />

           <Button width="100%" colorScheme='linkedin' onClick={()=> handleSignupUser()} > Signup </Button>
           <br />
           <br />
           <Text textAlign="center" fontSize="25px" color="red" > Or </Text>
           <br /><br />
           <Link to="/login"><Button colorScheme='pink' variant='solid' width="100%" > Already have an Account  </Button></Link>

    </Box>
          <Box width="40%" margin="auto">
              
           <a href=""><Button width="90%" colorScheme='linkedin'>Sing up with Google</Button></a>
       
              <br /><br />
            <a href="https://github.com/login/oauth/authorize?client_id=45fe4026a9cfec945bda"> <Button width="90%" colorScheme='orange'>Sing up with Github</Button></a>
            
            <br /><br />
             <a href=""><Button width="90%" colorScheme='teal' variant='solid'>
            Sing up with Email
  </Button></a>
          </Box>
      </Flex>
    </>
  )
}

export default Signup