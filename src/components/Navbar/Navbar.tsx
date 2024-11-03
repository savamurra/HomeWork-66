import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <AppBar position="static">
          <Toolbar sx={{ width: 1200, mx: "auto" }}>
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{ flexGrow: 1, textDecoration: "none" }}
              color="inherit"
            >
              <h3>Toolbar</h3>
            </Typography>
            <Button color="inherit" component={NavLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/add/newMeal">
              Add
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
