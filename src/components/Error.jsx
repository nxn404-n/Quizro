import { PropTypes } from "prop-types";
const Error = (props) => {
  return (
    <div className="self-center p-4 fade-in-fwd mx-6 mt-9 flex min-h-96 max-w-xl flex-col justify-center items-center rounded-md bg-[#FF6340] py-9 text-center align-middle text-[#E7E7E7]">
      <p className="font-Kanit text-xl text-[#E7E7E7]">
        Sorry no quiz available for this category right now!
      </p>
      <button
        onClick={props.onClose}
        className="w-60 mt-auto rounded-md bg-black py-3 font-Lato transition-colors duration-500 ease-out hover:bg-[#E7E7E7] hover:text-black"
      >
        Go back to Homepage
      </button>
    </div>
  );
};

Error.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Error;
