import PropTypes from "prop-types";
import { useState } from "react";

const QuizAnswers = (props) => {
  const [showAns, setShowAns] = useState(false);

  const [message, setMessage] = useState("");

  function handleClick(key) {
    setShowAns(true);

    if (key === props.correctAns) {
      setMessage("You're Correct, The answer is: ");
      props.increaseCorrectAnsCount()
    } else {
      setMessage("You're Wrong, The Correct Answer Is: ");
    }
  }

  if (showAns) {
    return (
      <div>
      {message}
      {props.answers[props.correctAns]}
    </div>
    )
  }

  return (
    <div>
      {Object.keys(props.answers).map((key) => {
        const answer = props.answers[key];
        return (
          answer && (
            <p key={key} onClick={() => handleClick(key)}>
              {answer}
            </p>
          )
        );
      })}
    </div>
  );
};

QuizAnswers.propTypes = {
  answer: PropTypes.object,
  correctAns: PropTypes.string.isRequired,
  answers: PropTypes.object.isRequired,
  increaseCorrectAnsCount: PropTypes.func.isRequired,
};

export default QuizAnswers;
