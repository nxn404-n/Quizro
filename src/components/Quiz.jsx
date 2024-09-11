import PropTypes from "prop-types";
import { useState } from "react";
import QuizAnswers from "./QuizAnswers";
import { useSelector } from "react-redux";
import ResultPage from "./ResultPage";

const Quiz = (props) => {
  const filteredQuizData = props.data.filter(
    (quiz) => quiz.correct_answer !== null
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [quizCompleted, setQuizCompleted] = useState(false);

  const [qusCounter, setQusCounter] = useState(1);

  //Counter for checking how many correct answer were selected
  const [correctAnsCount, setCorrectAnsCount] = useState(0);

  function increaseCorrectAnsCount() {
    setCorrectAnsCount((prevCount) => prevCount + 1);
  }

  const { status } = useSelector((state) => state.quiz);

  const handleNext = () => {
    if (currentIndex < filteredQuizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizCompleted(true);
    }
    setQusCounter((prevCount) => prevCount + 1);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return (
      <div>
        <p>Sorry no quiz available for now!</p>
        <button onClick={props.onClose}>Go back to Homepage</button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div>
        <ResultPage
          correctAnsCount={correctAnsCount}
          totalQuizCount={filteredQuizData.length}
          onClose={props.onClose}
        />
      </div>
    );
  }

  return (
    <div className="text-[#E7E7E7] ml-6 mr-6 flex flex-col justify-center items-start gap-8 mt-9">
      <button onClick={props.onClose} className="custom-btn">Close Quiz</button>
      <div>Question: { qusCounter }</div>
      {filteredQuizData.map((quiz, index) =>
        index === currentIndex ? (
          <div key={index} className="font-Barlow text-lg font-semibold flex flex-col gap-5">
            <p className="border-2">{quiz.question}</p>
            <QuizAnswers
              answers={quiz.answers}
              correctAns={quiz.correct_answer}
              increaseCorrectAnsCount={increaseCorrectAnsCount}
            />
            <div>
              <button onClick={handleNext} className="custom-btn">Next</button>
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
