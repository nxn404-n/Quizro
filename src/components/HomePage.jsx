import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../api/homepageApi";
import Quiz from "./Quiz";
import { fetchQuiz } from "../api/quizApi";

const HomePage = () => {
  const API_CATEGORIES_URL = import.meta.env.VITE_API_CATEGORIES_URL;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { categories } = useSelector((state) => state.homepage);
  const { quizData } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories(API_CATEGORIES_URL))
  }, [dispatch, API_CATEGORIES_URL]);
  
  const [showQuiz, setShowQuiz] = useState(false);

  function handleClick(categoryName) {
    dispatch(fetchQuiz({ url: API_BASE_URL, category: categoryName }));
    setShowQuiz(true);
  }

  function handleQuizClose() {
    setShowQuiz(false);
  }
  

  if (showQuiz) {
    return (
      <Quiz data={quizData} onClose={handleQuizClose} />
    )
  }

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <p>This is the main page of the website.</p>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => handleClick(category.name)}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;