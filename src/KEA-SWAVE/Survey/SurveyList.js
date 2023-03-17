import React from "react";
import styled from "styled-components";
import SurveyListItem from "./SurveyListItem";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function SurveyList(props) {
  const { posts, onClickItem } = props;
  console.log(posts);
  return (
    <Wrapper>
      {" "}
      {posts.map((post, index) => {
        return(
        <SurveyListItem key={post.id} post={post} onClick={() => { onClickItem(post); }}/>
        )
      })}
    </Wrapper>
  );
}

export default SurveyList;
