var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, post) => {
    return sum + post.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let maxLikes = Math.max(...blogs.map((x) => x.likes));
  return blogs.find((x) => x.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  if (blogs == null || blogs.length == 0) {
    return null;
  }
  const authors = [...blogs.map((x) => x.author)];
  return _.head(_(authors).countBy().entries().maxBy(_.last));
};

const mostLikes = (blogs) => {
  if (blogs == null || blogs.length == 0) {
    return null;
  }
  let authors = [
    ...new Set(
      blogs.map((x) => {
        return {
          author: x.author,
          likes: blogs
            .filter((b) => b.author === x.author)
            .map((x) => x.likes)
            .reduce((sum, a) => sum + a, 0),
        };
      })
    ),
  ];

  return authors.sort((a, b) => (a.likes < b.likes ? 1 : -1))[0].author;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
