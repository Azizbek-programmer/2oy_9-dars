import { memo } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Comments from './pages/Comments';
import Phones from './pages/phone';

const App = () => {
  return (
    <div className="App">
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/comments"}>Comments</Link>
      <Link to={"/teacher"}>teacher</Link>
      <Link to={"/phones"}>phone</Link>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/comments' element={<Comments/>}/>
        <Route path='/phones' element={<Phones/>}/>
      </Routes>
    </div>
  );
};  

export default memo(App);