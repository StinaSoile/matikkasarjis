/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent } from "@testing-library/react";
import MathQuestions from "./MathQuestions";
import comicService from "../../services/comicService";
import { vi } from "vitest";

// Mockataan comicService
vi.mock("../../services/comicService");

const mockPostAnswers = comicService.postAnswers as jest.Mock<Promise<string>>;

const renderQuestions = (
  key: string,
  fn = () => {
    return "";
  }
) => {
  render(
    <MathQuestions
      progressKey={key}
      changeKey={fn}
      comicName={"test-comic"}
      comicPage={{
        key: "key",
        pictureName: "picture",
        questionList: [
          { question: "Kysymys1", answer: "" },
          { question: "Kysymys2", answer: "" },
          { question: "Kysymys3", answer: "" },
        ],
      }}
      pageNumber={0}
    />
  );
};
describe("<MathQuestions /> when comic page has questions", () => {
  test("should render given questions", () => {
    renderQuestions("old-key");

    const allQuestions = screen.getAllByRole("question");

    expect(allQuestions).toHaveLength(3);
    expect(allQuestions[0]).toHaveTextContent("Kysymys1");
    expect(allQuestions[1]).toHaveTextContent("Kysymys2");
    expect(allQuestions[2]).toHaveTextContent("Kysymys3");
  });

  test("should render answer field for every question", () => {
    renderQuestions("old-key");

    const allAnswerBoxes = screen.getAllByRole("textbox");
    expect(allAnswerBoxes).toHaveLength(3);
  });

  test("should be able to write to textfield", () => {
    renderQuestions("old-key");

    const allAnswerBoxes = screen.getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.change(allAnswerBoxes[0], { target: { value: "Answer1" } });
    fireEvent.change(allAnswerBoxes[1], { target: { value: "Answer2" } });
    fireEvent.change(allAnswerBoxes[2], { target: { value: "Answer3" } });
    expect(allAnswerBoxes[0].value).toBe("Answer1");
    expect(allAnswerBoxes[1].value).toBe("Answer2");
    expect(allAnswerBoxes[2].value).toBe("Answer3");
  });

  test("handleAnswer should not call comicService if all textboxes have no answer", async () => {
    mockPostAnswers.mockResolvedValueOnce("new-key");

    const changeKey = vi.fn();
    renderQuestions("old-key", changeKey);

    const allAnswerBoxes = screen.getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.change(allAnswerBoxes[0], { target: { value: "New Answer" } });

    const button = screen.getByRole("button");
    fireEvent.submit(button);

    expect(mockPostAnswers).not.toHaveBeenCalledWith("test-comic", 0, [
      "New Answer",
      "",
      "",
    ]);

    await screen.findAllByRole("textbox");

    expect(changeKey).not.toHaveBeenCalled();
    expect(allAnswerBoxes[0].value).toBe("New Answer");
    expect(allAnswerBoxes[1].value).toBe("");
    expect(allAnswerBoxes[2].value).toBe("");
  });

  test("handleAnswer should call comicService and because comicService gives a new key, call changeKey and empty textboxes", async () => {
    mockPostAnswers.mockResolvedValueOnce("new-key");

    const changeKey = vi.fn();

    renderQuestions("old-key", changeKey);

    const allAnswerBoxes = screen.getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.change(allAnswerBoxes[0], { target: { value: "New Answer" } });
    fireEvent.change(allAnswerBoxes[1], { target: { value: "New Answer" } });
    fireEvent.change(allAnswerBoxes[2], { target: { value: "New Answer" } });

    const button = screen.getByRole("button");
    fireEvent.submit(button);

    expect(mockPostAnswers).toHaveBeenCalledWith("test-comic", 0, [
      "New Answer",
      "New Answer",
      "New Answer",
    ]);

    await screen.findAllByRole("textbox");

    expect(allAnswerBoxes[0].value).toBe("");
    expect(allAnswerBoxes[1].value).toBe("");
    expect(allAnswerBoxes[2].value).toBe("");
    expect(changeKey).toHaveBeenCalledWith("new-key");
  });

  test("handleAnswer should call comicService that gives an old key, hence no changeKey is called or textboxes emptied", async () => {
    mockPostAnswers.mockResolvedValueOnce("new-key");

    const changeKey = vi.fn();

    renderQuestions("new-key", changeKey);

    const allAnswerBoxes = screen.getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.change(allAnswerBoxes[0], { target: { value: "New Answer" } });
    fireEvent.change(allAnswerBoxes[1], { target: { value: "New Answer" } });
    fireEvent.change(allAnswerBoxes[2], { target: { value: "New Answer" } });

    const button = screen.getByRole("button");
    fireEvent.submit(button);

    expect(mockPostAnswers).toHaveBeenCalledWith("test-comic", 0, [
      "New Answer",
      "New Answer",
      "New Answer",
    ]);

    await screen.findAllByRole("textbox");
    if (changeKey.mock.calls.length > 0) {
      console.log("changeKey called with:", changeKey.mock.calls[0][0]);
    }
    expect(changeKey).not.toHaveBeenCalled();
    expect(allAnswerBoxes[0].value).toBe("New Answer");
    expect(allAnswerBoxes[1].value).toBe("New Answer");
    expect(allAnswerBoxes[2].value).toBe("New Answer");
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
          questionList: undefined,
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
