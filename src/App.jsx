import { useMemo, useState } from 'react';

const moduleCards = [
  {
    title: 'Physique',
    icon: '⚙️',
    description: 'Mouvement, force, énergie, électricité.',
    level: 'Collège / Lycée'
  },
  {
    title: 'Chimie',
    icon: '🧪',
    description: 'Réactions, pH, molécules et solutions.',
    level: 'Collège / Lycée'
  },
  {
    title: 'Biologie',
    icon: '🧬',
    description: 'Cellules, organismes, système nerveux.',
    level: 'Collège / Lycée'
  },
  {
    title: 'SVT',
    icon: '🌿',
    description: 'Écosystèmes, environnement et évolution.',
    level: 'Collège / Lycée'
  }
];

const quizQuestions = [
  {
    question: 'La force est-elle mesurée en ?',
    options: ['Joule', 'Newton', 'Mètre', 'Volt'],
    answer: 'Newton'
  },
  {
    question: 'Quelle formule relie énergie, masse et vitesse ?',
    options: ['E = mgh', 'E = mc²', 'E = 1/2 mv²', 'E = P × t'],
    answer: 'E = 1/2 mv²'
  },
  {
    question: 'Le pH d’une solution neutre est ?',
    options: ['0', '7', '10', '14'],
    answer: '7'
  }
];

const quickTips = [
  'Identifier les données utiles avant de commencer.',
  'Toujours écrire l’unité dans la réponse finale.',
  'Relire la question pour vérifier ce qu’il faut calculer.'
];

function solveExercise(question) {
  const text = question.toLowerCase();

  if (text.includes('force') || text.includes('masse') || text.includes('acceleration')) {
    return {
      tag: 'Mécanique',
      summary: 'On utilise la deuxième loi de Newton : F = m × a',
      steps: [
        '1. Repérer la masse m et l’accélération a.',
        '2. Calculer F = m × a.',
        '3. Vérifier l’unité : kilogramme × m/s² = newton.'
      ],
      answer: 'La force est donnée par F = m × a. Si m = 5 kg et a = 2 m/s², alors F = 10 N.'
    };
  }

  if (text.includes('énergie') || text.includes('energie') || text.includes('vitesse')) {
    return {
      tag: 'Énergie',
      summary: 'L’énergie cinétique est calculée avec E = 1/2 × m × v².',
      steps: [
        '1. Identifier la masse m et la vitesse v.',
        '2. Calculer v².',
        '3. Multiplier par 1/2 et la masse.'
      ],
      answer: 'La formule est E = 1/2 × m × v². L’énergie est exprimée en joules (J).'
    };
  }

  if (text.includes('ph') || text.includes('solution') || text.includes('acide') || text.includes('base')) {
    return {
      tag: 'Chimie',
      summary: 'Le pH renseigne sur l’acidité ou la basicité d’une solution.',
      steps: [
        '1. Déterminer si la solution est acide, basique ou neutre.',
        '2. Se rappeler que pH = 7 est neutre.',
        '3. Plus le pH est bas, plus la solution est acide.'
      ],
      answer: 'Un pH inférieur à 7 indique une solution acide ; un pH supérieur à 7 indique une solution basique.'
    };
  }

  if (text.includes('cellule') || text.includes('gène') || text.includes('adn') || text.includes('système nerveux')) {
    return {
      tag: 'Biologie',
      summary: 'Les cellules sont les unités de base des êtres vivants.',
      steps: [
        '1. Repérer le sujet : cellule, ADN, système nerveux...',
        '2. Rappeler la définition ou le rôle des organes ou structures.',
        '3. Relier la structure à sa fonction.'
      ],
      answer: 'Les cellules contiennent l’information génétique et assurent les fonctions du vivant. Le système nerveux transmet les messages dans le corps.'
    };
  }

  return {
    tag: 'Général',
    summary: 'Pour résoudre un exercice de sciences, il faut d’abord identifier la loi ou le concept concerné.',
    steps: [
      '1. Lire la question et relever les données.',
      '2. Trouver le thème : force, énergie, pH, cellule, etc.',
      '3. Appliquer la formule ou le concept juste.',
      '4. Donner la réponse avec l’unité.'
    ],
    answer: 'Une méthode simple : identifie le concept, applique la formule, vérifie les unités et répond clairement.'
  };
}

export default function App() {
  const [question, setQuestion] = useState('Un objet de 5 kg subit une accélération de 2 m/s². Quelle est la force appliquée ?');
  const [selection, setSelection] = useState('Physique');
  const [result, setResult] = useState(() => solveExercise('Un objet de 5 kg subit une accélération de 2 m/s². Quelle est la force appliquée ?'));
  const [history, setHistory] = useState([
    'Calcul de la force d’un objet.',
    'Explication du pH d’une solution.'
  ]);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const filteredModules = useMemo(() => {
    if (!selection || selection === 'Tous') return moduleCards;
    return moduleCards.filter((item) => item.title === selection);
  }, [selection]);

  const handleSolve = () => {
    const solution = solveExercise(question);
    setResult(solution);
    setHistory((prev) => [question, ...prev].slice(0, 5));
  };

  const handleQuizAnswer = (answer) => {
    setShowAnswer(true);
    if (answer === 'Newton') setScore((prev) => prev + 1);
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <div>
            <p className="brand-name">ScienceSolve</p>
            <span className="brand-subtitle">Aide aux élèves</span>
          </div>
        </div>

        <nav className="nav">
          <a href="#solveur">Solveur</a>
          <a href="#quiz">Quiz</a>
          <a href="#cours">Cours</a>
          <a href="#progress">Progression</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="badge">Nouveau</span>
            <h1>Résous tes problèmes de sciences avec des explications claires.</h1>
            <p>
              Un assistant simple pour comprendre les formules, suivre le raisonnement et
              réviser efficacement.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#solveur">Commencer</a>
              <a className="secondary-btn" href="#quiz">Je teste mes connaissances</a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="mini-stat">
              <strong>3 200+</strong>
              <span>exercices résolus</span>
            </div>
            <div className="mini-stat">
              <strong>92%</strong>
              <span>de satisfaction</span>
            </div>
            <div className="mini-stat">
              <strong>4.8/5</strong>
              <span>expérience élève</span>
            </div>
          </div>
        </section>

        <section id="solveur" className="panel solve-panel">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Solveur</p>
              <h2>Résoudre un exercice</h2>
            </div>
            <select value={selection} onChange={(e) => setSelection(e.target.value)}>
              <option value="Tous">Toutes matières</option>
              <option value="Physique">Physique</option>
              <option value="Chimie">Chimie</option>
              <option value="Biologie">Biologie</option>
              <option value="SVT">SVT</option>
            </select>
          </div>

          <div className="solver-grid">
            <div className="input-card">
              <label htmlFor="question">Décris ton exercice</label>
              <textarea
                id="question"
                rows="6"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button className="primary-btn full" onClick={handleSolve}>Analyser l’exercice</button>
            </div>

            <div className="result-card">
              <span className="tag">{result.tag}</span>
              <h3>{result.summary}</h3>
              <ul>
                {result.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <div className="answer-box">
                <strong>Réponse :</strong>
                <p>{result.answer}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="quiz" className="panel quiz-panel">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Quiz</p>
              <h2>Teste-toi</h2>
            </div>
            <div className="score-pill">Score : {score}/1</div>
          </div>

          <div className="quiz-box">
            <p className="question">{quizQuestions[0].question}</p>
            <div className="options">
              {quizQuestions[0].options.map((option) => (
                <button key={option} onClick={() => handleQuizAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
            {showAnswer && (
              <p className="feedback">Bonne réponse : {quizQuestions[0].answer}</p>
            )}
          </div>
        </section>

        <section id="cours" className="panel courses-panel">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Cours</p>
              <h2>Les matières</h2>
            </div>
          </div>

          <div className="cards-grid">
            {filteredModules.map((module) => (
              <article className="module-card" key={module.title}>
                <span className="module-icon">{module.icon}</span>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <small>{module.level}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="progress" className="panel progress-panel">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Progression</p>
              <h2>Suivi d’apprentissage</h2>
            </div>
          </div>

          <div className="progress-grid">
            <div className="progress-card metrics">
              <strong>78%</strong>
              <span>de réussite sur les exercices</span>
            </div>
            <div className="progress-card metrics">
              <strong>12</strong>
              <span>quiz complétés</span>
            </div>
            <div className="progress-card tips">
              <h4>Astuce du jour</h4>
              <ul>
                {quickTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="progress-card history">
              <h4>Historique</h4>
              <ul>
                {history.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
