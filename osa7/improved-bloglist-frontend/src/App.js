import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userData = window.localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.addBlog(blog);
      setBlogs(blogs.concat(newBlog));
      dispatch(
        setNotification(`A new blog ${newBlog.title} added!`, 5000, false)
      );
      setTimeout(() => dispatch(setNotification(``)), 5000);
    } catch (exception) {
      dispatch(setNotification("Error adding blog", 5000, true));
    }
  };

  const doLogin = async (loginUser) => {
    try {
      const user = await loginService.login(loginUser);
      window.localStorage.setItem("userData", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(setNotification("Invalid username or password", 5000, true));
    }
  };

  const addLike = async (blog) => {
    try {
      const updatedBlog = await blogService.addLike({
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
    } catch (exception) {
      dispatch(setNotification("Error adding like", 5000, true));
    }
  };

  const deleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (exception) {
      dispatch(setNotification("Error deleting blog", 5000, true));
    }
  };

  const blogFormRef = useRef();
  const newBlogForm = () => (
    <Togglable id="new-blog-button" buttonLabel="New blog" ref={blogFormRef}>
      <NewBlogForm createBlog={createBlog} />
    </Togglable>
  );

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm doLogin={doLogin} />
      </>
    );
  }

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification />
      {user === null && <LoginForm setUser={setUser} />}
      <div>
        {!user.name || user.name === "" ? user.username : user.name} logged in.{" "}
        <button
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          Logout
        </button>
      </div>
      <h2>Blogs</h2>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog, idx) => (
          <Blog
            key={blog.id}
            index={idx}
            blog={blog}
            addLike={addLike}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      {newBlogForm()}
    </div>
  );
};

export default App;
