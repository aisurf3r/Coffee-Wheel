import { useState, useEffect } from 'react';
import { Plus, Trash2, HelpCircle, X } from 'lucide-react';
import { Participant } from '../types';
import { Language, getTranslation } from '../i18n/translations';
import { getColorForIndex } from '../utils/colors';
import { shouldShowTutorial, markTutorialShown } from '../utils/storage';

interface NameInputProps {
  participants: Participant[];
  onParticipantsChange: (participants: Participant[]) => void;
  onStartSpin: () => void;
  language: Language;
}

export function NameInput({ participants, onParticipantsChange, onStartSpin, language }: NameInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (shouldShowTutorial()) {
      setShowTutorial(true);
    }
  }, []);

  const handleAddParticipant = () => {
    const name = inputValue.trim();
    if (name && participants.length < 12) {
      const newParticipant: Participant = {
        id: crypto.randomUUID(),
        name,
        color: getColorForIndex(participants.length),
      };
      onParticipantsChange([...participants, newParticipant]);
      setInputValue('');
    }
  };

  const handleRemoveParticipant = (id: string) => {
    const filtered = participants.filter(p => p.id !== id);
    const recolored = filtered.map((p, i) => ({
      ...p,
      color: getColorForIndex(i),
    }));
    onParticipantsChange(recolored);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddParticipant();
    }
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    markTutorialShown();
  };

  const canSpin = participants.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center p-4 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="coffee-cups-input" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1">
              <path d="M 35,40 Q 30,40 30,50 L 30,70 Q 30,80 40,80 L 60,80 Q 70,80 70,70 L 70,50 Q 70,40 65,40 Z"/>
              <path d="M 70,55 Q 75,55 80,60 Q 85,65 85,70 Q 80,75 75,75 Q 70,75 70,70"/>
              <ellipse cx="50" cy="40" rx="15" ry="3"/>
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#coffee-cups-input)"/>
      </svg>
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {getTranslation(language, 'appTitle')}
          </h1>
          <p className="text-gray-600">{getTranslation(language, 'appSubtitle')}</p>
        </div>

        {showTutorial && (
          <div className="mb-6 bg-blue-50 border-2 border-blue-300 rounded-lg p-4 relative">
            <button
              onClick={closeTutorial}
              className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
              aria-label="Cerrar tutorial"
            >
              <X size={20} />
            </button>
            <div className="flex items-start gap-3 pr-6">
              <HelpCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">{getTranslation(language, 'tutorial')}</p>
                <p>{getTranslation(language, 'tutorialText')}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="nameInput" className="block text-sm font-semibold text-gray-700 mb-2">
            {getTranslation(language, 'addParticipant')}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="nameInput"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={getTranslation(language, 'placeholderName')}
              maxLength={20}
              disabled={participants.length >= 12}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
              aria-label="Nombre del participante"
            />
            <button
              onClick={handleAddParticipant}
              disabled={!inputValue.trim() || participants.length >= 12}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 sm:w-auto w-full"
              aria-label={getTranslation(language, 'addButton')}
            >
              <Plus size={20} />
              {getTranslation(language, 'addButton')}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {participants.length}/12 {getTranslation(language, 'participantsCount')}
          </p>
        </div>

        <div className="mb-6">
          {participants.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>{language === 'es' ? 'Añade al menos 2 participantes para comenzar' : 'Add at least 2 participants to start'}</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ borderLeft: `4px solid ${participant.color}` }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    style={{ backgroundColor: participant.color }}
                  />
                  <span className="flex-1 font-medium text-gray-800">{participant.name}</span>
                  <button
                    onClick={() => handleRemoveParticipant(participant.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label={`Eliminar ${participant.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onStartSpin}
          disabled={!canSpin}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl text-xl font-bold hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all shadow-lg"
        >
          {canSpin ? getTranslation(language, 'spinButton') : getTranslation(language, 'notEnoughMessage')}
        </button>
      </div>
    </div>
  );
}
