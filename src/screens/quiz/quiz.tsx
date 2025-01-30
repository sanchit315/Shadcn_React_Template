import Stepper from "@/components/ui/stepper";

const QuizScreen = () => {
  const steps = [
    "Policy and process",
    "Process Training",
    "AI Client Training",
    "Certificate",
  ];

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Stepper steps={steps} currentStep={2} />
    </section>
  );
};

export default QuizScreen;
