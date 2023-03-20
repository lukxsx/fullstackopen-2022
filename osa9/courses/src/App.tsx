interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackround extends CoursePartBaseWithDescription {
  backroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special",
  },
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case "basic":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br></br>
          <i>{course.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br></br>
          project exercises: {course.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br></br>
          <i>{course.description}</i>
          <br></br>
          Background material: {course.backroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br></br>
          {course.description}
          <br></br>
          Required skills: {course.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(course);
  }
};

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {courses.map((c) => (
        <Part key={c.name} course={c}></Part>
      ))}
    </div>
  );
};

const Total = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  return (
    <div>
      <Header name={courseName}></Header>
      <Content courses={courseParts}></Content>
      <Total courses={courseParts}></Total>
    </div>
  );
};

export default App;
