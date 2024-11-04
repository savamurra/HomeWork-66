import React, { useEffect, useState } from 'react';
import {  IMealForm } from '../../types';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const initialForm = {
  time: "",
  description: "",
  kcal: 0,
};

interface Props {
  submitForm: (meal: IMealForm) => void;
  mealToEdit?: IMealForm;
}

const MealForm: React.FC<Props> = ({submitForm, mealToEdit}) => {
 const [form, setForm] = useState<IMealForm>(initialForm);
 const select = [
   { category: "Breakfast" },
   { category: "Snack" },
   { category: "Lunch" },
   { category: "Dinner" },
 ];

  const changeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (mealToEdit) {
      setForm((prevState) => ({
        ...prevState,
        ...mealToEdit,
      }));
    }
  }, [mealToEdit]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm({ ...form });
    setForm({ ...initialForm });
  };


  return (
      <form onSubmit={onSubmit}>
        <Typography variant="h4" sx={{flexGrow: 1, textAlign: "center"}}>
          Edit pages
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
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default MealForm;