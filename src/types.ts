import { idList } from './data';

export type propertyTypes = {
  title: string;
  price: number;
  points: number;
};

export type playerType = {
  name: string;
  money: number;
  cards: cardTypes;
  assets: assetTypes[];
  points: number;
  admin: boolean;
  id: string;
};

export type actionIdsTypes =
  | 'petInsuranceDefence'
  | 'hardWorkBonus'
  | 'catSurgeryAttack'
  | 'wisdomToothAttack'
  | 'destroyCardAttack'
  | 'stealAssetAttack'
  | 'courtBattleAttack'
  | 'propertyPermBonus'
  | 'vehiclePermBonus';

export interface actionsInterface {
  catSurgeryAttack: (player: number, players: playerType[]) => playerType[];
  wisdomToothAttack: (player: number, players: playerType[]) => playerType[];
  destroyCardAttack: (player: number, players: playerType[]) => playerType[];
  stealAssetAttack: (player: number, players: playerType[]) => playerType[];
  courtBattleAttack: (player: number, players: playerType[]) => playerType[];

  petInsuranceDefence: (player: number, players: playerType[]) => playerType[];


  hardWorkBonus: (player: number, players: playerType[]) => playerType[];
  propertyPermBonus: (player: number, players: playerType[]) => playerType[];
  vehiclePermBonus: (player: number, players: playerType[]) => playerType[];
}

export interface playInterface extends actionsInterface {
  play: (id: keyof actionsInterface , player: number, players: playerType[]) => playerType[]
}


export type actionCardTypes = {
  title: string;
  description: string;
  id: keyof actionsInterface;
  type: 'attack' | 'defense' | 'bonus';
};

export type assetTypes = {
  title: string;
  buy: number;
  sell: number;
  points: number;
};

export type bonusTypes = {
  title: string;
  id: string;
  description: string;
};

export type cardTypes = (actionCardTypes | assetTypes | bonusTypes)[];

export type gameStateTypes = {
  currentPlayer: number;
  currentPlayerTurns: number;
  gameActive: boolean;
};
