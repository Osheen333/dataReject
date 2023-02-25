import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Monster } from 'src/app/interfaces/monster.interface';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.scss'],
})
export class MonsterListComponent {
  @Output() public selected = new EventEmitter();
  @Input() public monsters: Monster[] = [];
  public selectedMonsterId: string | null = null;

  monsterSelected(monster: Monster | null, index: number) {
    if (monster!.id == this.selectedMonsterId) {
      monster = null;
    }
    this.selectedMonsterId = monster?.id || null;
    this.selected.emit({monster:monster,index:index});
  }
}
