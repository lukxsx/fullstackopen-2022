import { useState } from "react";

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    await createBlog({ title: title, author: author, url: url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h3>Add blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            name="Title"
            data-testid="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author: </label>
          <input
            type="text"
            value={author}
            name="Author"
            data-testid="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>Url: </label>
          <input
            type="text"
            value={url}
            name="Url"
            data-testid="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" data-testid="submit-button" id="submit-button">
          Add blog
        </button>
      </form>
    </>
  );
};

export default NewBlogForm;
