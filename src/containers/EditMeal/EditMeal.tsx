import { useCallback, useEffect, useState } from 'react';
import { IMeal, IMealForm } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import axiosAPI from '../../axiosAPI.tsx';
import MealForm from '../../components/MealForm/MealForm.tsx';

const EditMeal = () => {
  const [meal, setMeal] = useState<IMeal | null>(null);
  const params = useParams<{idMeal: string}>();
  const navigate = useNavigate();

  const fetchMealsEdit = useCallback(async (id: string) => {
    try {
      const response: {data: IMeal} = await axiosAPI<IMeal>(`meal/${id}.json`);
      if (response.data) {
        setMeal(response.data);
      }
    } catch (e) {
      console.log(e);
    }

  },[]);

  useEffect(() => {
    if (params.idMeal) void fetchMealsEdit(params.idMeal);
  }, [params.idMeal, fetchMealsEdit]);


  const submitForm = async (meal: IMealForm) => {
    try {
      if (params.idMeal) {
        await axiosAPI.put(`meal/${params.idMeal}.json`, { ...meal });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {meal ? (
        <MealForm submitForm={submitForm} mealToEdit={meal}/>
      ) : null}
    </>
  );
};

export default EditMeal;