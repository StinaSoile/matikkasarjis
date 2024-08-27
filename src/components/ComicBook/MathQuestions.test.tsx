/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent } from "@testing-library/react";
import MathQuestions from "./MathQuestions";
import { expect, test, describe } from "vitest";

describe("<MathQuestions /> when comic page has questions", () => {
  test("should render given questions", () => {
    render(
      <MathQuestions
        progressKey={undefined}
        changeKey={function (): void {
          throw new Error("Function not implemented.");
        }}
        comicName={""}
        comicPage={{
          key: "key",
          pictureName: "picture",
          questionList: [
            {
              question: "Kysymys1",
              answer: "vastaus",
            },
            {
              question: "Kysymys2",
              answer: "vastaus",
            },
            {
              question: "Kysymys3",
              answer: "vastaus",
            },
          ],
        }}
        pageNumber={0}
      />
    );
    const allQuestions = screen.getAllByRole("question");

    expect(allQuestions).toHaveLength(3);
    expect(allQuestions[0]).toHaveTextContent("Kysymys1");
    expect(allQuestions[1]).toHaveTextContent("Kysymys2");
    expect(allQuestions[2]).toHaveTextContent("Kysymys3");
  });
  test("should render answer field for every question", () => {
    render(
      <MathQuestions
        progressKey={undefined}
        changeKey={function (): void {
          throw new Error("Function not implemented.");
        }}
        comicName={""}
        comicPage={{
          key: "key",
          pictureName: "picture",
          questionList: [
            {
              question: "Kysymys1",
              answer: "vastaus",
            },
            {
              question: "Kysymys2",
              answer: "vastaus",
            },
            {
              question: "Kysymys3",
              answer: "vastaus",
            },
          ],
        }}
        pageNumber={0}
      />
    );
    const allAnswerBoxes = screen.getAllByRole("textbox");
    expect(allAnswerBoxes).toHaveLength(3);
  });
  test("should be able to write to textfield", () => {
    render(
      <MathQuestions
        progressKey={undefined}
        changeKey={function (): void {
          throw new Error("Function not implemented.");
        }}
        comicName={""}
        comicPage={{
          key: "key",
          pictureName: "picture",
          questionList: [
            {
              question: "Kysymys1",
              answer: "vastaus",
            },
            {
              question: "Kysymys2",
              answer: "vastaus",
            },
            {
              question: "Kysymys3",
              answer: "vastaus",
            },
          ],
        }}
        pageNumber={0}
      />
    );
    const allAnswerBoxes = screen.getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.change(allAnswerBoxes[0], { target: { value: "Answer1" } });
    fireEvent.change(allAnswerBoxes[1], { target: { value: "Answer2" } });
    fireEvent.change(allAnswerBoxes[2], { target: { value: "Answer3" } });
    expect(allAnswerBoxes[0].value).toBe("Answer1");
    expect(allAnswerBoxes[1].value).toBe("Answer2");
    expect(allAnswerBoxes[2].value).toBe("Answer3");
  });
});
describe("<MathQuestions /> when comic page does not have questions", () => {
  test("should not render any questions", () => {
    render(
      <MathQuestions
        progressKey={undefined}
        changeKey={function (): void {
          throw new Error("Function not implemented.");
        }}
        comicName={""}
        comicPage={{
          key: "key",
          pictureName: "picture",
        }}
        pageNumber={0}
      />
    );
    const allQuestions = screen.queryAllByRole("question");
    expect(allQuestions).toHaveLength(0);
  });
  test("should not render any answer boxes", () => {
    render(
      <MathQuestions
        progressKey={undefined}
        changeKey={function (): void {
          throw new Error("Function not implemented.");
        }}
        comicName={""}
        comicPage={{
          key: "key",
          pictureName: "picture",
        }}
        pageNumber={0}
      />
    );
    const allAnswerBoxes = screen.queryAllByRole("textbox");
    expect(allAnswerBoxes).toHaveLength(0);
  });
});
