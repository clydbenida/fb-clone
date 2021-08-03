import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

import HeaderNav from './HeaderNav'
import Posts from './Posts/Posts'
import CreatePostForm from './Posts/CreatePostForm'
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
      <HeaderNav />
      <main className="container-fluid pt-5" >
         <Row className="mt-4">
            <Col />
            <Col md={5}>
               <CreatePostForm handleSubmit={handleSubmit} />
               <hr />
               <Container>
                  <Posts posts={posts} />
               </Container>
            </Col>
            <Col />
         </Row>
      </main>
      </>
   );
}

export default Newsfeed;
