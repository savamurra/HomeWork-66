import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import MealForm from './components/MealForm/MealForm.tsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/add/newMeal' element={<MealForm/>}/>
      </Routes>
    </>
    );
};

export default App;
