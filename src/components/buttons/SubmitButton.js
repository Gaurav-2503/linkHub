import { useFormStatus } from "react-dom";

// generic submit butti=on banvla
const SubmitButton = ({ children, classname='' }) => {

    // useformstatus form chi state sangto => for loading css purposes 
  const {pending} = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "bg-blue-500 disabled:bg-blue-400 disabled:cursor-progress text-white py-2 mx-auto w-full flex gap-2 items-center justify-center " +
        classname
      }
    >
      {pending && (
        <span>Saving ....</span>
      )}

      {!pending && children}
    </button>
  );
};

export default SubmitButton;
