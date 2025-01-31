import CreateCourseForm from "@/components/courses/course-create-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { mutate } from "swr";

const uploadCourse = async (url: string, data: object) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to post data");
  }

  return response.json();
};

const uploadCourseFiles = async (url: string, files: FileList) => {
  const formData = new FormData();

  // Append each file to the FormData
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  return response.json();
};

const CourseCreateScreen = () => {
  const navigate = useNavigate();

  const handleCreateCourse = async (values: any) => {
    const url = "http://localhost:3000/";
    try {
      const newData = { courseName: values.courseName };

      await mutate(
        url + "course/create",
        uploadCourse(url + "course/create", newData),
        {
          optimisticData: newData,
          rollbackOnError: true,
        }
      );
      await mutate(
        url + `upload/${values.courseName}`,
        uploadCourseFiles(url + `upload/${values.courseName}`, values.files)
      );

      navigate("/");
      toast.success("Course has been created successfully!");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-xl font-bold">Create Course</h1>
      <CreateCourseForm onSubmit={handleCreateCourse} />
    </section>
  );
};

export default CourseCreateScreen;
