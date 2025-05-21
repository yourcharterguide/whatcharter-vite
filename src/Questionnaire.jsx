import React, { useState } from 'react';
import { questions } from './questions.js';
import './questionnaire.css';

export default function Questionnaire() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const isDone = index >= questions.length;
  const current = questions[index];

  function handleSelect(option) {
    if (isDone) return;
    setAnswers({ ...answers, [current.id]: option });
    setTimeout(() => setIndex(index + 1), 300);
  }

  return (
    <div key={isDone ? 'done' : current.id} className="question-container fade-in">
      {isDone ? (
        <h2 className="question-text">Danke für deine Antworten!</h2>
      ) : (
        <>
          <h2 className="question-text">{current.text}</h2>
          <div className="options">
            {current.options.map((opt) => (
              <button
                key={opt}
                className={
                  'option-button' + (answers[current.id] === opt ? ' selected' : '')
                }
                onClick={() => handleSelect(opt)}
              >
                {answers[current.id] === opt ? '✓ ' : ''}
                {opt}
              </button>
            ))}
          </div>
          <div className="progress">
            Frage {index + 1} von {questions.length}
          </div>
        </>
      )}
    </div>
  );
}
