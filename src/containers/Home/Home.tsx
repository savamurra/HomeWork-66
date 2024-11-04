import { useCallback, useEffect, useState } from 'react';
import { IMeal } from '../../types';
import axiosAPI from '../../axiosAPI.tsx';
import Grid from '@mui/material/Grid2';
import MealItem from '../../components/MealItem/MealItem.tsx';


const Home = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);

  const fetchMeals = useCallback(async () => {
    const response = await axiosAPI('meal.json');
    if (response.data) {
      const mealFromAPI = Object.keys(response.data).map((mealKey) => {
        return {
          ...response.data[mealKey],
          id: mealKey,
        };
      });
      setMeals(mealFromAPI);
    }
  },[]);


  useEffect(() => {
    void fetchMeals();
  },[fetchMeals]);
  return (
    <>
      <Grid container spacing={2}>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            meal={meal}
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;