import React, { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";
import axios from "axios";

const EntryForm = ({
  createDiaryEntry,
}: {
  createDiaryEntry: (entry: NewDiaryEntry) => void;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");
  const handleCreateDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiaryEntry({ date, visibility, weather, comment });
  };

  return (
    <form onSubmit={handleCreateDiary}>
      <label>Date:</label>
      <input value={date} onChange={(e) => setDate(e.target.value)} />
      <input
        value={visibility}
        onChange={(e) => setVisibility(e.target.value as Visibility)}
      />
      <input
        value={weather}
        onChange={(e) => setWeather(e.target.value as Weather)}
      />
      <input value={comment} onChange={(e) => setComment(e.target.value)} />
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
