import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const blogUser = {
  username: "testuser",
  name: "Tester",
};

const blog = {
  title: "Test title",
  author: "Test author",
  url: "http://google.com",
  likes: 22,
  user: blogUser,
};

let container;
let mockHandler;

describe("blog post tests", () => {
  beforeEach(() => {
    mockHandler = jest.fn();
    container = render(
      <Blog
        blog={blog}
        user={blogUser}
        addLike={mockHandler}
        deleteBlog={mockHandler}
      />
    ).container;
  });

  test("render title and author, but not url and likes", () => {
    expect(container.innerHTML).toContain("Test title");
    expect(container.innerHTML).toContain("Test author");
    expect(container.innerHTML).not.toContain("http://google.com");
    expect(container.innerHTML).not.toContain("22");
  });

  test("render url and likes when show is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);
    expect(container.innerHTML).toContain("Test title");
    expect(container.innerHTML).toContain("Test author");
    expect(container.innerHTML).toContain("http://google.com");
    expect(container.innerHTML).toContain("22");
  });

  test("like adding handler is called when like button is clicked", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("show");
    await user.click(showButton);
    const likeButton = screen.getByText("Like!");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
