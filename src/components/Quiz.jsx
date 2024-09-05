import PropTypes from "prop-types";
import { useState } from "react";
import QuizAnswers from "./QuizAnswers";
import { useSelector } from "react-redux";

const Quiz = (props) => {
  const filteredQuizData = props.data.filter(quiz => quiz.correct_answer !== null);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  //Counter for checking how many correct answer were selected
  const [correctAnsCount, setCorrectAnsCount] = useState(0);

  function increaseCorrectAnsCount() {
    setCorrectAnsCount(prevCount => prevCount + 1);
  }

  const { status } = useSelector((state) => state.quiz);

  const handleNext = () => {
    if (currentIndex < filteredQuizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <div>
      <button onClick={props.onClose}>Close Quiz</button>
      {filteredQuizData.map((quiz, index) =>
        index === currentIndex ? (
          <div key={index} className="quizes">
            <p>{quiz.question}</p>
            <QuizAnswers
              answers={quiz.answers}
              correctAns={quiz.correct_answer}
              increaseCorrectAnsCount={increaseCorrectAnsCount}
            />
            <div>
              <button onClick={handlePrevious} disabled={currentIndex === 0}>
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuizData.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

Quiz.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.object.isRequired,
      correct_answer: PropTypes.string,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Quiz;
