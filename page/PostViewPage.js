import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
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
const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;
const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;
const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
`;
const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
function PostViewPage(props) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setpost] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const c = [];
  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:3001/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleid: postId * 10,
          content: comment,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료 되었습니다");
          navigate(`/post/${postId}`);
          setIsLoading(false);
        }
      });
    }
  }
  useEffect(() => {
    fetch(`http://localhost:3001/post/${postId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setpost(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/comments`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          console.log(Math.floor(data[i].id / 10));
          if (
            Math.floor(data[i].id / 10) == postId ||
            Math.floor(data[i].articleid / 10) == postId
          ) {
            c.push(data[i]);
          }
        }
        setComments(c);
      });
  }, [post]);

  return (
    <div>
      {post && (
        <Wrapper>
          <Container>
            <Button
              title="뒤로 가기"
              onClick={() => {
                navigate("/");
              }}
            />
            <PostContainer>
              {" "}
              <TitleText>{post.title}</TitleText>{" "}
              <ContentText>{post.content}</ContentText>
            </PostContainer>
            <CommentLabel>댓글</CommentLabel>
            {comments && <CommentList comments={comments} />}
            <form onSubmit={onSubmit}>
              <TextInput
                height={40}
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
              <Button title="댓글 작성하기" />
            </form>
          </Container>
        </Wrapper>
      )}
    </div>
  );
}

export default PostViewPage;
