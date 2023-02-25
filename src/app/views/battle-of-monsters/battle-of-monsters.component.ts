import { Component, OnInit } from '@angular/core';
import { Monster, MonsterIndex, PostRequest,PostResponse } from '../../interfaces/monster.interface';
import { MonstersService } from '../../services/monsters.service';

@Component({
  selector: 'app-battle-of-monsters',
  templateUrl: './battle-of-monsters.component.html',
  styleUrls: ['./battle-of-monsters.component.scss'],
})
export class BattleOfMonstersComponent implements OnInit {
  public player!: Monster | null;
  public computer!: Monster | null;
  public monsters: Monster[] = [];
  public message : string |null |undefined;

  constructor(private monsterService: MonstersService) {}

  ngOnInit(): void {
    this.monsterService.getAll().subscribe((res) => {
      this.monsters = res;
    });
  }

  monsterSelected(monsterIndex: MonsterIndex) {
    this.message ='';
    this.player = monsterIndex.monster;
    if(!this.player){
      this.computer = this.player;
      return;
    }
    this.computer = null;
    let random = -1;
    while(true){
      random = Math.floor(Math.random() *this.monsters.length);
      if(random!= monsterIndex.index){
        break;
      }
    }
    this.computer = this.monsters[random];
  }

  battleRequest(){
    const request: PostRequest = {
      monster1Id : this.player?.id,
      monster2Id:this.computer?.id
    }
    this.monsterService.postWinner(request).subscribe(res=>{
      this.message = 'No one'
      if(!res.tie){
        this.message = res.winner?.name;
      }
    })
  }
}
