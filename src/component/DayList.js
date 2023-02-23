import dummy from "../db/data.json";
function DayList(){
  return(
    <div>
      <ul className="list_day">
        {dummy.days.map(day=>(
          <li key={day.id}>Day {day.day}</li>
        ))}
      </ul>

    </div>
  )
};
export default DayList;
