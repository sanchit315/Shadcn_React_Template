import CourseCard from "@/components/courses/course-item";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CourseListScreen() {
  const coursesList = [
    {
      title: "AM Sales 101",
      description: "Introduction to AM sales strategies and techniques.",
    },
    {
      title: "VO Sales 101",
      description: "Learn effective VO sales methods and customer handling.",
    },
    {
      title: "Day Pass Sales 101",
      description:
        "Basic concepts of selling day passes and customer engagement.",
    },
    {
      title: "Day Pass Sales 101",
      description:
        "Basic concepts of selling day passes and customer engagement.",
    },

    {
      title: "Day Pass Sales 101",
      description:
        "Basic concepts of selling day passes and customer engagement.",
    },
    {
      title: "Day Pass Sales 101",
      description:
        "Basic concepts of selling day passes and customer engagement.",
    },
  ];

  const navigate = useNavigate();

  const navigateToQuiz = (quizId: string) => () => {
    navigate(`quiz/${quizId}`);
  };

  const navigateToCreate = () => {
    navigate(`course/create`);
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex align-middle justify-between">
        <h1 className="text-base font-bold">Courses (14/40)</h1>
        <Button
          variant="outline"
          className="flex align-middle gap-1"
          onClick={navigateToCreate}
        >
          <Icons.add className="h-4 w-4" />
          <span>Create New Course</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {coursesList.map((course) => (
          <CourseCard
            key={course.title}
            title={course.title}
            description={course.description}
            onClick={navigateToQuiz(course.title)}
          />
        ))}
      </div>
    </section>
  );
}
