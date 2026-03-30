const PARTICIPANTS_KEY = 'quien_paga_participants';
const SHOW_TUTORIAL_KEY = 'quien_paga_show_tutorial';

export function saveParticipants(names: string[]): void {
  try {
    localStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(names));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage', e);
  }
}

export function loadParticipants(): string[] {
  try {
    const saved = localStorage.getItem(PARTICIPANTS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn('No se pudo cargar de localStorage', e);
    return [];
  }
}

export function shouldShowTutorial(): boolean {
  try {
    const shown = localStorage.getItem(SHOW_TUTORIAL_KEY);
    return shown !== 'false';
  } catch (e) {
    return true;
  }
}

export function markTutorialShown(): void {
  try {
    localStorage.setItem(SHOW_TUTORIAL_KEY, 'false');
  } catch (e) {
    console.warn('No se pudo guardar tutorial en localStorage', e);
  }
}
