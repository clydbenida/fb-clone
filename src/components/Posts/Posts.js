import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import moment from 'moment'

const PostTemplate = ({ post, createdAt }) => {
   return (
      <div className="post-card mb-4">
         <h5 className="my-0">name</h5>
         <small className="text-muted">{`${moment(createdAt).fromNow()}`}</small>
         <p>{post}</p>
         <Row>
            <Col><button
             className="btn btn-primary w-100">👍</button></Col>
            <Col><button className="btn btn-primary w-100">💬</button></Col>
         </Row>
      </div>
   )
}

const Posts = ({posts}) => {

   const PostSet = posts.map((el, idx) => (
      <PostTemplate key={idx} post={el.post} createdAt={el.createdAt} />
   ))

   return (
      <div>
         {PostSet.reverse()}
      </div>
   );
}

export default Posts;