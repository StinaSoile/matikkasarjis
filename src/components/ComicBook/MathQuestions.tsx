import { Page, Question } from "../../types";
import { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import comicService from "../../services/comicService";
import axios from "axios";
const MathQuestions = ({
  stateKey,
  setKey,
  comicName,
  comicPage,
  pageNumber,
}: {
  stateKey: string | undefined;
  setKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  comicName: string;
  comicPage: Page;
  pageNumber: number;
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([""]);
  const [buttonClasses, setButtonClasses] = useState("answer-button");

  useEffect(() => {
    if (comicPage.questionList) {
      setQuestions(comicPage.questionList.map((q) => q));
      setAnswers(new Array(comicPage.questionList.length).fill(""));
    } else {
      setQuestions([]);
    }
  }, [comicPage]);

  const handleAnswer = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (comicPage.questionList && thereAreNewAnswers(comicPage)) {
      const trimmedAnswers = answers.map((a) => a.trim());
      try {
        const key = await comicService.postAnswers(
          comicName,
          pageNumber,
          trimmedAnswers
        );
        if (stateKey != key) {
          flashGreen();
          setAnswers(new Array(comicPage.questionList.length).fill(""));
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

  const thereAreNewAnswers = (comicPage: Page): boolean => {
    let isNewAnswers = false;
    if (
      comicPage.questionList &&
      comicPage.questionList[0].question &&
      !comicPage.questionList[0].answer
    )
      isNewAnswers = true;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].length <= 0) isNewAnswers = false;
    }
    return isNewAnswers;
  };

  const flashRed = () => {
    setButtonClasses("answer-button wrong-answer");
    setTimeout(() => {
      setButtonClasses("answer-button");
    }, 1000);
  };

  const flashGreen = () => {
    setButtonClasses("answer-button right-answer");
    setTimeout(() => {
      setButtonClasses("answer-button");
    }, 1000);
  };

  const changeValues = (
    target: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newValues = [...answers];
    newValues[i] = target.target.value;
    setAnswers(newValues);
  };

  if (!comicPage.questionList) return;
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
      <button className={buttonClasses} type="submit">
        &gt;
      </button>
    </form>
  );
};

export default MathQuestions;
