import React from 'react';

const GameScreen = ({
  question,
  options,
  players,
  feedback,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questions,
}) => {
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="game-screen">
      <h2 className="game-title">Question {currentQuestionIndex + 1}</h2>
      <div className="question-container">
        <p className="question">{question}</p>
        <ul className="options-container">
          {Object.keys(options).map((option) => (
            <li key={option} className="option">
              <span className="option-text">{option}: {options[option]}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="feedback-container">
        <p className="feedback">{feedback}</p>
      </div>
      <div className="players-container">
        <h2>Players:</h2>
        <ul className="players-list">
          {players.map((player) => (
            <li key={player.name} className="player">
              <span className="player-name">{player.name}</span>
              <span className="player-score">Score: {player.score}</span>
            </li>
          ))}
        </ul>
      </div>
      {currentQuestionIndex < questions.length - 1 ? (
        <button onClick={handleNextQuestion}>Next Question</button>
      ) : (
        <p>Game Over!</p>
      )}
    </div>
  );
};

export default GameScreen;