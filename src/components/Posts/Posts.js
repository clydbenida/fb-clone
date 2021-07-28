import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import moment from 'moment'
import { FaRegThumbsUp, FaRegCommentDots, FaEllipsisH } from 'react-icons/fa'

const PostButton = styled.button`
   background-color: white;
   color: #3f3f3f;
   border: none;

   :hover, :active {
      background-color: #dfdfdf;
      color: #000000;
   }

   :focus {
      background-color: unset;
      color: unset;
      box-shadow: none;
   }
`

const PostTemplate = ({ post, createdAt }) => {
   return (
      <div className="post-card mb-4 p-3">
         <h5 className="my-0">name</h5>
         <small className="text-muted">{`${moment(createdAt).fromNow()}`}</small>
         <p>{post}</p>
         <hr className="m-0" />
         <Row className="pt-1">
            <Col><PostButton className="btn btn-primary w-100"><FaRegThumbsUp /> </PostButton></Col>
            <Col><PostButton className="btn btn-primary w-100"><FaRegCommentDots /></PostButton></Col>
            <Col><PostButton className="btn btn-primary w-100"><FaEllipsisH /></PostButton></Col>
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