import {
  propertyTypes,
  bonusTypes,
  actionCardTypes,
  assetTypes,
} from './types';

export const property: propertyTypes[] = [
  { title: 'Mansion', price: 1000000, points: 30 },
  { title: 'House', price: 500000, points: 20 },
  { title: 'Granny flat', price: 130000, points: 10 },
  { title: 'Apartment', price: 100000, points: 8 },
  { title: 'Boat', price: 80000, points: 7 },
  { title: 'Car', price: 50000, points: 5 },
  { title: 'Minivan', price: 40000, points: 4 },
  { title: 'Motorbike', price: 20000, points: 3 },
];

export const assets: assetTypes[] = [
  { title: 'Vintage Dress', buy: 10, sell: 100, points: 2 },
  { title: 'iPhone', buy: 1000, sell: 100, points: 2 },
];

export const defenceCards: actionCardTypes[] = [
  {
    title: 'Pet Insurance',
    description: 'Pet medical bills are free (discard this after play)',
    id: 'petInsuranceDefence',
    type: 'defense',
  },
];

export const bonusCards: actionCardTypes[] = [
  {
    title: 'Hard work pays off',
    description: 'Receive 1k bonus from work.',
    id: 'hardWorkBonus',
    type: 'bonus',
  },
];

export const attackCards: actionCardTypes[] = [
  {
    title: 'Cat got your tongue',
    description: 'All Player pays you $5000 for cat surgery',
    id: 'catSurgeryAttack',
    type: 'attack',
  },
  {
    title: 'Ouch',
    description:
      'Player pays you $3,000 for successful wisdom tooth extraction',
    id: 'wisdomToothAttack',
    type: 'attack',
  },
  {
    title: 'Wrecking ball',
    description: 'Destroy any enemy card',
    id: 'destroyCardAttack',
    type: 'attack',
  },
  {
    title: 'Thief',
    description: 'Steal asset from player (excludes property)',
    id: 'stealAssetAttack',
    type: 'attack',
  },
  {
    title: 'Court Battle',
    description: 'Player pays you $2,000 for losing in court',
    id: 'courtBattleAttack',
    type: 'attack',
  },
];

export const actionsCards: actionCardTypes[] = [
  ...attackCards,
  ...defenceCards,
  ...bonusCards,
];

export const permanentBonusCards: bonusTypes[] = [
  {
    title: 'Landlord',
    description: 'Receive 3 bonus points for every property owned',
    id: 'propertyPermBonus',
  },
  {
    title: 'Car Collector',
    description: 'Receive 3 bonus points for every vehicle owned',
    id: 'vehiclePermBonus',
  },
];

export const idList: readonly string[] = [
  ...defenceCards.map((item) => item.id),
  ...bonusCards.map((item) => item.id),
  ...attackCards.map((item) => item.id),
  ...permanentBonusCards.map(item => item.id)
] as const;

export const cards = [...actionsCards, ...assets];
