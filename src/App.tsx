import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import MealForm from "./containers/MealForm/MealForm.tsx";
import Layout from "./components/Layout/Layout.tsx";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<MealForm />} />
          <Route path="/meals/:idMeal/edit" element={<MealForm />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
