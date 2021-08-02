import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'

const CreatePostForm = ({handleSubmit}) => {
   const postRef = useRef()
   function formSubmit (e) {
      e.preventDefault()
      handleSubmit(postRef)
   }
   return (
         <Form onSubmit={formSubmit}>
            <Form.Control ref={postRef} as="textarea" placeholder="What's on your mind?" style={{resize: 'none'}} />
            <button className="btn btn-primary my-1">Post</button>
         </Form>
   );
}

export default CreatePostForm;
