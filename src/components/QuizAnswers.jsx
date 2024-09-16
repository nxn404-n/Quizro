import PropTypes from "prop-types";
import { useState } from "react";

const QuizAnswers = (props) => {
  // State to track whether the answer has been revealed
  const [showAns, setShowAns] = useState(false);

  // State to store the feedback message (correct or wrong)
  const [message, setMessage] = useState("");

  // State to track if the selected answer is correct or not
  const [isRight, setIsRight] = useState(false);

  // Handle the click event when an answer is selected
  function handleClick(key) {
    setShowAns(true); // Show the correct answer and feedback
    props.handleSkipOrNext(); // Notify parent component to toggle between skip/next button

    // Check if the selected answer is correct
    if (key === props.correctAns) {
      setMessage("You're Correct, The answer is: ");
      setIsRight(true); // Mark the answer as correct
      props.increaseCorrectAnsCount(); // Increment the correct answer count in the parent component
    } else {
      setMessage("You're Wrong, The Correct Answer Is: ");
      setIsRight(false); // Mark the answer as incorrect
    }
  }

  // Render the feedback message after the answer is revealed
  if (showAns) {
    return (
      <div className={`${isRight ? 'bg-green-500' : 'bg-red-500'} rounded-md p-3 text-black font-medium fade-in-fwd`}>
        {/* Show the feedback message and the correct answer */}
        {message}
        {props.answers[props.correctAns]}
      </div>
    );
  }

  // Render the list of answer options
  return (
    <ul className="font-normal list-decimal flex flex-col gap-3 mx-5 fade-in-fwd">
      {/* Loop through the answers object and display each option */}
      {Object.keys(props.answers).map((key) => {
        const answer = props.answers[key];
        return (
          answer && (
            // Render each answer as a list item with click functionality
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
  // Object containing the answers (keys are answer letters, values are the answer texts)
  answers: PropTypes.object.isRequired,

  // Correct answer key (string)
  correctAns: PropTypes.string.isRequired,

  // Function to increment the correct answer count in the parent component
  increaseCorrectAnsCount: PropTypes.func.isRequired,

  // Function to toggle between skip/next state in the parent component
  handleSkipOrNext: PropTypes.func.isRequired,
};

export default QuizAnswers;
