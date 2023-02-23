import logo from './logo.svg';
import Hello from './component/Hello'
import style from './App.module.css';
import Header from './component/Header';
import Day from './component/Day';
import DayList from './component/DayList';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import EmptyPage from './component/EmptyPage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/"><DayList /></Route>
          <Route exact path="/day/:day"><Day /></Route>
          
          <Route>
            <EmptyPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
