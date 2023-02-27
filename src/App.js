import logo from './logo.svg';
import Hello from './component/Hello'
import style from './App.module.css';
import Header from './component/Header';
import Day from './component/Day';
import DayList from './component/DayList';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import EmptyPage from './component/EmptyPage';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/"><DayList /></Route>
          <Route path="/day/:day"><Day /></Route>
          <Route path="/create_word"><CreateWord /></Route>
          <Route path="/create_day"><CreateDay /></Route>
          <Route>
            <EmptyPage />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
