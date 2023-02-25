import {Link} from "react-router-dom";
function Header(){
  return(
    <div>
      <h1>
        <a href="/">영단어</a>
      </h1>
      <div className="menu">
        <Link to="/create_word" className="link">
          단어추가
        </Link>
        <a href="#x" className="link">
          Day 추가
        </a>
      </div>
    </div>
  )

}

export default Header;