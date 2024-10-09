import React from 'react';

const PlayerScreen = ({
  question,
  options,
  handleSubmit,
  playerName,
  playerAnswer,
  feedback,
}) => {
  const handleAnswerChange = (e) => {
    handleSubmit(e.target.value);
  };

  return (
    <div className="player-screen">
      <h2>Question</h2>
      <div className="question-container">
        <p className="question">{question}</p>
        <ul className="options-container">
          {Object.keys(options).map((option) => (
            <li key={option} className="option">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={playerAnswer === option}
                onChange={handleAnswerChange}
              />
              <span className="option-text">{option}: {options[option]}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="feedback-container">
        <p className="feedback">{feedback}</p>
      </div>
    </div>
  );
};

export default PlayerScreen;