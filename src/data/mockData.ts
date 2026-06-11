import { Bar, DrinkTemplate } from '../types';

export const CHEERS_DAILY_COST = 82.54;

export const bars: Bar[] = [
  { id: 'atr', name: 'Atrium Bar' },
  { id: 'red', name: 'RedFrog Rum Bar' },
  { id: 'blu', name: 'BlueIguana Tequila Bar' },
  { id: 'alc', name: 'Alchemy Bar' }
];

export const menu: DrinkTemplate[] = [
  { id: 'm1', name: 'Mojito', price: 12, alcoholType: 'rum', flavor: 'refreshing', moods: ['relaxing'], description: 'Minty, bubbly rum classic.', barIds: ['red', 'atr'] },
  { id: 'm2', name: 'Margarita', price: 13, alcoholType: 'tequila', flavor: 'sour', moods: ['party'], description: 'Citrus-forward and salty rim.', barIds: ['blu'] },
  { id: 'm3', name: 'Whiskey Sour', price: 13, alcoholType: 'whiskey', flavor: 'sour', moods: ['adventurous', 'relaxing'], description: 'Balanced whiskey and lemon.', barIds: ['alc'] },
  { id: 'm4', name: 'Piña Colada', price: 14, alcoholType: 'rum', flavor: 'sweet', moods: ['party', 'relaxing'], description: 'Creamy tropical pineapple-coconut blend.', barIds: ['red', 'atr'] },
  { id: 'm5', name: 'Virgin Daiquiri', price: 8, alcoholType: 'none', flavor: 'fruity', moods: ['relaxing'], description: 'Fruit-forward frozen mocktail.', barIds: ['atr', 'red'] }
];
