import { PropTypes } from 'prop-types';
const Error = (props) => {
  return (
    <div className="mx-6 mt-9 flex h-96 flex-col justify-between rounded-md bg-[#FF6340] py-9 text-center text-[#E7E7E7] fade-in-fwd">
        <p className="font-Kanit text-xl text-[#E7E7E7]">
          Sorry no quiz available for this category right now!
        </p>
        <button
          onClick={props.onClose}
          className="mx-auto w-60 rounded-md bg-black py-3 font-Lato transition-colors duration-500 ease-out hover:bg-[#E7E7E7] hover:text-black"
        >
          Go back to Homepage
        </button>
      </div>
  )
}

Error.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default Error;