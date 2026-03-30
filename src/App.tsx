import { useState, useEffect } from 'react';
import { Participant, WinnerRecord, AppScreen } from './types';
import { Language } from './i18n/translations';
import { NameInput } from './components/NameInput';
import { Wheel } from './components/Wheel';
import { Winner } from './components/Winner';
import { History } from './components/History';
import { AccessibilityButton } from './components/AccessibilityButton';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { saveParticipants, loadParticipants } from './utils/storage';
import { playCelebrationSound } from './utils/audio';
import { getColorForIndex } from './utils/colors';

function App() {
  const [screen, setScreen] = useState<AppScreen>('input');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [history, setHistory] = useState<WinnerRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedNames = loadParticipants();
    if (savedNames.length > 0) {
      const loadedParticipants = savedNames.map((name, index) => ({
        id: crypto.randomUUID(),
        name,
        color: getColorForIndex(index),
      }));
      setParticipants(loadedParticipants);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceMotion(prefersReducedMotion);
  }, []);

  const handleParticipantsChange = (newParticipants: Participant[]) => {
    setParticipants(newParticipants);
    saveParticipants(newParticipants.map(p => p.name));
  };

  const handleStartSpin = () => {
    const randomIndex = Math.floor(Math.random() * participants.length);
    const selectedWinner = participants[randomIndex];
    setWinner(selectedWinner);
    setScreen('spinning');
  };

  const handleSpinComplete = () => {
    if (winner) {
      playCelebrationSound();
      setHistory(prev => [...prev, { name: winner.name, timestamp: Date.now() }].slice(-10));
      setScreen('result');
    }
  };

  const handleRestart = () => {
    setWinner(null);
    setScreen('input');
    setTimeout(() => {
      setScreen('spinning');
      const randomIndex = Math.floor(Math.random() * participants.length);
      const selectedWinner = participants[randomIndex];
      setWinner(selectedWinner);
    }, 100);
  };

  const handleNewRound = () => {
    setWinner(null);
    setScreen('input');
  };

  return (
    <>
      {screen === 'input' && (
        <NameInput
          participants={participants}
          onParticipantsChange={handleParticipantsChange}
          onStartSpin={handleStartSpin}
          language={language}
        />
      )}

      {screen === 'spinning' && winner && (
        <Wheel
          participants={participants}
          winner={winner}
          onSpinComplete={handleSpinComplete}
          reduceMotion={reduceMotion}
          language={language}
        />
      )}

      {screen === 'result' && winner && (
        <Winner
          winner={winner}
          onRestart={handleRestart}
          onNewRound={handleNewRound}
          language={language}
        />
      )}

      <LanguageSwitcher
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {screen !== 'spinning' && (
        <AccessibilityButton
          reduceMotion={reduceMotion}
          onToggleMotion={() => setReduceMotion(!reduceMotion)}
          onShowHistory={() => setShowHistory(true)}
          historyCount={history.length}
          showHistory={showHistory}
          language={language}
        />
      )}

      <History
        history={history}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        language={language}
      />
    </>
  );
}

export default App;
