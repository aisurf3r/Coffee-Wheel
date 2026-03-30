export const translations = {
  es: {
    appTitle: '☕ ¿Quién Paga?',
    appSubtitle: '¡La ruleta decidirá quién invita hoy!',
    addParticipant: 'Añadir participante',
    placeholderName: 'Escribe un nombre...',
    addButton: 'Añadir',
    participantsCount: 'participantes',
    tutorial: '¡Bienvenido!',
    tutorialText: 'Añade entre 2 y 12 nombres y pulsa "¡Girar!" para que la ruleta decida quién paga.',
    spinButton: '🎉 ¡Girar la Ruleta!',
    notEnoughMessage: '➕ Añade al menos 2 personas',
    spinning: '¡Girando la Ruleta!',
    spinningText: '¿Quién será el afortunado?',
    winnerTitle: '¡Hoy paga!',
    winnerSubtext: '¡La ruleta ha decidido!',
    restartButton: 'Girar de Nuevo',
    newRoundButton: 'Nueva Ronda (Cambiar Participantes)',
    shareButton: 'Compartir Resultado',
    shareMessage: '¡La suerte está echada! En el café de hoy, {name} invita. #QuienPaga',
    historyTitle: 'Historial de Ganadores',
    noHistory: 'Aún no hay ganadores en esta sesión',
    reduceMotionLabel: 'Activar animaciones',
    fullMotionLabel: 'Reducir movimiento (accesibilidad)',
    viewHistory: 'Ver historial',
  },
  en: {
    appTitle: '☕ Who Pays?',
    appSubtitle: 'The wheel will decide who treats today!',
    addParticipant: 'Add participant',
    placeholderName: 'Enter a name...',
    addButton: 'Add',
    participantsCount: 'participants',
    tutorial: 'Welcome!',
    tutorialText: 'Add between 2 and 12 names and press "Spin the Wheel!" to let fate decide who pays.',
    spinButton: '🎉 Spin the Wheel!',
    notEnoughMessage: '➕ Add at least 2 people',
    spinning: 'Spinning the Wheel!',
    spinningText: 'Who will be the lucky one?',
    winnerTitle: 'Today pays!',
    winnerSubtext: 'The wheel has decided!',
    restartButton: 'Spin Again',
    newRoundButton: 'New Round (Change Participants)',
    shareButton: 'Share Result',
    shareMessage: 'The die is cast! At today\'s coffee, {name} treats. #WhoPays',
    historyTitle: 'Winners History',
    noHistory: 'No winners in this session yet',
    reduceMotionLabel: 'Enable animations',
    fullMotionLabel: 'Reduce motion (accessibility)',
    viewHistory: 'View history',
  },
};

export type Language = 'es' | 'en';
export type TranslationKey = keyof typeof translations.es;

export function getTranslation(lang: Language, key: TranslationKey, params?: Record<string, string>): string {
  let text = translations[lang][key] || translations.es[key];

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, value);
    });
  }

  return text;
}
