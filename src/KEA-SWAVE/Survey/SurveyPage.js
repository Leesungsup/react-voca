import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import SurveyList from "./SurveyList";
import Button from "../ui/Button";

// import data from "../Data/data.json";


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
function SurveyPage() {
  const navigate = useNavigate();
  const [data,setdata] = useState([]);
  // const data = useFetch("http://localhost:3001/post");
  
  
  useEffect(() => {
    fetch(`http://localhost:3001/survey/`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setdata(data);
      });
  }, [])
  
  return (
    <Wrapper>
      <Container>
        <Button title="설문 작성하기" onClick={()=>{navigate("/survey-create");}} />
        <SurveyList posts={data} onClickItem={(item)=>{navigate(`/survey/${item.id}`);}} />
      </Container>
    </Wrapper>
  );
}

export default SurveyPage;