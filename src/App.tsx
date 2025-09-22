import { memo } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Phones from './pages/phone';

const App = () => {
  return (
    <div className="App">
      <Link to={"/phones"}>phone</Link>
      <Routes>
        <Route path='/phones' element={<Phones/>}/>
      </Routes>
    </div>
  );
};  

export default memo(App);