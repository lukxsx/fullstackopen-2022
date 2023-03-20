import React, { useState, useEffect } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

const EntryForm = ({
  entries,
  setEntries,
}: {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");
  const handleCreateDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({ date, visibility, weather, comment }).then((data) =>
      setEntries(entries.concat(data))
    );
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

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaryEntries(data));
  });

  return (
    <div>
      <h2>Diary entries</h2>
      <EntryList entries={diaryEntries} />
      <h2>Add new entry</h2>
      <EntryForm entries={diaryEntries} setEntries={setDiaryEntries} />
    </div>
  );
};

export default App;
