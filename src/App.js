import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Shared/Navbar/Navbar';
import Banner from './Components/Banner/Banner';
import Footer from './Components/Shared/Footer/Footer';
import { Outlet, RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes';

function App() {
  return (
    <div className="App">
    <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
