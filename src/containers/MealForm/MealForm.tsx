import React, { useCallback, useEffect, useState } from "react";
import { IMeal, IMealForm } from "../../types";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router-dom";
import axiosAPI from "../../axiosAPI.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const initialForm = {
  time: "",
  description: "",
  kcal: 0,
  dateTime: "",
};

const MealForm = () => {
  const [form, setForm] = useState<IMealForm>(initialForm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams<{ idMeal: string }>();
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
      const response: { data: IMeal } = await axiosAPI<IMeal>(
        `meal/${id}.json`,
      );
      if (response.data) {
        setIsLoading(true);
        setForm(response.data);
        setIsEdit(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
      dateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  useEffect(() => {
    if (params.idMeal) {
      void fetchMeal(params.idMeal);
    } else {
      setForm(initialForm);
      setIsEdit(false);
    }
  }, [fetchMeal, params.idMeal]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEdit && params.idMeal) {
        setIsLoading(true);
        await axiosAPI.put(`meal/${params.idMeal}.json`, { ...form });
        toast.success("Meal edited successfully.");
      } else {
        setIsLoading(true);
        await axiosAPI.post(`meal.json`, { ...form });
        navigate("/");
        toast.success("Meal added successfully.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center" }}>
        {isEdit ? "Edit" : "Add"} meals
      </Typography>
      <Grid container spacing={2} sx={{ mx: "auto", width: "50%", mt: 4 }}>
        <Grid size={12}>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-select-currency"
            name="time"
            select
            label="Select"
            value={form.time}
            required
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
            sx={{ width: "100%" }}
            id="outlined-multiline-static"
            label="Description"
            name="description"
            value={form.description}
            multiline
            rows={4}
            onChange={changeField}
            required
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Kcal"
            name="kcal"
            type="number"
            value={form.kcal}
            variant="outlined"
            onChange={changeField}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid size={12}>
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            sx={{ width: "100%" }}
          >
            <span style={{ marginRight: "20px" }}>
              {isEdit ? "Edit" : "Add"}
            </span>
            {isLoading ? <Spinner /> : null}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MealForm;
