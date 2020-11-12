import { actionCardTypes, assetTypes, bonusTypes, cardTypes } from './types';

export function shuffleArray<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const isActionCard = (
  card: actionCardTypes | assetTypes | bonusTypes
): card is actionCardTypes => {
  return !!(card as actionCardTypes).id;
};

export const isAssetCard = (
  card: actionCardTypes | assetTypes | bonusTypes
): card is assetTypes => {
  return !!(card as assetTypes).sell;
};

export const isBonusCard = (
  card: actionCardTypes | assetTypes | bonusTypes
): card is bonusTypes => {
  return !!(card as bonusTypes).id;
};
