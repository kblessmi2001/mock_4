
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, VStack, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate=useNavigate()

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://mockserver-fidj.onrender.com/users');
      const users = response.data;

      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );

      if (user) {
        localStorage.setItem("email",loginData.email)
        alert('Login successful!');
        navigate('/forum');

      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <VStack spacing={4} align="stretch" width="50%" margin="auto">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </form>
    </VStack>
  );
};

export default Login;