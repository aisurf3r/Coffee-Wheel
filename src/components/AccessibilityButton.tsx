import { History as HistoryIcon, Zap, ZapOff } from 'lucide-react';
import { Language, getTranslation } from '../i18n/translations';

interface AccessibilityButtonProps {
  reduceMotion: boolean;
  onToggleMotion: () => void;
  onShowHistory: () => void;
  historyCount: number;
  showHistory: boolean;
  language: Language;
}

export function AccessibilityButton({
  reduceMotion,
  onToggleMotion,
  onShowHistory,
  historyCount,
  showHistory,
  language,
}: AccessibilityButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {!showHistory && (
        <button
          onClick={onShowHistory}
          className="bg-white text-purple-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 relative"
          aria-label="Ver historial"
          title="Ver historial de ganadores"
        >
          <HistoryIcon size={24} />
          {historyCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {historyCount}
            </div>
          )}
        </button>
      )}

      <button
        onClick={onToggleMotion}
        className={`${
          reduceMotion ? 'bg-orange-500' : 'bg-white text-orange-600'
        } p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110`}
        aria-label={reduceMotion ? getTranslation(language, 'reduceMotionLabel') : getTranslation(language, 'fullMotionLabel')}
        title={reduceMotion ? getTranslation(language, 'reduceMotionLabel') : getTranslation(language, 'fullMotionLabel')}
      >
        {reduceMotion ? (
          <ZapOff size={24} className="text-white" />
        ) : (
          <Zap size={24} />
        )}
      </button>
    </div>
  );
}
