import { Button } from "@mui/material";
import { Page, Question } from "../../types";
import { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import comicService from "../../services/comicService";
import axios from "axios";
const MathQuestions = ({
  setKey,
  comicName,
  comic,
  page,
}: {
  setKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  comicName: string;
  comic: Page[];
  page: number;
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([""]);

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
      try {
        const key = await comicService.postAnswers(comicName, page, answers);
        setKey(key);
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
    <form onSubmit={(e) => handleAnswer(e)}>
      {questions.map((q, i) => {
        return (
          <div
            key={i}
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            <div>{q.question}</div>

            <label>
              <input
                value={answers[i]}
                type="text"
                name="name"
                onChange={(target) => changeValues(target, i)}
              />
            </label>
          </div>
        );
      })}
      <Button variant="contained" type="submit" color="primary">
        Arvaa
      </Button>
    </form>
  );
};

export default MathQuestions;
