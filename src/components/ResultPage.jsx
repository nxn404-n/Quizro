import PropTypes from 'prop-types';

const ResultPage = (props) => {
  return (
    <div className="flex flex-col min-h-60">
      <p className="font-Lato text-xl pt-5 px-4 bg-[#FF6340] min-h-60 mb-3 rounded-lg">Congratulations, you got {props.correctAnsCount} out of {props.totalQuizCount} correct!</p>
      <button onClick={props.onClose} className="custom-btn transition-border">Go back to Homepage</button>
    </div>
  );
};

ResultPage.propTypes = {
  correctAnsCount: PropTypes.number.isRequired,
  totalQuizCount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResultPage;