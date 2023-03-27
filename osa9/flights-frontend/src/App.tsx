import React, { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";
import axios from "axios";

const getDate = (): string => {
  const today = new Date();
  return today.toISOString().slice(0, 10);
};

const EntryForm = ({
  createDiaryEntry,
}: {
  createDiaryEntry: (entry: NewDiaryEntry) => void;
}) => {
  const [date, setDate] = useState(getDate());
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");
  const handleCreateDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiaryEntry({ date, visibility, weather, comment });
    setDate("");
    setComment("");
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
  };

  return (
    <form onSubmit={handleCreateDiary}>
      <label>Date: </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <br></br>
      <label>Visibility: </label>
      <div>
        Great
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility(Visibility.Great)}
          checked={visibility === Visibility.Great}
        />
        <br />
        Good
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility(Visibility.Good)}
          checked={visibility === Visibility.Good}
        />
        <br />
        OK
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility(Visibility.Ok)}
          checked={visibility === Visibility.Ok}
        />
        <br />
        Poor
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility(Visibility.Poor)}
          checked={visibility === Visibility.Poor}
        />
      </div>
      <br></br>
      <label>Weather: </label>
      <div>
        Sunny
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather(Weather.Sunny)}
          checked={weather === Weather.Sunny}
        />
        <br />
        Rainy
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather(Weather.Rainy)}
          checked={weather === Weather.Rainy}
        />
        <br />
        Cloudy
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather(Weather.Cloudy)}
          checked={weather === Weather.Cloudy}
        />
        <br />
        Stormy
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather(Weather.Stormy)}
          checked={weather === Weather.Stormy}
        />
        <br />
        Windy{" "}
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather(Weather.Windy)}
          checked={weather === Weather.Windy}
        />
      </div>
      <br></br>
      <label>Comment: </label>
      <input value={comment} onChange={(e) => setComment(e.target.value)} />
      <br></br>
      <button type="submit">add</button>
    </form>
  );
};

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <ul>
        <li>Visibility: {entry.visibility}</li>
        <li>Weather: {entry.weather}</li>
      </ul>
    </div>
  );
};

const EntryList = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <div>
      {entries.map((e) => (
        <Entry key={e.id} entry={e} />
      ))}
    </div>
  );
};

const ErrorMessage = ({ message }: { message: string }) => {
  if (message !== "") return <p style={{ color: "red" }}>{message}</p>;
  return <p></p>;
};

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => setDiaryEntries(data));
  }, []);

  const createDiaryEntry = async (entry: NewDiaryEntry) => {
    createDiary(entry)
      .then((data) => {
        setDiaryEntries(diaryEntries.concat(data as DiaryEntry));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data);
          setTimeout(() => setMessage(""), 3000);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div>
      <h2>Diary entries</h2>
      <EntryList entries={diaryEntries} />
      <h2>Add new entry</h2>
      <ErrorMessage message={message} />
      <EntryForm createDiaryEntry={createDiaryEntry} />
    </div>
  );
};

export default App;
