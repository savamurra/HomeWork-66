import MealForm from '../../components/MealForm/MealForm.tsx';
import axiosAPI from '../../axiosAPI.tsx';
import { useNavigate } from 'react-router-dom';
import { IMealForm } from '../../types';


const NewMeal = () => {
  const navigate = useNavigate();
  const submitForm = async (meal: IMealForm) => {
    try {
      await axiosAPI.post("meal.json", {
        ...meal,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MealForm submitForm={submitForm}/>
  );
};

export default NewMeal;