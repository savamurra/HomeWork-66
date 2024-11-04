import { IMeal } from '../../types';
import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner.tsx';

interface Props {
  meal: IMeal;
  onDeleteMeal: (id: string) => void;
  deleteLoading: boolean;
}

const MealItem: React.FC<Props> = ({meal, onDeleteMeal,deleteLoading}) => {
  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography gutterBottom sx={{ fontSize: 20, maxWidth: "800px" }}>
              {meal.time}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 16 }}>
              <strong>Ингридиенты: {meal.description}</strong>
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 16 }}>
              <strong>Калории: {meal.kcal} kcal</strong>
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 16 }}>
              <small>Время: {meal.dateTime}</small>
            </Typography>
          </div>
          <div>
            <Button
              disabled={deleteLoading}
              size="small"
              color="warning"
              variant="contained"
              onClick={() => onDeleteMeal(meal.id)}
            >
              {deleteLoading ? (
                <>
                  <span style={{marginRight: '10px'}}>Delete</span>
                  <Spinner/>
                </>
              ) : <span>Delete</span>}
            </Button>
            <Button
              size="small"
              component={NavLink}
              to={`meals/${meal.id}/edit`}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

    </>
  );
};

export default MealItem;