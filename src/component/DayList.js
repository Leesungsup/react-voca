import dummy from "../db/data.json";
import {Link} from "react-router-dom"
import {useEffect,useState} from "react";
function DayList(){
  const  [count,setCount] = useState(0);
  const [days,setDays] = useState([]);
  function onClick(){
    setCount(count+1);
  }
  function onClick2(){
    setDays([
      ...days,
      {
        id:Math.random(),
        day:1,
      }
    ])
  }
  useEffect(()=>{
    console.log("Count change");
  },[count]);
  return(
    <div>
      <ul className="list_day">
        {dummy.days.map(day=>(
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day {day.day}</Link>
            </li>
        ))}
      </ul>
      <button onClick={onClick}>{count}</button>
      <button onClick={onClick2}>Day change</button>
    </div>
  )
};
export default DayList;
