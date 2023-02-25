import React, { useState,useRef } from "react";
import Axios from 'axios';
import { useHistory } from "react-router";
import useFetch from "../hooks/useFetch";
function CreateWord(){

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  function onSubmit(e){
    e.preventDefault();
    const day = dayRef.current.value;
    const eng = engRef.current.value;
    const kor = korRef.current.value;
    let dataToSubmit = {
      day: day,
      eng: eng,
      kor: kor,
    };
    Axios.post('/word/wordcreate',dataToSubmit)
    .then(response=>{
      if(response.data.success){
          console.log(response.data)
          history.push(`/day/${day}`);
          setIsLoading(false);
      }else{
          alert("영화 정보를 가져오는데 실패 했습니다.")
      }
  })
  }
  // function onSubmit(e) {
  //   e.preventDefault();

  //   if (!isLoading && dayRef.current && engRef.current && korRef.current) {
  //     setIsLoading(true);

  //     const day = dayRef.current.value;
  //     const eng = engRef.current.value;
  //     const kor = korRef.current.value;
  //     fetch(`http://localhost:3001/words/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         day,
  //         eng,
  //         kor,
  //         isDone: false,
  //       }),
  //     }).then(res => {
  //       if (res.ok) {
  //         alert("생성이 완료 되었습니다");
  //         history.push(`/day/${day}`);
  //         setIsLoading(false);
  //       }
  //     });
  //   }
  // }
  // const days = useFetch("http://localhost:3001/days")
  let days = 0;
  Axios.get("/day/getday").then(response=>{
    if(response.data.success){
      days=response.data.result;
    }else{
      console.log("error");
    }
  })
  return(
    <div>
      <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map(day => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}
      >
        {isLoading ? "Saving..." : "저장"}
      </button>
    </form>
    </div>
  )
}

export default CreateWord;