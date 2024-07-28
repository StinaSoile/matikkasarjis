import { Button } from "@mui/material";
import { Page, Question } from "../types";
import { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
const MathQuestions = ({ comic, page }: { comic: Page[]; page: number }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [values, setValues] = useState<string[]>([""]);
  const [rightAnswers, setRightAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    setQuestions([]);

    if (comic[page].questionList) {
      let newQuestions: Question[] = [];
      let wrongAnswers: boolean[] = [];
      for (let q = 0; q < comic[page].questionList.length; q++) {
        const question = comic[page].questionList[q];
        newQuestions = [...newQuestions, question];
        wrongAnswers = [...wrongAnswers, false];
        console.log(question.question);
      }
      setRightAnswers(wrongAnswers);
      setQuestions(newQuestions);
    }
  }, [page, comic]);

  const openNextPage = (i: number) => {
    if (!comic[page + i]) {
      // setOpenedPage(page + i - 1);
      return;
    }
    // if (openedPage > page + i) return;
    if (comic[page + i].questionList) {
      // setOpenedPage(page + i);
      return;
    } else return;
  };

  const handleAnswer = (e: SyntheticEvent, i: number) => {
    e.preventDefault();
    // hae vaan oikealla vastauksella uusi key ja sillä uudet sivut. Ei tarvi openedPagea mihinkään.
    console.log(questions[i].answer);
    if (values[i] === questions[i].answer) {
      console.log("Oikea vastaus!!!");
      if (!rightAnswers.includes(false)) {
        openNextPage(1);
      }
    }
  };

  const changeValues = (
    target: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newValues = [...values];
    newValues[i] = target.target.value;
    if (questions[i].answer === target.target.value) {
      const newRightAnswers = [...rightAnswers];
      newRightAnswers[i] = true;
      setRightAnswers(newRightAnswers);
    }
    setValues(newValues);
  };

  return (
    <>
      {questions.map((q, i) => {
        return (
          <>
            <div
              key={i}
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              <div>{q.question}</div>

              <form onSubmit={(e) => handleAnswer(e, i)}>
                <label>
                  <input
                    value={values[i]}
                    type="text"
                    name="name"
                    onChange={(target) => changeValues(target, i)}
                  />
                </label>
                <Button variant="contained" type="submit" color="primary">
                  Arvaa
                </Button>
              </form>
            </div>
          </>
        );
      })}
    </>
  );
};

export default MathQuestions;
