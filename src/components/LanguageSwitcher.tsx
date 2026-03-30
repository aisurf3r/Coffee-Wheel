import { Globe } from 'lucide-react';
import { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <button
      onClick={() => onLanguageChange(currentLanguage === 'es' ? 'en' : 'es')}
      className="fixed top-6 right-6 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40 flex items-center gap-2 font-semibold"
      aria-label="Cambiar idioma / Change language"
      title={currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Globe size={20} />
      <span className="text-sm">{currentLanguage.toUpperCase()}</span>
    </button>
  );
}
