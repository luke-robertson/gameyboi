import {
  propertyTypes,
  cardTypes,
  assetTypes,
  playerType,
  bonusTypes,
  gameStateTypes,
  actionCardTypes
} from './types';
import { property, permanentBonusCards, cards } from './data';
import { game_config } from './config';
import {
  shuffleArray,
  isActionCard,
  isAssetCard,
  isBonusCard,
  generateId,
} from './helpers';
import { Actions } from './actions';

export class InitNewGame {
  private players: playerType[] = [];
  private gameCards: cardTypes = shuffleArray([
    ...cards,
    ...permanentBonusCards,
  ]);
  private gameProperty: propertyTypes[] = shuffleArray(property);
  private gameState: gameStateTypes = {
    currentPlayer: 0,
    currentPlayerTurns: 0,
    gameActive: false,
  };

  constructor(name: string) {
    this.addPlayer(name);
  }

  addPlayer(name: string): void {
    const count = this.getPlayersCount();
    if (count < game_config.max_players) {
      this.players.push({
        name,
        id: generateId(),
        money: game_config.start_money,
        cards: this.getCardsByCount(game_config.start_cards),
        assets: [],
        admin: count === 0,
        points: 0,
      });
    }
  }

  getInfo() {
    return {state: this.gameState, players: this.players};
  }

  getPlayersCount(): number {
    return this.players.length;
  }

  getPlayerById(id: number): playerType {
    return this.players[id];
  }

  getPlayerCardCountById(id: number) {
    return this.players[id].cards.length;
  }

  getActivePlayer(): playerType {
    return this.getPlayerById(this.gameState.currentPlayer);
  }

  getCardsByCount(count: number): cardTypes {
    if (this.gameCards.length + 1 > count) {
      const cards = this.gameCards.splice(0, count);
      this.gameCards = this.gameCards.splice(-count);
      return cards;
    } else {
      this.gameCards.push(...shuffleArray(cards));
      return this.getCardsByCount(count);
    }
  }

  getPropertyByCount(count: number): propertyTypes[] {
    if (this.gameProperty.length + 1 > count) {
      const cards = this.gameProperty.splice(0, count);
      this.gameProperty = this.gameProperty.splice(-count);
      return cards;
    } else {
      this.gameProperty.push(...shuffleArray(property));
      return this.getPropertyByCount(count);
    }
  }

  startGame(): void {
    const players = this.getPlayersCount();
    if (players > game_config.min_players) {
      this.gameState.currentPlayer = Math.floor(Math.random() * players);
      this.gameState.currentPlayerTurns = 3;
      this.gameState.gameActive = true;
    }
  }

  addCardsToPlayer(playerId: number) {
    const newCards: cardTypes = this.getCardsByCount(game_config.start_cards);
    this.players[playerId].cards.push(...newCards);
  }

  nextPlayer() {
    const players = this.getPlayersCount();
    const getNextPlayer = this.gameState.currentPlayer + 1;
    const nextPlayer = getNextPlayer < players ? getNextPlayer : 0;

    this.gameState.currentPlayer = nextPlayer;
    this.gameState.currentPlayerTurns = 3;
    this.addCardsToPlayer(nextPlayer);
  }

  buyAsset(card: assetTypes) {
    const id = this.gameState.currentPlayer;
    this.players[id].assets.push(card);
    this.players[id].money = this.players[id].money - card.buy;
    this.players[id].points = this.players[id].points + card.points;
  }

  sellAsset(card: assetTypes) {
    const id = this.gameState.currentPlayer;
    this.players[id].assets = this.players[id].assets.filter(item => item.title !== card.title);
    this.players[id].money = this.players[id].money + card.sell;
    this.players[id].points = this.players[id].points - card.points;
  }

  preformAction(card: actionCardTypes, targetPlayerId?: number) {
      if (card.type === 'attack') {
        const actions = new Actions()
        const newPlayerState = actions.play(card.id, this.gameState.currentPlayer, this.players)
        this.players = newPlayerState
      }

      if (card.type === 'defense') {
        
      }

    // if (isBonusCard(card)) {
    //   this.applyBonus(card.id);
    // }
  }

  applyBonus(bonusId: number) {}

  playerAction(playerId: string, action: 'card' | 'buy' | 'sell', cardId: number, target?: number) {
    const player = this.getActivePlayer();

    if (playerId !== player.id) {
      throw new Error('Who are you?')
    }

    const card = player.cards[cardId];

    if (action === 'card' && isActionCard(card)) {
      this.preformAction(card, target)
      this.removePlayerCard(cardId);
    }

    if (action === 'buy' && isAssetCard(card)) {
      this.buyAsset(card);
      this.removePlayerCard(cardId);

    }

    if (action === 'sell' && isAssetCard(card)) {
      this.sellAsset(card);
    }
 
    this.reducePlayerTurns();

    this.gameState.currentPlayerTurns = this.gameState.currentPlayerTurns - 1;

    if (this.gameState.currentPlayerTurns === 0) {
      this.nextPlayer();
    }
  }

  removePlayerCard(cardId: number) {
    const playerId = this.gameState.currentPlayer;
    this.players[playerId].cards = this.players[playerId].cards.filter(
      (item, index) => index === cardId
    );
  }

  reducePlayerTurns() {
    this.gameState.currentPlayerTurns = this.gameState.currentPlayerTurns - 1;
  }
}

const run = () => {

  const x = new InitNewGame('Luke')
  x.addPlayer('Jen')
  x.addPlayer('Jess')
  x.addPlayer('Jude')
  const y = x.getInfo()
  console.log(y)

}

run()