import { useState } from "react";
import confetti from "canvas-confetti";
import { Music, Book, Award } from "lucide-react";

type Question = {
  sentence: string;
  options: string[];
  correctAnswer: string;
  type: "verb" | "pronoun" | "article";
  songLyrics: string;
  songTitle: string;
  artist: string;
};

const questions: Question[] = [
  {
    sentence: "O gato ____ no sofá.",
    options: ["dorme", "dormir", "dormindo"],
    correctAnswer: "dorme",
    type: "verb",
    songLyrics:
      "O gato dorme no sofá\nEnquanto o mundo gira\nSonhos de peixe e novelo\nNa sua mente desfilam",
    songTitle: "Sonhos Felinos",
    artist: "Gatômanos",
  },
  {
    sentence: "____ livro é interessante.",
    options: ["O", "Um", "A"],
    correctAnswer: "O",
    type: "article",
    songLyrics:
      "O livro é interessante\nPáginas cheias de aventura\nHistórias que nos transportam\nPara uma nova dimensão pura",
    songTitle: "Viagem Literária",
    artist: "Leitores da Noite",
  },
  {
    sentence: "____ gosto de estudar português.",
    options: ["Eu", "Tu", "Ele"],
    correctAnswer: "Eu",
    type: "pronoun",
    songLyrics:
      "Eu gosto de estudar português\nPalavras dançam na minha mente\nVerbos, pronomes e artigos\nAprender é sempre surpreendente",
    songTitle: "Amor pela Língua",
    artist: "Gramáticos Anônimos",
  },
];

export const LanguageGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white p-4">
      <div className="w-full max-w-4xl p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-xl flex">
        <div className="w-2/3 pr-6">
          <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
            <Book className="mr-2" /> Jogo de Linguagem Musical
          </h1>
          {!showResult ? (
            <>
              <p className="mb-4 text-lg">
                Escolha o {questions[currentQuestion].type} correto para
                completar a frase:
              </p>
              <p className="mb-6 text-xl font-semibold">
                {questions[currentQuestion].sentence}
              </p>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full py-3 px-4 rounded-full transition duration-200 text-lg font-semibold ${
                      selectedAnswer === option
                        ? option === questions[currentQuestion].correctAnswer
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-right">
                Questão {currentQuestion + 1} de {questions.length}
              </p>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <Award className="mr-2" /> Fim do Jogo!
              </h2>
              <p className="text-2xl mb-6">
                Sua pontuação: {score} de {questions.length}
              </p>
              <button
                onClick={resetGame}
                className="py-3 px-6 bg-green-500 hover:bg-green-600 rounded-full transition duration-200 text-xl font-semibold"
              >
                Jogar Novamente
              </button>
            </div>
          )}
        </div>
        <div className="w-1/3 border-l-2 border-white pl-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Music className="mr-2" /> Letra da Música
          </h2>
          <p className="text-lg font-semibold mb-2">
            {questions[currentQuestion].songTitle}
          </p>
          <p className="text-md mb-4">
            por {questions[currentQuestion].artist}
          </p>
          <p className="whitespace-pre-line">
            {questions[currentQuestion].songLyrics}
          </p>
        </div>
      </div>
    </div>
  );
};
