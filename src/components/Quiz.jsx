import PropTypes from "prop-types";

import "./Quiz.css";
import QuizAnswers from "./QuizAnswers";

const Quiz = (props) => {
  return (
    <div>
      <button onClick={props.onClose}>Close Quiz</button>
      {props.data
        .filter((item) => item.correct_answer !== null)
        .map((data, id) => (
          <div key={id} className='quizes'>
            <p>{data.question}</p>
            <QuizAnswers
              answers={data.answers}
              correctAns={data.correct_answer}
            />
          </div>
        ))}
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
