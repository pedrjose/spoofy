import { useState } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import "./Learn.css";

const learnArray = [
  {
    title: "Vocabulário 🧐",
    question1: "- Quais palavras ou expressões na música você não conhece?",
    question2:
      "- Como você acha que essas palavras ou expressões são usadas no contexto da música?",
    question3:
      "- Você pode identificar palavras que têm significados diferentes dependendo do contexto?",
  },
  {
    title: "Interpretação 🤔",
    question1: "- Qual é o tema principal da música?",
    question2:
      "- Como você interpreta as metáforas ou imagens poéticas usadas na letra?",
    question3: "- A música conta uma história? Se sim, qual é essa história?",
  },
  {
    title: "Gramática 📖",
    question1:
      "- Você pode identificar diferentes tempos verbais usados na música?",
    question2:
      "- Existe alguma construção gramatical específica que você não entende completamente?",
    question3:
      "- Existe alguma construção gramatical específica que você não entende completamente?",
  },
  {
    title: "Expressões Idiomáticas e Gírias 😌",
    question1: "- A música usa expressões idiomáticas ou gírias?",
    question2: "- Você consegue identificar o significado delas?",
    question3:
      "- Como essas expressões idiomáticas ou gírias contribuem para o estilo da música?",
  },
];

export function LearnPage() {
  const [index, setIndex] = useState(0);

  const moveIndex = () => {
    if (index < 3) {
      setIndex((prevState) => prevState + 1);
    } else {
      setIndex((prevState) => 0);
    }
  };
  return (
    <>
      <section className="learn-section">
        <Navbar />
        <span>
          <h1 className="learn-title">{learnArray[index].title}</h1>
          <h2 className="learn-subtitle">{learnArray[index].question1}</h2>
          <h2 className="learn-subtitle">{learnArray[index].question2}</h2>
          <h2 className="learn-subtitle">{learnArray[index].question3}</h2>
        </span>
        <button className="button-style" onClick={() => moveIndex()}>
          Next
        </button>
      </section>
    </>
  );
}
