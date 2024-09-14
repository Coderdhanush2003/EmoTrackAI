import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendarStyles.css";
import axios from 'axios';

const Homepage = () => {
  const [inputText, setInputText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateEmojis, setDateEmojis] = useState({});

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAnalyse = async () => {
    if (!selectedDate) {
      console.error("No date selected");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2000/api", {
        contents: [{ parts: [{ text: inputText }] }]
      });
      const newEmoji = response.data.emoji;
      setEmoji(newEmoji);

      // Update dateEmojis state
      setDateEmojis((prev) => ({
        ...prev,
        [selectedDate.toISOString().split('T')[0]]: newEmoji
      }));

      // Clear input and emoji state
      setInputText("");
      setEmoji("");
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date, view }) => {
    const dateKey = date.toISOString().split('T')[0];
    if (view === 'month' && dateEmojis[dateKey]) {
      return (
        <div className="emoji-container">
          <span className="emoji">{dateEmojis[dateKey]}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col pr-9 pl-9">
        <div className="flex h-[700px]">
          <div className="left_container h-full w-[42%] mr-2 flex items-center justify-center">
            <h1 className="text-9xl font-semibold">
              Track <br />
              Your
              <br /> Emotion
            </h1>
          </div>
          <div className="right_container h-full w-[50%] flex flex-col items-center justify-center">
            <div className="month w-full h-full rounded-lg mb-4 flex items-center justify-center p-4">
              <Calendar
                className="custom-calendar"
                onChange={handleDateChange}
                tileContent={tileContent}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="w-[80%] p-3 rounded-lg bg-white/80 backdrop-blur-md border border-gray-300 outline-none focus:ring focus:ring-indigo-500"
            placeholder="Describe Your Emotion..."
          />
          <button
            onClick={handleAnalyse}
            className="ml-3 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Analyse
          </button>
          {emoji && <div className="mt-4 text-6xl">{emoji}</div>}
        </div>
      </div>
    </>
  );
};

export default Homepage;
