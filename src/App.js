
import './App.css';
// import Login from './Components/Pages/Login';
import AllRoutes from './Components/Routes/AllRoutes';
import { Navbar } from './Components/Routes/Navbar';

function App() {
  return (
    <div className="App">
     {/* <Login/> */}
     <Navbar/>
     <AllRoutes/>
    </div>
  );
}

export default App;
