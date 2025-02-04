import classes from "./FormButton.module.scss";

type FormButtonProps = {
  width?: string;
  text: string;
  isDisabled: boolean;
  onClick?: () => void;
};

const FormButton = ({ width, text, isDisabled, onClick }: FormButtonProps) => {
  return (
    <button
      type="submit"
      className={`${classes.button} ${!isDisabled && classes.active}`}
      disabled={isDisabled}
      style={{ width }}
      onClick={onClick} // onClick 전달
    >
      {text}
    </button>
  );
};

export default FormButton;
