interface OptionProps {
  selectedOption: string | null | string[];
  option: string;
  onOptionClick: (option: string) => void;
}

const Option: React.FC<OptionProps> = ({
  option,
  selectedOption,
  onOptionClick,
}) => {
  const getClasses = () => {
    if (selectedOption === null) {
      return "border-gray-200";
    }

    if (typeof selectedOption === "string") {
      return selectedOption === option
        ? "border-primary bg-purple-100"
        : "border-gray-200";
    }

    return selectedOption.includes(option)
      ? "border-primary bg-purple-100"
      : "border-gray-200";
  };

  const activeClass = getClasses();

  return (
    <div
      className={`px-6 py-2 border  rounded-sm cursor-pointer select-none ${activeClass}`}
      onClick={() => onOptionClick(option)}
    >
      {option}
    </div>
  );
};

export default Option;
