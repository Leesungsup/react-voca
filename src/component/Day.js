import dummy from "../db/data.json";
import {useParams} from "react-router-dom";
function Day(){
  const {day} = useParams();
  const wordList = dummy.words.filter(word=>word.day===Number);
  return(
    <div>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {wordList.map(word=>(
            <tr key={word.id}>
              <td>
                <input type="checkbox" />

              </td>
              <td>{word.eng}</td>
              <td>{word.kor}</td>
              <td>
                <button>뜻보기</button>
                <button className="btn_del">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Day();