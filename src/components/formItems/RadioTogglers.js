import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RadioTogglers = ({options , defaultValue, onChange}) => {
  return (
    <div className="radioTogglers shadow-lg">
      {options.map((option, key) => (
        <label key={key}>
          <input
            type="radio"
            name="bgType"
            defaultChecked={defaultValue === option.value}
            value={option.value}
            onClick={(ev) => onChange(ev.target.value)}
          />
          <div>
            <FontAwesomeIcon icon={option.icon} />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}

export default RadioTogglers