import { useState,useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
function CreateDay(){
  const [Days,setDays]=useState(0);
  const navigate=useNavigate();
  Axios.get("/day/getday").then((response)=>{
    if(response.data.success){
      setDays(response.data.result);
    }
  });
  function onSubmit(e){
    e.preventDefault();
    let dataToSubmit = {
      day:Days+1,
    };
    Axios.post('/day/daycreate',dataToSubmit)
    .then(response=>{
      if(response.data.success){
          console.log(response.data)
          navigate(`/`);
      }else{
          alert("영화 정보를 가져오는데 실패 했습니다.")
      }
  })
  }
  return(
    <div>
      <h3>현재 일수 : 10일</h3>
      <button onClick={onSubmit}>Day 추가</button>
    </div>
  )
}
export default CreateDay;