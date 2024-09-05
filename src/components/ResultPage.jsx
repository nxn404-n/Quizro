import PropTypes from 'prop-types';

const ResultPage = (props) => {
  return (
    <div>
      <p>Congratulations, you got {props.correctAnsCount} out of {props.totalQuizCount} correct!</p>
      <button onClick={props.onClose}>Go back to Homepage</button>
    </div>
  );
};

ResultPage.propTypes = {
  correctAnsCount: PropTypes.number.isRequired,
  totalQuizCount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResultPage;