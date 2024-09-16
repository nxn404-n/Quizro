import PropTypes from "prop-types";
import { useState } from "react";
import QuizAnswers from "./QuizAnswers";
import { useSelector } from "react-redux";
import ResultPage from "./ResultPage";
import Loading from "./Loading";
import Error from "./Error";

const Quiz = (props) => {
  // Filter out quiz data to remove any items with a null correct_answer
  const filteredQuizData = props.data.filter(
    (quiz) => quiz.correct_answer !== null,
  );

  // State to track the current question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to track if the quiz is completed
  const [quizCompleted, setQuizCompleted] = useState(false);

  // State to track the current question number (1-based counter)
  const [qusCounter, setQusCounter] = useState(1);

  // State to alternate between "skip" and "next" button text
  const [skipOrNext, setSkipOrNext] = useState(true);

  // Toggles between "skip" and "next" states
  function handleSkipOrNext() {
    setSkipOrNext(!skipOrNext);
  }

  // State to track the number of correct answers selected by the user
  const [correctAnsCount, setCorrectAnsCount] = useState(0);

  // Function to increment the correct answer count
  function increaseCorrectAnsCount() {
    setCorrectAnsCount((prevCount) => prevCount + 1);
  }

  // Get the quiz status from the Redux store (loading, success, or failed)
  const { status } = useSelector((state) => state.quiz);

  // Handle skipping the current question and advancing to the next
  const handleSkip = () => {
    handleSkipOrNext(); // Toggle skip/next button text
    if (currentIndex < filteredQuizData.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to next question
    } else {
      setQuizCompleted(true); // Mark quiz as completed if no more questions
    }
    setQusCounter((prevCount) => prevCount + 1); // Increment question counter
  };

  // Show loading screen if quiz data is still being fetched
  if (status === "loading") {
    return <Loading />;
  }

  // Show error message if fetching quiz data failed
  if (status === "failed") {
    return (
      <Error onClose={props.onClose} />
    );
  }

  // Show the result page if the quiz is completed
  if (quizCompleted) {
    return (
      <div className="mx-6 mt-9 flex max-w-3xl min-h-96 flex-col justify-center items-center self-center text-[#E7E7E7]">
        <ResultPage
          correctAnsCount={correctAnsCount}
          totalQuizCount={filteredQuizData.length}
          onClose={props.onClose}
        />
      </div>
    );
  }

  return (
    <div className="mx-6 mt-9 flex flex-col items-start gap-8 text-[#E7E7E7] fade-in-fwd sm:w-96">
      {/* Button to close the quiz and exit */}
      <button
        onClick={props.onClose}
        className="custom-btn"
      >
        Close Quiz
      </button>

      {/* Show the current question number when the quiz data has loaded */}
      {status === "succeeded" && (
        <div className="self-center">Question: {qusCounter}</div>
      )}

      {/* Map over filtered quiz data and display the current question */}
      {filteredQuizData.map((quiz, index) =>
        index === currentIndex ? (
          <div
            key={index}
            className="flex flex-col gap-5 font-Barlow text-lg font-semibold"
          >
            <p className="fade-in-fwd">{quiz.question}</p>
            
            {/* Render QuizAnswers component to display answer options */}
            <QuizAnswers
              answers={quiz.answers}
              correctAns={quiz.correct_answer}
              increaseCorrectAnsCount={increaseCorrectAnsCount}
              handleSkipOrNext={handleSkipOrNext}
            />

            <div>
              {/* Button to skip or go to the next question */}
              <button
                onClick={handleSkip}
                className="custom-btn"
              >
                {skipOrNext ? "skip" : "next"}
              </button>
            </div>
          </div>
        ) : null, // Only render the current question
      )}
    </div>
  );
};

// PropTypes validation for the props received by the Quiz component
Quiz.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.object.isRequired, // Object for answer choices
      correct_answer: PropTypes.string, // Correct answer can be null
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired, // Function to handle quiz closure
};

export default Quiz;
