import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlogForm from "./NewBlogForm";
import userEvent from "@testing-library/user-event";

describe("blog adding form tests", () => {
  test("Test that createBlog is called with correct values", async () => {
    const user = userEvent.setup();
    const createBlog = jest.fn();

    render(<NewBlogForm createBlog={createBlog} />);
    const titleInput = screen.getByTestId("title");
    const authorInput = screen.getByTestId("author");
    const urlInput = screen.getByTestId("url");
    const sendButton = screen.getByTestId("submit-button");

    await user.type(titleInput, "Test title");
    await user.type(authorInput, "Test author");
    await user.type(urlInput, "http://google.com");

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toStrictEqual({
      title: "Test title",
      author: "Test author",
      url: "http://google.com",
    });
  });
});
