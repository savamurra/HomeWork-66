import { IMeal } from '../../types';
import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
// import { NavLink } from 'react-router-dom';

interface Props {
  meal: IMeal;
}

const MealItem: React.FC<Props> = ({meal}) => {
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
              <strong>Автор: {meal.description}</strong>
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 16 }}>
              <strong>Автор: {meal.kcal}</strong>
            </Typography>
          </div>
          <div>
            <Button
              size="small"
              color="warning"
            >
              Delete
            </Button>
            {/*<Button*/}
            {/*  size="small"*/}
            {/*  component={NavLink}*/}
            {/*  to={`/quotes/${quote.id}/edit`}*/}
            {/*>*/}
            {/*  Edit*/}
            {/*</Button>*/}
          </div>
        </CardContent>
      </Card>

    </>
  );
};

export default MealItem;