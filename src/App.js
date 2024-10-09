import React, { useState, useEffect } from 'react';
import GameScreen from './GameScreen';
import PlayerScreen from './PlayerScreen';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';
import './GameScreen.css'

const questions = [
  {
    question: "What is the capital of France?",
    options: { A: "Paris", B: "London", C: "Berlin", D: "Madrid" },
    answer: "A"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: { A: "Earth", B: "Mars", C: "Jupiter", D: "Venus" },
    answer: "B"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: { A: "Atlantic Ocean", B: "Indian Ocean", C: "Arctic Ocean", D: "Pacific Ocean" },
    answer: "D"
  }
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shouldMoveToNextQuestion, setShouldMoveToNextQuestion] = useState(false);
  const [laptopQuestionIndex, setLaptopQuestionIndex] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mobile') === 'true') {
      setIsMobileMode(true);
    }
  }, []);

  const handlePlayerJoin = (name) => {
    setPlayerName(name);
    setPlayers([...players, { name, score: 0 }]);
    setShowQuestion(true);
  };

  const handleAnswerSubmit = (answer) => {
    setPlayerAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.answer) {
      setFeedback(`Correct answer, ${playerName}!`);
      // Increment score
      const updatedPlayers = players.map((player) =>
        player.name === playerName ? { ...player, score: player.score + 1 } : player
      );
      setPlayers(updatedPlayers);
      setShouldMoveToNextQuestion(true);
    } else {
      setFeedback(`Incorrect answer, ${playerName}.`);
    }
  };

  useEffect(() => {
    if (shouldMoveToNextQuestion) {
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setFeedback(''); // Clear feedback for next question
          setShouldMoveToNextQuestion(false);
        } else {
          setGameOver(true);
        }
      }, 2000);
    }
  }, [shouldMoveToNextQuestion, currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];
  const laptopQuestion = questions[laptopQuestionIndex];

  return (
    <div className="app-container">

      <div className="app-content">
        {isMobileMode ? (
          <div>
            {showQuestion ? (
              <PlayerScreen
                question={currentQuestion.question}
                options={currentQuestion.options}
                handleSubmit={handleAnswerSubmit}
                playerName={playerName}
                playerAnswer={playerAnswer}
                feedback={feedback}
              />
            ) : (
              <div>
                <input type="text" placeholder="Enter your name" onChange={(e) => setPlayerName(e.target.value)} />
                <button onClick={() => handlePlayerJoin(playerName)}>Submit Name</button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {gameOver ? (
              <div>
                <h2>Game Over!</h2>
                <p>Final Score:</p>
                <ul>
                  {players.map((player) => (
                    <li key={player.name}>{player.name} - {player.score}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <GameScreen
                question={laptopQuestion.question}
                options={laptopQuestion.options}
                players={players}
                feedback={feedback}
                currentQuestionIndex={laptopQuestionIndex}
                setCurrentQuestionIndex={setLaptopQuestionIndex}
                questions={questions}
              />
            )}
          </div>
        )}
      </div>

      {isMobileMode ? null : (
        <div >
          < QRCodeCanvas value={`${window.location.href}?mobile=true`} className ="qrcode" />
        </div>
      )}
    </div>
  );
};

export default App;