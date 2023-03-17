import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import OptionList from "./OptionList";
import { RadioGroup, RadioButton } from "react-radio-buttons";

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
function SurveyViewPage(props) {
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const [selectDatatype, setSelectDatatype] = useState(1);
  const [post, setpost] = useState();
  const [comments, setComments] = useState([]);
  const [selectData, setSelectData] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    // const { name, value } = e.target;
    console.log(e.target.value);
    setSelectData(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:3001/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          select: selectData,
          surveyId:surveyId
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료 되었습니다");
          navigate(`/survey`);
          setIsLoading(false);
        }
      });
    }
  }
  function Cal() {

    if (post.optionType == 2) {
      return (
        <div>
          {post.option.map((op) => (
            <label key={"radio" + op}>
              {op}:
              <input
                onChange={handleChange}
                key={op}
                type="radio"
                name="option"
                value={op}
                style={{ zoom: "2.0" }}
              />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
          ))}
        </div>
      );
    }
    else if(post.optionType == 1){
      return (
        <div>
          <label key={"radio"}>
              Yes :
              <input
                onChange={handleChange}
                key="Yes"
                type="radio"
                name="option"
                value="Yes"
                style={{ zoom: "2.0" }}
              />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <label key={"radio"}>
              No :
              <input
                onChange={handleChange}
                key="No"
                type="radio"
                name="option"
                value="No"
                style={{ zoom: "2.0" }}
              />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
        </div>
      );
    }
    else if(post.optionType == 3){
      return(
        <div>
          <TextInput
              height={40}
              value={selectData}
              onChange={(event) => {
                setSelectData(event.target.value);
              }}
            />
        </div>
      )
    }
  }
  useEffect(() => {
    fetch(`http://localhost:3001/survey/${surveyId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setpost(data);
      });
  }, []);

  return (
    <div>
      {post && (
        <Wrapper>
          <Container>
            <Button
              title="뒤로 가기"
              onClick={() => {
                navigate("/survey");
              }}
            />
            <PostContainer>
              {" "}
              <TitleText>{post.questions}</TitleText>{" "}
              <ContentText>{post.content}</ContentText>
            </PostContainer>
            <CommentLabel>답변</CommentLabel>
            <form onSubmit={onSubmit}>
              {post && Cal()}
              {/* {post.option.map((op, index) => {
              <input
                key={index}
                type="radio"
                onChange={handleChange}
                value={op}
                style={{ zoom: "2.0" }}
              >
                {op}
              </input>;
            })} */}
              {/* <TextInput
              height={40}
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            /> */}
              <Button title="설문 제출" />
            </form>
          </Container>
        </Wrapper>
      )}
    </div>
  );
}

export default SurveyViewPage;
