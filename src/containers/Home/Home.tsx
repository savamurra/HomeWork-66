import { useCallback, useEffect, useState } from "react";
import { IMeal, IMealAPI } from "../../types";
import axiosAPI from "../../axiosAPI.tsx";
import Grid from "@mui/material/Grid2";
import MealItem from "../../components/MealItem/MealItem.tsx";

const Home = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const response: { data: IMealAPI } =
        await axiosAPI<IMealAPI>("meal.json");
      const mealList = response.data;

      if (mealList === null) {
        setMeals([]);
        setTotal(0);
        return;
      }

      if (mealList) {
        const mealFromAPI = Object.keys(mealList).map((mealKey) => {
          return {
            ...mealList[mealKey],
            id: mealKey,
          };
        });

        const totalCalories = mealFromAPI.reduce((acc, meal) => {
          acc += Number(meal.kcal) | 0;
          return acc;
        }, 0);
        setTotal(totalCalories);
        setMeals(mealFromAPI);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMeal = useCallback(
    async (id: string) => {
      try {
        if (window.confirm("Are you sure you want to delete meal?")) {
          setLoading(true);
          await axiosAPI.delete(`meal/${id}.json`);
          await fetchMeals();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [fetchMeals],
  );

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  return (
    <>
      <>
        <Grid container spacing={2}>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
              onDeleteMeal={deleteMeal}
              deleteLoading={loading}
            />
          ))}
          <div>{total ? <>Общее количество калорий: {total} kcal</> : null}</div>
        </Grid>
      </>
    </>
  );
};

export default Home;
