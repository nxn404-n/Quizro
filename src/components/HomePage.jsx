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
    setShowCategories(false);
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
    <div className="fade-in-bottom h-full">
      {showQuiz ? (
        <div className="flex flex-col items-start justify-center">
          <Quiz data={quizData} onClose={handleQuizClose} />
        </div>
      ) : (
        <div className="flex flex-col pl-5 pt-10 sm:gap-9 md:gap-16 lg:gap-24">
          <MainContent />
          <div className="flex flex-col pb-20">
            <p className="mb-4 ml-3 mt-9 text-xl text-[#E7E7E7]">
              Select a category:
            </p>
            <button
              onClick={() => toggleCategories()}
              className={`custom-btn z-10 mx-6 ml-3 max-h-10 max-w-72 text-lg font-bold tracking-wider ${showCategories && "rounded-t-md hover:rounded-t-md hover:rounded-b-none"}`}
            >
              Categories
            </button>
            {showCategories && (
              <>
                <ul
                  className={`dropdown z-10 mx-6 ml-3 flex max-h-60 max-w-72 flex-col gap-5 overflow-y-auto border-2 bg-[#E7E7E7] py-3 text-lg sm:max-h-72 ${isClosing ? "close" : "open"}`}
                >
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => handleClick(category.name)}
                      className={`custom-underline cursor-pointer pl-6 text-[#000000] ${isClosing && "opacity-0"}`}
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
