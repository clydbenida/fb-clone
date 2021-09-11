import React, { useRef, useState } from 'react'
import { Form, Modal, Container, Row, Col } from 'react-bootstrap'

import { useAuth } from '../../context/AuthContext'
import EggHead from '../../assets/egg.jpg'

const CreatePost = ({handleSubmit}) => {
   const { userData } = useAuth()
   const [ show, setShow ] = useState(false)
   return (
      <>
         <Container>
            <Row>
               <Col md={1}>
                  <img src={EggHead} className="img-fluid" />
               </Col>
               <Col md={11}>
                  <button className='btn btn-primary w-100 text-start p-2 rounded-pill' onClick={() => setShow(true)}>
                     What's on your mind, {userData?.name?.firstName}?
                  </button>
               </Col>
            </Row>

            <Row>
               <Col></Col>
               <Col></Col>
               <Col></Col>
            </Row>
         </Container>

         <Modal show={show} onHide={() => setShow(false)} centered animation={false}>
            <Modal.Header className='text-center'>
               <h3 className='w-100'>Create Post</h3>
            </Modal.Header>
            <Modal.Body>
               <CreatePostForm handleSubmit={handleSubmit} userData={userData} setShow={setShow} />
            </Modal.Body>
         </Modal>
      </>
   )
}

const CreatePostForm = ({handleSubmit, userData, setShow}) => {
   const [post, setPost] = useState('')
   const [disabled, setDisabled] = useState(true)

   function formSubmit (e) {
      e.preventDefault()
      handleSubmit(post)
      setShow(false)
   }
   
   function onPostChange(e) {
      e.preventDefault()
      setPost(e.target.value)
      setDisabled(false)
      if (e.target.value === '') {
         setDisabled(true)
      }
   }

   return (
      <Form onSubmit={formSubmit}>
         <Container>
            <Row>
               <Col md={1}>
                  <img src={EggHead} className='img-fluid' />
               </Col>
               <Col>
               <h6>
                  {userData?.name?.firstName} {userData?.name?.lastName}
               </h6>
               </Col>
            </Row>
         </Container>
         <Form.Control className='py-3 my-3' onChange={onPostChange} as="textarea" placeholder="What's on your mind?" style={{resize: 'none', border: 'none'}} />
         <button className={`btn btn-primary my-1 w-100 ${disabled && 'disabled'}`}>Post</button>
      </Form>
   );
}

export default CreatePost;
