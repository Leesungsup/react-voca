import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 720px;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
function PostWritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:3001/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content
        }),
      }).then(res => {
        if (res.ok) {
          alert("생성이 완료 되었습니다");
          navigate("/");
          setIsLoading(false);
        }
      });
    }
  }

  return (
    <form onSubmit={onSubmit}>
    <Wrapper>
      <Container>
        <TextInput
          height={20}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextInput
          height={480}
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <Button
          title="글 작성하기"
          style={{
            opacity: isLoading ? 0.3 : 1,
          }}
        />
      </Container>
    </Wrapper>
    </form>
  );
}

export default PostWritePage;
