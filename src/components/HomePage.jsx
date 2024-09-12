import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../api/homepageApi";
import Quiz from "./Quiz";
import { fetchQuiz } from "../api/quizApi";
import MainContent from "./MainContent";
import "../index.css";

const HomePage = () => {
  const API_CATEGORIES_URL = import.meta.env.VITE_API_CATEGORIES_URL;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { categories } = useSelector((state) => state.homepage);
  const { quizData } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories(API_CATEGORIES_URL));
  }, [dispatch, API_CATEGORIES_URL]);

  const [showQuiz, setShowQuiz] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  function handleClick(categoryName) {
    dispatch(fetchQuiz({ url: API_BASE_URL, category: categoryName }));
    setShowQuiz(true);
  }

  function handleQuizClose() {
    setShowQuiz(false);
  }

  function toggleCategories() {
    if (showCategories) {
      setIsClosing(true);
      setTimeout(() => {
        setShowCategories(false);
        setIsClosing(false);
      }, 500);
    } else {
      setShowCategories(true);
    }
  }

  return (
    <div className="relative">
      {showQuiz ? (
        <Quiz data={quizData} onClose={handleQuizClose} />
      ) : (
        <div className="flex flex-col pl-5 pt-10">
          <MainContent />
          <div className="flex flex-col">
            <p className="mb-4 ml-3 mt-9 text-xl text-[#E7E7E7]">
              Select a category:
            </p>
            <button
              onClick={() => toggleCategories()}
              className={`text-lg z-10 ml-3 h-10 w-72 custom-btn font-bold tracking-wider ${showCategories ? "hover:rounded-t-md" : "transition-border"} ${showCategories ? "rounded-t-md" : ""}`}
            >
              Categories
            </button>
            {showCategories && (
              <>
                <ul
                  className={`dropdown py-3 z-10 ml-3 flex h-60 w-72 flex-col gap-5 overflow-y-auto border-2 bg-[#E7E7E7] text-lg ${isClosing ? "close" : "open"}`}
                >
                  {!isClosing &&
                    categories.map((category) => (
                      <li
                        key={category.id}
                        onClick={() => handleClick(category.name)}
                        className="cursor-pointer text-[#000000] custom-underline pl-6"
                      >
                        {category.name}
                      </li>
                    ))}
                </ul>

                <div
                  className="fixed inset-0 z-0 backdrop-blur-sm"
                  onClick={() => toggleCategories()}
                ></div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
