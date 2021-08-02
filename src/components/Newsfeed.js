import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

import HeaderNav from './HeaderNav'
import Posts from './Posts/Posts'
import CreatePostForm from './Posts/CreatePostForm'
import { useAuth } from '../context/AuthContext'
import httpClient from '../lib/httpClient'


const Newsfeed = () => {
   const { currentUser } = useAuth()
   const currentDate = new Date()
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
         console.log(currentUser)
         await httpClient.post("/post/create", {post: postRef.current.value, createdAt: currentDate.toString(), author: currentUser})
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
