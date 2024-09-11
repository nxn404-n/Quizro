import PropTypes from "prop-types";
import { useState } from "react";

const QuizAnswers = (props) => {
  const [showAns, setShowAns] = useState(false);

  const [message, setMessage] = useState("");

  const [isRight, setIsRight] = useState(false);

  function handleClick(key) {
    setShowAns(true);
    props.handleSkipOrNext();

    if (key === props.correctAns) {
      setMessage("You're Correct, The answer is: ");
      setIsRight(true);
      props.increaseCorrectAnsCount()
    } else {
      setMessage("You're Wrong, The Correct Answer Is: ");
      setIsRight(false);
    }
  }

  if (showAns) {
    return (
      <div className={`${isRight?'bg-green-500' : 'bg-red-500'} rounded-md p-3 text-black`}>
      {message}
      {props.answers[props.correctAns]}
    </div>
    )
  }

  return (
    <ul className="font-normal list-decimal flex flex-col gap-3 mx-5">
      {Object.keys(props.answers).map((key) => {
        const answer = props.answers[key];
        return (
          answer && (
            <li key={key} onClick={() => handleClick(key)} className="cursor-pointer custom-underline">
              {answer}
            </li>
          )
        );
      })}
    </ul>
  );
};

QuizAnswers.propTypes = {
  answer: PropTypes.object,
  correctAns: PropTypes.string.isRequired,
  answers: PropTypes.object.isRequired,
  increaseCorrectAnsCount: PropTypes.func.isRequired,
  handleSkipOrNext: PropTypes.func.isRequired,
};

export default QuizAnswers;
