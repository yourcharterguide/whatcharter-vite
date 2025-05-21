import React, { useEffect, useState } from "react";

const questions = [
  { key: "Entspannte Anreise", text: "Wie wichtig ist dir eine entspannte Anreise?" },
  { key: "Ruhige Ankerbuchten", text: "Wie wichtig sind dir ruhige Ankerbuchten?" },
  { key: "Historische Städte & Kultur", text: "Interessierst du dich fuer historische Staedte und Kultur?" }
];

export default function Quiz() {
  const [matrix, setMatrix] = useState(null);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);

  useEffect(() => {
    fetch("/data/revier_bewertungsmatrix.json")
      .then(res => res.json())
      .then(setMatrix)
      .catch(() => setMatrix([]));
  }, []);

  if (!matrix) {
    return <div>Lade Daten...</div>;
  }

  if (step < questions.length) {
    const q = questions[step];
    return (
      <div>
        <p>{q.text}</p>
        {[1, 2, 3].map(v => (
          <button key={v} onClick={() => {
            setAnswers({ ...answers, [q.key]: v });
            setStep(step + 1);
          }} style={{ marginRight: 8 }}>
            {v}
          </button>
        ))}
      </div>
    );
  }

  // calculate result
  let best = null;
  let bestScore = -Infinity;
  matrix.forEach(region => {
    let score = 0;
    questions.forEach(q => {
      const weight = answers[q.key];
      const val = Number(region[q.key]) || 0;
      score += weight * val;
    });
    if (score > bestScore) {
      bestScore = score;
      best = region;
    }
  });

  return (
    <div>
      <h2>Empfohlenes Revier: {best ? best.Column1 : "keines"}</h2>
      <button onClick={() => { setAnswers({}); setStep(0); }}>Quiz erneut starten</button>
    </div>
  );
}
