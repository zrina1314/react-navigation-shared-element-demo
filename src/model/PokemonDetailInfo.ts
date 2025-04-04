export interface PokeInfo {
  id: number;
  height: number;
  weight: number;
  types: PokeInfoTypes[];
  stats: PokeInfoStats[];
}

export interface PokeInfoTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokeInfoStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
