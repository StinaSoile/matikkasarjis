import { Page, Question } from "../../types";
import { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import comicService from "../../services/comicService";
import axios from "axios";
const MathQuestions = ({
  stateKey,
  setKey,
  comicName,
  comic,
  page,
}: {
  stateKey: string | undefined;
  setKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  comicName: string;
  comic: Page[];
  page: number;
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([""]);
  const [buttonClasses, setButtonClasses] = useState("answer-button");

  useEffect(() => {
    let newQuestions: Question[] = [];
    if (comic[page].questionList) {
      const l = comic[page].questionList.length;
      for (let q = 0; q < l; q++) {
        const question = comic[page].questionList[q];
        newQuestions = [...newQuestions, question];
      }
      setQuestions(newQuestions);
      setAnswers(new Array(l).fill(""));
    } else {
      setQuestions(newQuestions);
    }
  }, [page, comic]);

  const handleAnswer = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      comic[page].questionList &&
      comic[page].questionList[0].question &&
      !comic[page].questionList[0].answer &&
      thereAreAnswers()
    ) {
      const trimmedAnswers = answers.map((a) => a.trim());
      try {
        const key = await comicService.postAnswers(
          comicName,
          page,
          trimmedAnswers
        );
        if (stateKey != key) {
          flashGreen();
          setKey(key);
        } else {
          flashRed();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.log(error.response);
        } else {
          console.error(error);
        }
      }
    }
    return;
  };

  const thereAreAnswers = (): boolean => {
    let isAnswers = true;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].length <= 0) isAnswers = false;
    }
    return isAnswers;
  };

  const flashRed = () => {
    setButtonClasses("answer-button wrong-answer");
    setTimeout(() => {
      setButtonClasses("answer-button");
    }, 500);
  };

  const flashGreen = () => {
    setButtonClasses("answer-button right-answer");
    setTimeout(() => {
      setButtonClasses("answer-button");
    }, 500);
  };

  const changeValues = (
    target: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newValues = [...answers];
    newValues[i] = target.target.value;
    setAnswers(newValues);
  };

  if (!comic[page].questionList) return;
  return (
    <form className="questionform" onSubmit={(e) => handleAnswer(e)}>
      <div className="all-questions-container">
        {questions.map((q, i) => {
          return (
            <div
              className="question-container"
              key={i}
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              <div className="question">{q.question}</div>

              <label className="answer-field">
                <input
                  className="answer-input"
                  value={answers[i]}
                  type="text"
                  name="name"
                  onChange={(target) => changeValues(target, i)}
                />
              </label>
            </div>
          );
        })}
      </div>
      <button
        className={buttonClasses}
        // variant="contained"
        type="submit"
      >
        &gt;
      </button>
    </form>
  );
};

export default MathQuestions;
