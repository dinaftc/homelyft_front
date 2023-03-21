import Login from "./Login/Login";
import Signup from './Signup';
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
     <Route path="/" element={<Login/>}/>
     <Route path="/Signup" element={<Signup/>}/>
     
     </Routes>
     
    </div>
  );
}

export default App;
