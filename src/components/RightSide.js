import React from "react"
import RelatedPosts from "./RelatedPosts"
import PostHeader from "./PostHeader"
import styled from "styled-components"

const Container = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`
const Content = styled.div`
  padding: 1rem;
`

const RightSide = ({ relatedPosts }) => {
  return (
    <Container>
      <PostHeader aside />
      <Content>
        {relatedPosts && relatedPosts.length > 0 && (
          <RelatedPosts relatedPosts={relatedPosts} />
        )}
      </Content>
    </Container>
  )
}

export default RightSide
