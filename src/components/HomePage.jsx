import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../api/homepageApi";

const HomePage = () => {
  const API_CATEGORIES_URL = import.meta.env.VITE_API_CATEGORIES_URL;

  const { categories } = useSelector((state) => state.homepage)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories(API_CATEGORIES_URL))
  }, [dispatch, API_CATEGORIES_URL])

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <p>This is the main page of the website.</p>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;