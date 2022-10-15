import logo from './logo.svg';
import './App.css';
import Login from './components/userCreds/Login';
import Navbar from './components/Navbar';
import AllRoutes from './components/Routes/AllRoutes';

function App() {
  return (
    <div className="App">
         <Navbar/>
          <AllRoutes/>
    </div>
  );
}

export default App;
