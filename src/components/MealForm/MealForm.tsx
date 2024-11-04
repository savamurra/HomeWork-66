import React, { useCallback, useEffect, useState } from 'react';
import { IMeal, IMealForm } from '../../types';
import { Button, CircularProgress, MenuItem, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate, useParams } from 'react-router-dom';
import axiosAPI from '../../axiosAPI.tsx';

const initialForm = {
  time: "",
  description: "",
  kcal: 0,
};

const MealForm = () => {
 const [form, setForm] = useState<IMealForm>(initialForm);
 const params = useParams<{idMeal: string}>();
 const [isEdit, setIsEdit] = useState<boolean>(false);
 const navigate = useNavigate();
 const select = [
   { category: "Breakfast" },
   { category: "Snack" },
   { category: "Lunch" },
   { category: "Dinner" },
 ];

 const fetchMeal = useCallback(async (id: string) => {
   try {
     const response: {data: IMeal} = await axiosAPI<IMeal>(`meal/${id}.json`);
     if (response.data) {
       setForm(response.data);
       setIsEdit(true);
     }
   } catch (e) {
     console.log(e);
   }
 },[]);

  const changeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (params.idMeal) {
      void fetchMeal(params.idMeal);
    }
  }, [fetchMeal, params.idMeal]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEdit && params.idMeal) {
        await axiosAPI.put(`meal/${params.idMeal}.json`, {...form});
        navigate("/");
      } else {
        await axiosAPI.post(`meal.json`, {...form});
      }
    } catch (e) {
      console.log(e);
    }
    setForm({ ...initialForm });
  };


  return (
      <form onSubmit={onSubmit}>
        <Typography variant="h4" sx={{flexGrow: 1, textAlign: "center"}}>
          {isEdit ? 'Edit' : 'Add'} meals
        </Typography>
        <Grid container spacing={2} sx={{mx: "auto", width: "50%", mt: 4}}>
          <Grid size={12}>
            <TextField
              sx={{width: "100%"}}
              id="outlined-select-currency"
              name="time"
              select
              label="Select"
              value={form.time}
              onChange={changeField}
            >
              {select.map((option) => (
                <MenuItem key={option.category} value={option.category}>
                  {option.category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={12}>
            <TextField
              sx={{width: "100%"}}
              id="outlined-multiline-static"
              label="Description"
              name="description"
              value={form.description}
              multiline
              rows={4}
              onChange={changeField}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              sx={{width: "100%"}}
              id="outlined-basic"
              label="Kcal"
              name="kcal"
              value={form.kcal}
              variant="outlined"
              onChange={changeField}
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" sx={{width: "100%"}}>
              {isEdit ? 'Edit' : 'Add'}
              <CircularProgress />
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default MealForm;