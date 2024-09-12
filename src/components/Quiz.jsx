import PropTypes from "prop-types";
import { useState } from "react";
import QuizAnswers from "./QuizAnswers";
import { useSelector } from "react-redux";
import ResultPage from "./ResultPage";
import Loading from "./Loading";
import Error from "./Error";

const Quiz = (props) => {
  const filteredQuizData = props.data.filter(
    (quiz) => quiz.correct_answer !== null,
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [quizCompleted, setQuizCompleted] = useState(false);

  const [qusCounter, setQusCounter] = useState(1);

  const [skipOrNext, setSkipOrNext] = useState(true);

  function handleSkipOrNext() {
    setSkipOrNext(!skipOrNext);
  }

  //Counter for checking how many correct answer were selected
  const [correctAnsCount, setCorrectAnsCount] = useState(0);

  function increaseCorrectAnsCount() {
    setCorrectAnsCount((prevCount) => prevCount + 1);
  }

  const { status } = useSelector((state) => state.quiz);

  const handleSkip = () => {
    if (currentIndex < filteredQuizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizCompleted(true);
    }
    setQusCounter((prevCount) => prevCount + 1);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return (
      <Error onClose={ props.onClose } />
    );
  }

  if (quizCompleted) {
    return (
      <div className="mx-6 mt-9 flex h-96 flex-col justify-center text-[#E7E7E7]">
        <ResultPage
          correctAnsCount={correctAnsCount}
          totalQuizCount={filteredQuizData.length}
          onClose={props.onClose}
        />
      </div>
    );
  }

  return (
    <div className="mx-6 mt-9 flex flex-col items-start justify-center gap-8 text-[#E7E7E7] fade-in-fwd">
      <button
        onClick={props.onClose}
        className="custom-btn transition-border ease-in-out"
      >
        Close Quiz
      </button>

      {status === "succeeded" && (
        <div className="self-center">Question: {qusCounter}</div>
      )}
      {filteredQuizData.map((quiz, index) =>
        index === currentIndex ? (
          <div
            key={index}
            className="flex flex-col gap-5 font-Barlow text-lg font-semibold"
          >
            <p className="fade-in-fwd">{quiz.question}</p>
            <QuizAnswers
              answers={quiz.answers}
              correctAns={quiz.correct_answer}
              increaseCorrectAnsCount={increaseCorrectAnsCount}
              handleSkipOrNext={handleSkipOrNext}
            />
            <div>
              <button
                onClick={handleSkip}
                className="custom-btn transition-border"
              >
                {skipOrNext ? "skip" : "next"}
              </button>
            </div>
          </div>
        ) : null,
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
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Quiz;
