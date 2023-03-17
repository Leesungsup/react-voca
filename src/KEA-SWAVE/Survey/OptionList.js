import React from "react";
import styled from "styled-components";
import OptionListItem from "./OptionListItem";
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
function OptionList(props) {
  const { comments } = props;
  return (
    <Wrapper>
      {comments.map((comment, index) => {
        return <OptionListItem key={index} comment={comment} />;
      })}
    </Wrapper>
  );
}

export default OptionList;
