import CourseCard from "@/components/courses/course-item";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/loader";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CourseListScreen() {
  const { data: courseListRes, error, isLoading } = useSWR(`${apiUrl}/courses`);

  const navigate = useNavigate();

  if (error) return <div>Error occurred</div>;
  if (isLoading) return <Spinner />;

  const coursesList: string[] = courseListRes.courses;

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
        {coursesList.map((title) => (
          <CourseCard
            key={title}
            title={title}
            description="Created 09:14 AM"
            onClick={navigateToQuiz(title)}
          />
        ))}
      </div>
    </section>
  );
}
