import {
  propertyTypes,
  cardTypes,
  assetTypes,
  playerType,
  bonusTypes,
  gameStateTypes,
  actionCardTypes,
  actionIdsTypes,
  actionsInterface,
  playInterface,
} from './types';

export class Actions implements actionsInterface {
  play = (
    id: keyof actionsInterface,
    player: number,
    players: playerType[]
  ): playerType[] => {
    const action = this[id];
    const newPlayerState = action(player, players);
    return newPlayerState;
  };

  catSurgeryAttack(player: number, players: playerType[]): playerType[] {
    const newPlayerState: playerType[] = players.map(
      (item: playerType, index: number) => {
        if (index === player) {
          item.money = item.money + players.length * 5000;
        } else {
          item.money = item.money - 5000;
        }
        return item;
      }
    );
    return newPlayerState;
  }

  wisdomToothAttack(player: number, players: playerType[]): playerType[] {
    return [];
  }
  destroyCardAttack(player: number, players: playerType[]): playerType[] {
    return [];
  }
  stealAssetAttack(player: number, players: playerType[]): playerType[] {
    return [];
  }
  courtBattleAttack(player: number, players: playerType[]): playerType[] {
    return [];
  }

  petInsuranceDefence(player: number, players: playerType[]): playerType[] {
    return [];
  }
  hardWorkBonus(player: number, players: playerType[]): playerType[] {
    return [];
  }
  propertyPermBonus(player: number, players: playerType[]): playerType[] {
    return [];
  }
  vehiclePermBonus(player: number, players: playerType[]): playerType[] {
    return [];
  }
}
