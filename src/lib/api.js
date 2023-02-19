// Docs: https://jsonplaceholder.typicode.com/
import axios from 'axios';

export const fetchUsers = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
};

export const fetchPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};
