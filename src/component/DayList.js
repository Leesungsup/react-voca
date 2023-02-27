import dummy from "../db/data.json";
import {Link} from "react-router-dom"
import {useEffect,useState} from "react";
import useFetch from "../hooks/useFetch";
import Axios from "axios";
function DayList(){
  const [Days,setDays] = useState(0);
  // const  [count,setCount] = useState(0);
  // const [days,setDays] = useState([]);
  // function onClick(){
  //   setCount(count+1);
  // }
  // function onClick2(){
  //   setDays([
  //     ...days,
  //     {
  //       id:Math.random(),
  //       day:1,
  //     }
  //   ])
  // }

  // const days=useFetch("http://localhost:3001/days");
  Axios.get("/day/getday").then((response)=>{
    if(response.data.success){
      setDays(response.data.result);
    }
  });
  // useEffect(()=>{
  //   fetch("http://localhost:3001/days").then(res=>{
  //     return res.json();
  //   }).then(data=>{
  //     setDays(data);
  //   });
  // },[]);

  if(Days.length===0){
    return <span>Loading.....</span>
  }
  return(
    <div>
      <ul className="list_day">
        {Days.map(day=>(
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day {day.day}</Link>
            </li>
        ))}
      </ul>
      {/* <button onClick={onClick}>{count}</button>
      <button onClick={onClick2}>Day change</button> */}
    </div>
  )
};
export default DayList;
