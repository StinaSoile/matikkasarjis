import { Button } from "@mui/material";
import { Page, Question } from "../../types";
import { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import comicService from "../../services/comicService";
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
  // Vastaukset backendiin bodyssa, listana stringeja.

  // Voisin tehdä Questions-tyypin sittenkin sellaiseksi frontissa että answer on vapaaehtoinen.
  // Sitten voisin vaan kattoa että jos answer on, se tarkoittaa että on jo vastattu oikein,
  // joten vastausta ei enää lähetetä backiin.
  // Jos ei ole vastausta, lähetellään tavaraa backiin.
  useEffect(() => {
    console.log(comic[page]);
    if (comic[page].questionList) {
      let newQuestions: Question[] = [];
      for (let q = 0; q < comic[page].questionList.length; q++) {
        const question = comic[page].questionList[q];
        newQuestions = [...newQuestions, question];
      }
      setQuestions(newQuestions);
    }
  }, [page]);

  const handleAnswer = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      comic[page].questionList &&
      comic[page].questionList[0].question &&
      !comic[page].questionList[0].answer
    ) {
      const key = await comicService.postAnswers(comicName, page, answers);
      setKey(key);
      // await comicService
      //   .getPages(comicName, key)
      //   .then((data) => setKey(data));
    }
    // hae vaan oikealla vastauksella uusi key ja sillä uudet sivut. Ei tarvi openedPagea mihinkään.
    else return;
  };

  const changeValues = (
    target: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newValues = [...answers];
    newValues[i] = target.target.value;
    setAnswers(newValues);
  };

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
