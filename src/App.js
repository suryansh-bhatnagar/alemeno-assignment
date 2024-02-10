import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Home from './components/Home';
import Coursepage from './components/Coursepage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course/:courseId' element={<Coursepage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
