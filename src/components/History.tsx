import { History as HistoryIcon, X } from 'lucide-react';
import { WinnerRecord } from '../types';
import { Language, getTranslation } from '../i18n/translations';

interface HistoryProps {
  history: WinnerRecord[];
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function History({ history, isOpen, onClose, language }: HistoryProps) {
  if (!isOpen) return null;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar historial"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <HistoryIcon className="text-purple-500" size={28} />
          <h3 className="text-2xl font-bold text-gray-800">{getTranslation(language, 'historyTitle')}</h3>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>{getTranslation(language, 'noHistory')}</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {history.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    {history.length - index}
                  </div>
                  <span className="font-semibold text-gray-800">{record.name}</span>
                </div>
                <span className="text-sm text-gray-500">{formatTime(record.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
