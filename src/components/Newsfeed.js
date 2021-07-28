import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import HeaderNav from './HeaderNav'
import Posts from './Posts/Posts'
import { useAuth } from '../context/AuthContext'
import httpClient from '../lib/httpClient'


const Newsfeed = () => {
   const postRef = useRef()
   const { currentUser, authToken } = useAuth()
   const currentDate = new Date()
   const [ posts, setPosts ] = useState([])
   const [ showSuccess, setShowSuccess ] = useState(false)

   useEffect(() => {
      async function getPosts() {
         const response = await httpClient.get('/post/', { headers: {Authorization: authToken }})
         setPosts(response.data)
      }

      getPosts()
   }, [showSuccess])

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         await httpClient.post("/post/create", {post: postRef.current.value, createdAt: currentDate.toString()})
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
         <Row className="mt-3">
            <Col>

            </Col>
            <Col md={5}>
            <Form onSubmit={handleSubmit}>
               <Form.Control ref={postRef} as="textarea" placeholder="What's on your mind?" />
               <button className="btn btn-primary my-1">Post</button>
            </Form>
            <hr />
            <Container>
               <Posts posts={posts} />
            </Container>
            </Col>
            <Col>
            </Col>
         </Row>
      </main>
      </>
   );
}

export default Newsfeed;
