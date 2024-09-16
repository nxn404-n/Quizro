import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../api/homepageApi";
import Quiz from "./Quiz";
import { fetchQuiz } from "../api/quizApi";
import MainContent from "./MainContent";
import "../index.css";

const HomePage = () => {
  // API endpoints for fetching categories and quizzes from environment variables
  const API_CATEGORIES_URL = import.meta.env.VITE_API_CATEGORIES_URL;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Access categories and quiz data from Redux store
  const { categories } = useSelector((state) => state.homepage);
  const { quizData } = useSelector((state) => state.quiz);

  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories(API_CATEGORIES_URL));
  }, [dispatch, API_CATEGORIES_URL]);

  // Local component states
  const [showQuiz, setShowQuiz] = useState(false); // Controls quiz visibility
  const [showCategories, setShowCategories] = useState(false); // Controls categories dropdown visibility
  const [isClosing, setIsClosing] = useState(false); // Handles dropdown close animation

  // Handles category selection, triggers quiz fetch and shows the quiz
  function handleClick(categoryName) {
    dispatch(fetchQuiz({ url: API_BASE_URL, category: categoryName }));
    setShowQuiz(true);
  }

  // Closes the quiz and hides categories when quiz is closed
  function handleQuizClose() {
    setShowQuiz(false);
    setShowCategories(false);
  }

  // Toggles the categories dropdown with animation for closing
  function toggleCategories() {
    if (showCategories) {
      // If dropdown is open, play close animation before hiding it
      setIsClosing(true);
      setTimeout(() => {
        setShowCategories(false); // Hide the dropdown
        setIsClosing(false); // Reset closing state after animation
      }, 500); // Duration for the close animation
    } else {
      setShowCategories(true); // Show the dropdown immediately
    }
  }

  return (
    <div className="fade-in-bottom h-full">
      {showQuiz ? (
        // If a quiz is selected, display the Quiz component
        <div className="flex flex-col items-start justify-center">
          <Quiz data={quizData} onClose={handleQuizClose} />
        </div>
      ) : (
        // If no quiz is selected, show the main content and categories selection
        <div className="flex flex-col pl-5 pt-10 sm:gap-9 md:gap-16 lg:gap-24">
          <MainContent />
          <div className="flex flex-col pb-20">
            <p className="mb-4 ml-3 mt-9 text-xl text-[#E7E7E7]">
              Select a category:
            </p>
            {/* Categories toggle button */}
            <button
              onClick={() => toggleCategories()}
              className={`custom-btn z-10 mx-6 ml-3 max-h-10 max-w-72 text-lg font-bold tracking-wider ${showCategories && "rounded-t-md hover:rounded-t-md hover:rounded-b-none"}`}
            >
              Categories
            </button>

            {/* Dropdown for displaying categories */}
            {showCategories && (
              <>
                <ul
                  className={`dropdown z-10 mx-6 ml-3 flex max-h-60 max-w-72 flex-col gap-5 overflow-y-auto border-2 bg-[#E7E7E7] py-3 text-lg sm:max-h-72 ${isClosing ? "close" : "open"}`}
                >
                  {/* List of categories */}
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

                {/* Clickable backdrop to close the dropdown */}
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
