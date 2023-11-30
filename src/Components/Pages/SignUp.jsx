// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, VStack, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    avatar: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png?ga=GA1.1.1162169027.1699254330&semt=ais',
    email: '',
    password: '',
  });
  const navigate=useNavigate()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://mockserver-fidj.onrender.com/users', formData);
      alert('Sign up successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up. Please try again.');
    }
  };

  return (
    <VStack spacing={4} align="stretch" width="50%" margin="auto">
      <h1 style={{fontSize:"28px"}}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Sign Up
        </Button>
      </form>
    </VStack>
  );
};

export default SignUp;
