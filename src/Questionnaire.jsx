import React, { useState } from 'react';
import { questions } from './questions.js';
import './questionnaire.css';

export default function Questionnaire() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const current = questions[index];

  function handleSelect(option) {
    setAnswers({ ...answers, [current.id]: option });
    if (index < questions.length - 1) {
      setTimeout(() => setIndex(index + 1), 300);
    }
  }

  return (
    <div key={current.id} className="question-container fade-in">
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
            {answers[current.id] === opt ? '✓ ' : ''}{opt}
          </button>
        ))}
      </div>
      <div className="progress">Frage {index + 1} von {questions.length}</div>
    </div>
  );
}
