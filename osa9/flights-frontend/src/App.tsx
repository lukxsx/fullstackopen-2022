import React, { useState, useEffect } from "react";
import axios from "axios";
import { DiaryEntry } from "./types";

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
    axios
      .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
      .then((response) => setDiaryEntries(response.data));
  });

  return (
    <div>
      <h2>Diary entries</h2>
      <EntryList entries={diaryEntries} />
    </div>
  );
};

export default App;
