export interface Monster {
  id: string;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl: string;
}

export interface MonsterState {
  monsters: Monster[];
  selectedMonsterId: string | undefined;
  selectedMonster: Monster | undefined;
  isResetGame: boolean;
}

export interface MonsterIndex {
  monster:Monster |null,
  index:number
}

export interface PostRequest {
  monster1Id  : string|undefined,
  monster2Id: string|undefined
}

export interface PostResponse {
  winner : Monster|null,
  tie :boolean
  
}



