import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { LearningPageServices } from "./services";
import { Question } from "./types";
import { Spinner } from "../../components/Spinner";
import { customToast } from "../../components/customToast/customToast";
import { useNavigate } from "react-router-dom";

export const LearningPage = ({ lyric }: { lyric: string }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ["lyricAnswers"],
    enabled: !!lyric,
    queryFn: async () => {
      try {
        const res = await LearningPageServices.getAnswers(lyric);
        setQuestions(res);
        return res;
      } catch (error) {
        console.log(error);
        customToast({ msg: "Erro ao carregar perguntas", type: "error" });
        navigate("/home");
      }
    },
  });

  const handleAnswer = (option: keyof Question["answers"]) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);
    const currentQuestionObj = questions?.[currentQuestion];
    if (currentQuestionObj?.answers[option].rightAnswer) {
      setScore(score + 1);
      setShowConfetti(true);
    } else {
      setShake(true);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowConfetti(false);
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const getButtonColor = (option: keyof Question["answers"]) => {
    if (!isAnswered) return "bg-[#282828] hover:bg-[#3E3E3E] text-white";
    if (questions?.[currentQuestion].answers[option].rightAnswer) {
      return "bg-[#1DB954] text-white";
    }
    if (selectedAnswer === option) {
      return "bg-[#E91429] text-white";
    }
    return "bg-[#282828] opacity-50 text-white";
  };

  return (
    <div className="w-full mx-auto bg-[#56595e30] min-h-screen flex items-center justify-center">
      <div className="w-full mx-auto p-4 flex flex-col md:flex-row items-start justify-center gap-6">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {showConfetti && (
              <Confetti recycle={false} numberOfPieces={200} draggable />
            )}
            <style>{`
            @keyframes shake {
              0% { transform: translateX(0); }
              25% { transform: translateX(5px); }
              50% { transform: translateX(-5px); }
              75% { transform: translateX(5px); }
              100% { transform: translateX(0); }
            }
            .shake {
              animation: shake 0.5s;
            }
          `}</style>

            <div className="bg-[#56595e30] shadow-lg rounded-xl p-6 mb-6 w-full max-w-2xl border border-[#56595e30]">
              <h2 className="text-3xl font-bold mb-4 text-[#1DB954]">
                Letra da Música
              </h2>
              <p className="whitespace-pre-line text-white">{lyric}</p>
            </div>

            {!showResult ? (
              <div
                className={`bg-[#56595e30] shadow-lg rounded-xl p-6 w-full max-w-2xl border border-[#56595e30] ${
                  shake ? "shake" : ""
                }`}
              >
                <h2 className="text-3xl font-bold mb-4 text-[#1DB954]">
                  Questão {currentQuestion + 1} de {questions?.length}
                </h2>
                <p className="mb-6 text-xl text-white">
                  {questions[currentQuestion]?.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object?.keys(
                    questions?.[currentQuestion]?.answers ?? {}
                  ).map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        handleAnswer(option as keyof Question["answers"])
                      }
                      className={`p-4 rounded-lg text-left transition-colors ${getButtonColor(
                        option as keyof Question["answers"]
                      )} w-full text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200`}
                      disabled={isAnswered}
                    >
                      <span className="font-bold">{option.toUpperCase()}:</span>{" "}
                      {
                        questions?.[currentQuestion]?.answers[
                          option as keyof Question["answers"]
                        ]?.option
                      }
                    </button>
                  ))}
                </div>
                {isAnswered && (
                  <div className="mt-4">
                    <p className="text-lg font-bold mb-2 text-white">
                      {selectedAnswer &&
                      (questions?.[currentQuestion].answers as any)[
                        selectedAnswer
                      ].rightAnswer
                        ? "Correto!"
                        : `Incorreto. A resposta certa era: ${Object.entries(
                            questions?.[currentQuestion]?.answers
                          )
                            .find(([_, value]) => value.rightAnswer)?.[0]
                            .toUpperCase()}`}
                    </p>
                    <button
                      onClick={nextQuestion}
                      className="px-8 py-3 bg-[#1DB954] text-white rounded-full text-lg font-bold hover:bg-[#1ed760] transform hover:scale-105 transition-transform duration-200 shadow-lg"
                    >
                      {currentQuestion === questions?.length - 1
                        ? "Ver Resultado Final"
                        : "Próxima Questão"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#56595e30] shadow-lg rounded-xl p-6 w-full max-w-2xl border border-[#56595e30]">
                <h2 className="text-4xl font-bold mb-4 text-[#1DB954]">
                  Resultado Final
                </h2>
                <p className="text-3xl mb-6 text-white">
                  Você acertou{" "}
                  <span className="text-[#1DB954] font-bold">{score}</span> de{" "}
                  {questions.length} questões!
                </p>
                <button
                  onClick={resetGame}
                  className="px-8 py-3 bg-[#1DB954] text-white rounded-full text-lg font-bold hover:bg-[#1ed760] transform hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  Jogar Novamente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
