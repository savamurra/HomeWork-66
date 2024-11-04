import { IMeal } from '../../types';
import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

interface Props {
  meal: IMeal;
  onDeleteMeal: (id: string) => void;
}

const MealItem: React.FC<Props> = ({meal, onDeleteMeal}) => {
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
          </div>
          <div>
            <Button
              size="small"
              color="warning"
              onClick={() => onDeleteMeal(meal.id)}
            >
              Delete
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