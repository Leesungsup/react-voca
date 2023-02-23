import dummy from "../db/data.json";
import {useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import Word from "./Word";
import useFetch from "../hooks/useFetch";
function Day(){
  // const [words,setWords] = useState([]);
  const {day} = useParams();
  // const wordList = dummy.words.filter(word=>word.day===Number);
  const words=useFetch(`http://localhost:3001/words?day=${day}`);
  // useEffect(()=>{
  //   fetch(`http://localhost:3001/words?day=${day}`).then(res=>{
  //     return res.json();
  //   }).then(data=>{
  //     setWords(data);
  //   });
  // },[day]);
  return(
    <div>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {words.map(word=>(
            <Word word={word} key={word.id}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Day();