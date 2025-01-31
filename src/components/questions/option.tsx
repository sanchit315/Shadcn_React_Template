interface OptionProps {
  optionKey: string;
  option: string;
  selectedKeys: null | string[];
  onOptionClick: (option: string) => void;
}

const Option: React.FC<OptionProps> = ({
  optionKey,
  option,
  selectedKeys,
  onOptionClick,
}) => {
  const getClasses = () => {
    if (selectedKeys === null) {
      return "border-gray-200";
    }

    return selectedKeys.includes(optionKey)
      ? "border-primary bg-purple-100"
      : "border-gray-200";
  };

  const activeClass = getClasses();

  return (
    <div
      className={`px-6 py-2 border  rounded-sm cursor-pointer select-none ${activeClass}`}
      onClick={() => onOptionClick(optionKey)}
    >
      {option}
    </div>
  );
};

export default Option;
