import React, { useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'

import CreatePostForm from './Posts/CreatePostForm'
import Posts from './Posts/Posts'
import { useAuth } from '../context/AuthContext'
import httpClient from '../lib/httpClient'

const Newsfeed = () => {
   const { currentUser, userData } = useAuth()
   const [ posts, setPosts ] = useState([])
   const [ showSuccess, setShowSuccess ] = useState(false)

   useEffect(() => {
      async function getPosts() {
         const response = await httpClient.get('/post/')
         setPosts(response.data)
      }

      getPosts()
   }, [showSuccess])

   const handleSubmit = async (postRef) => {
      try {
         await httpClient.post("/post/create", {
            post: postRef.current.value, 
            createdAt: new Date().toString(), 
            author: {
               uid: currentUser.uid,
               ...userData
            }})
         postRef.current.value = ""
         setShowSuccess(!showSuccess)
      } catch (err) {
         console.log(err)
      }
   }
   return (
      <>
         <CreatePostForm handleSubmit={handleSubmit} />
         <hr />
         <Container>
            <Posts posts={posts} />
         </Container>
      </>
   );
}

export default Newsfeed;
