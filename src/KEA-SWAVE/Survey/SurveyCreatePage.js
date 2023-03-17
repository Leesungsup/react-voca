import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import styled from "styled-components";
import '../css/survey.module.css';
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


function SurveyCreatePage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const items = [
    {
      type: 1,
      title: "찬부식",
    },
    {
      type: 2,
      title: "객관식",
    },
    {
      type: 3,
      title: "주관식",
    },
  ];

  const [select, setSelect] = useState(2);

  function handleChange(e) {
    // const { name, value } = e.target;
    console.log(e.target.value);
    setSelect(e.target.value);
  }

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${options}, ${question}`);
    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:3001/survey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: question,
          option: options,
          optionType: select
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료 되었습니다");
          navigate("/survey");
          setIsLoading(false);
        }
      });
    }
  };
  function optionType(){
    if(select == 2){
      return(
        <div>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              Option {index + 1}:
              <TextInput
                width={150}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
              />
              <Button
                title="Remove Option"
                onClick={() => handleRemoveOption(index)}
              ></Button>
            </label>
          </div>
        ))}
        <Button title="Add Option" onClick={handleAddOption}></Button>
        </div>
      )
    }
  }
  return (
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
          <TitleText>설문제작</TitleText>{" "}
        </PostContainer>

        <label>
          Question:
          <TextInput
            width="500px"
            type="text"
            value={question}
            onChange={handleQuestionChange}
          />
        </label>
        <div>
          {items.map((item, index) => (
             <label key={"radio" + item.type}>
             {item.title}:
             <input
               onChange={handleChange}
               key={index}
               type="radio"
               name="option"
               value={item.type}
               style={{ zoom: "2.0" }}
             />&nbsp;&nbsp;
           </label>
          ))}
        </div>
        {optionType()}
        <form onSubmit={handleSubmit}>
          <Button title="Create Survey" type="submit"></Button>
        </form>
      </Container>
    </Wrapper>
  );
}

export default SurveyCreatePage;
