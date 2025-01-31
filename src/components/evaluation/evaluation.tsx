import useSWR from "swr";
import { Spinner } from "../ui/loader";
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  Download,
} from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

const Evaluation = () => {
  const {
    data: evaluationData,
    error,
    isLoading,
  } = useSWR(`${apiUrl}/chat/final_evaluation`);

  if (error) return <div>Error, Something went wrong</div>;
  if (isLoading)
    return (
      <div className="mt-12">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="px-8 py-6 bg-gradient-to-r from-[hsl(224,71.4%,4.1%)] to-[hsl(224,71.4%,12%)] text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Performance Evaluation</h1>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">Score:</span>
                <div
                  className={`text-2xl font-bold ${
                    evaluationData.score >= 75
                      ? "text-green-400"
                      : "text-orange-400"
                  }`}
                >
                  {evaluationData.score}%
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center">
                {evaluationData.passed ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                )}
                <span className="ml-2 text-sm">
                  {evaluationData.passed ? "Passed" : "Needs Improvement"}
                </span>
              </div>
              {evaluationData.passed && (
                <button
                  onClick={() => {
                    /* Add download logic here */
                  }}
                  className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Feedback Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[hsl(224,71.4%,4.1%)]">
                Overall Feedback
              </h2>
              <p className="text-[hsl(224,71.4%,30%)] leading-relaxed">
                {evaluationData.feedback}
              </p>
            </div>

            {/* Two Column Layout for Strengths and Improvements */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Strengths Section */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-green-800">
                    Key Strengths
                  </h2>
                </div>
                <ul className="space-y-3">
                  {evaluationData.strengths.map(
                    (strength: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-green-700">{strength}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Areas of Improvement Section */}
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <ArrowUpRight className="h-5 w-5 text-orange-600 mr-2" />
                  <h2 className="text-lg font-semibold text-orange-800">
                    Areas for Improvement
                  </h2>
                </div>
                <div className="space-y-4">
                  {evaluationData.areas_of_improvement.map(
                    (
                      area: { area: string; suggestion: string },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="border-b border-orange-100 pb-3 last:border-0"
                      >
                        <h3 className="font-medium text-orange-800 mb-1">
                          {area.area}
                        </h3>
                        <p className="text-orange-700 text-sm">
                          {area.suggestion}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
