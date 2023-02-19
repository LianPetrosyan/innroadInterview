import './App.css';
import 'antd/dist/antd.css';
import { Button, Divider, Layout, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import * as api from './lib/api';
import AddPost from './lib/AddPost';
import PostsTable from './lib/PostsTable';
import useUuid from './useUuid';
import axios from 'axios';

// YOU CANNOT CHANGE ANY COMPONENT INSIDE LIB FOLDER, JUST THIS ONE
// Before to start, please check the code inside lib folder just to get familiar with it
// With the minimum re-renders and not adding new useState, please do:
//  V   1. Fetch Users & pass it to AddPost sorted by name ascending 
//  V   2. Fetch Posts & pass it to PostsTable (fulfill the table)
//  V   2.1. Fetch post and users must happen in parallel
//  V   3. Use Sort button to toggle sort order on post by users' name
//  V   4. Receive new entries from AddPost and add them to PostsTable
// 5. BONUS: Make the alert only appear once after clicking on the element

function App() {

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  // ONLY MAKE YOUR CHANGES HERE

  const records = posts;

  const handleNewPost = (post) => {
    const newPost = {
        userId: post.userId,
        title: post.title,
        body: post.body,
        id: post.id,
        userName: getUserNameById(post.userId, users)
      }
    // axios.post('https://jsonplaceholder.typicode.com/posts', {
    //   userId: newPost.userId,
    //   title: newPost.title,
    //   body: newPost.body,
    //   id: newPost.id,
    //   userName: getUserNameById(newPost.userId, users)
    // })
    // .then(response => {

       let index = posts.findIndex(el => el.userId === post.userId)

       const newPosts = [...posts]
       newPosts.splice(index, 0, newPost)

      setPosts(newPosts)

      console.log(posts)

      

    //   const unSorted = ([...posts,response.data])
    //   const sorted = sortOrder === "asc"
    //   ? unSorted.slice().sort((a, b) => a.userName.localeCompare(b.userName))
    //   : unSorted.slice().sort((a, b) => b.userName.localeCompare(a.userName))
    // setPosts(sorted)
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

  useEffect(()=>{
    Promise.all([api.fetchUsers(), api.fetchPosts()])
    .then(([users, posts]) => {
      setUsers(users.sort((a, b) => a.name.localeCompare(b.name)))
      const obj = {
        
      }
      users.forEach(el=> obj[el.id] = el.username)
      console.log(obj)
      posts.forEach(el => el.userName = obj[el.userId])
      setPosts(posts)
    });
  },[])

  const handleSortClick = () => {
    const sorted = sortOrder === "asc"
      ? [...posts].sort((a, b) => a.userName.localeCompare(b.userName))
      : [...posts].sort((a, b) => b.userName.localeCompare(a.userName))
    setPosts(sorted)
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const getUserNameById = (userId, users) => {
    let user = users.find( user => user.id === userId)
    return user.username
  }

  // FINISH YOUR CHANGES HERE

  // ---------------------------------------------------------------

  // DONT REMOVE THIS LINE, THIS IS FOR step 5, BONUS
  const [uuid, handleRecordsChange] = useUuid();

  return (
    <Layout>
      <Layout.Content className="content">
        <Typography.Title>
          innRoad Interview
          <small id="uuid" className="records"> (Last uiid: {uuid})</small>
        </Typography.Title>
        <AddPost users={users} onSubmit={handleNewPost} />
        <Divider />
        <Button onClick={handleSortClick} className="sortButton">
          Sorting Posts: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
        <PostsTable records={records} onRecordsChange={handleRecordsChange} />
      </Layout.Content>
    </Layout>
  );
}

export default App;
