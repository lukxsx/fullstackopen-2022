const matchers = require("jest-extended");
const listHelper = require("../utils/list_helper");
expect.extend(matchers);

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(5);
  });

  test("total likes equals likes of all posts", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(34);
  });

  test("total likes of list of zero items equals 0", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe("favorite blogs", () => {
  test("most likes of all blogs", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });

  test("favorite from empty list should be none", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(null);
  });

  test("when there are two best, either of them is ok", () => {
    const result = listHelper.favoriteBlog([blogs[0], blogs[1]]);
    expect(result).toBeOneOf([blogs[0], blogs[1]]);
  });
});

describe("most blogs", () => {
  test("find out who has created most blog posts", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual("Robert C. Martin");
  });

  test("test with empty list", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual(null);
  });

  test("test when two authors have same amount of posts", () => {
    const result = listHelper.mostBlogs([
      blogs[1],
      blogs[2],
      blogs[3],
      blogs[4],
    ]);
    expect(result).toBeOneOf(["Edsger W. Dijkstra", "Robert C. Martin"]);
  });
});

describe("most likes", () => {
  test("who has most likes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual("Edsger W. Dijkstra");
  });

  test("empty list should return nothing", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(null);
  });

  test("if two have same amount of likes, return either one", () => {
    const result = listHelper.mostLikes([blogs[0], blogs[1]]);
    expect(result).toBeOneOf(["Michael Chan", "Edsger W. Dijkstra"]);
  });
});
