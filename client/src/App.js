
import './App.css';
import AllTeam from './Components/AllTeam';
import Header from './Components/Header'; 
import Teams from './Components/Teams';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserState from './Context/Users/UserState';

function App() {
  return (
    <>
    <UserState>
    <Router>
      <Routes>
        <Route exact path="/" element={<Header />}/>
        <Route exact path="/Teams" element={<Teams />} />
        <Route exact path="/AllTeam" element={<AllTeam />} />
      </Routes>
    </Router>
    </UserState>
    </>
  );
}

export default App;
