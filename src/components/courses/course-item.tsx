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
  const images = [
    "https://dme2wmiz2suov.cloudfront.net/User(5345174)/CourseBundles(23210)/1849061-Crash.png",
    "https://www.ox.ac.uk/sites/files/oxford/Choosing-an-Oxford-course.jpg",
    "https://cdni.iconscout.com/illustration/premium/thumb/course-rating-illustration-download-in-svg-png-gif-file-formats--like-logo-education-review-e-learning-pack-school-illustrations-5127250.png?f=webp",
  ];

  const randomIndex = Math.floor(Math.random() * 3);

  return (
    <div
      className="rounded-lg overflow-hidden shadow-md border border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-full h-48 object-cover"
        src={images[randomIndex]}
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
