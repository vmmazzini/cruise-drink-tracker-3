export type AlcoholType = 'vodka' | 'rum' | 'tequila' | 'whiskey' | 'none';
export type Flavor = 'sweet' | 'sour' | 'strong' | 'fruity' | 'refreshing';
export type Mood = 'relaxing' | 'party' | 'adventurous';

export interface Bar { id: string; name: string; }

export interface DrinkTemplate {
  id: string;
  name: string;
  price: number;
  alcoholType: AlcoholType;
  flavor: Flavor;
  moods: Mood[];
  description: string;
  barIds: string[];
}

export interface DrinkLog {
  id: number;
  name: string;
  barId: string;
  timestamp: string;
  price: number;
  isAlcoholic: number;
  favorite: number;
}

export interface TripSettings {
  startDate: string;
  endDate: string;
  hydrationEnabled: boolean;
}
