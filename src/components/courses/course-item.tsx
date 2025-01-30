import React from "react";

interface CourseCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-md border border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-full h-48 object-cover"
        src="https://via.placeholder.com/300"
        alt="Card Image"
      />
      <div className="py-4 px-2">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
