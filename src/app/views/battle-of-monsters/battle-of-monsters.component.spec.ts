import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MonsterBattleCardComponent } from '../../components/monster-battle-card/monster-battle-card.component';
import { MonsterListComponent } from '../../components/monster-list/monster-list.component';
import { WinnerDisplayComponent } from '../../components/winner-display/winner-display.component';
import { Monster,PostRequest,PostResponse } from '../../interfaces/monster.interface';
import { MonstersService } from '../../services/monsters.service';
import { mockMonsters } from '../../__mocks__/monsters';
import { BattleOfMonstersComponent } from './battle-of-monsters.component';
import { By } from '@angular/platform-browser';

describe('BattleOfMonstersComponent', () => {
  let component: BattleOfMonstersComponent;
  let fixture: ComponentFixture<BattleOfMonstersComponent>;
  let monsterService: MonstersService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        BattleOfMonstersComponent,
        MonsterListComponent,
        WinnerDisplayComponent,
        MonsterBattleCardComponent,
      ],
      providers: [MonstersService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleOfMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    monsterService = TestBed.inject(MonstersService);

    const response: Monster[] = mockMonsters.monsters;
    jest.spyOn(monsterService, 'getAll').mockReturnValue(of(response));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all list monsters', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.monsters.length).toBe(5);
  }));

  it('should show the main page', () => {
    expect(
      fixture.debugElement.query(By.css('span')).properties['innerHTML']
    ).toEqual('Battle of Monsters');
  });

  it('should select a monster', fakeAsync(() => {
    component.monsterSelected(mockMonsters.monsterIndex);
    fixture.detectChanges();
    tick();
    const buttonStartBattle = fixture.nativeElement.querySelector('button');
    expect(buttonStartBattle.disabled).toBeFalsy();
  }));

  it('should unselect a monster', () => {
    component.monsterSelected({monster:null, index:-1});
    const buttonStartBattle = fixture.nativeElement.querySelector('button');
    expect(buttonStartBattle.disabled).toBeTruthy();
  });

  it('should select a random computer monster', fakeAsync(() => {
    component.computer= null;
    component.monsters=mockMonsters.monsters;
    component.monsterSelected(mockMonsters.monsterIndex);
    component.monsterSelected(mockMonsters.monsterIndex);
    fixture.detectChanges();
    tick();
    expect(component.computer).toBeTruthy();
  }));

  it('should unselect a computer monster',  fakeAsync(() => {
    component.computer = mockMonsters.monsters[0];
    component.monsterSelected({monster:null, index:-1});
    fixture.detectChanges();
    tick();
    expect(component.computer).toBeFalsy();
  }));

  it('should set the "No one" to message if tie is true',  (done) => {
    const res:PostResponse = {tie:true,winner: mockMonsters.monsters[0]}
    const postRequest = jest.spyOn(component['monsterService'], 'postWinner').mockReturnValue(of(res));
    component.battleRequest();
    done();
    expect(postRequest).toHaveBeenCalled();
    expect(component.message).toBe("No one")
  });

  it('should set thewinner name to message if tie is false',  (done) => {
    const res:PostResponse = {tie:false,winner: mockMonsters.monsters[0]}
    const postRequest = jest.spyOn(component['monsterService'], 'postWinner').mockReturnValue(of(res));
    component.battleRequest();
    done();
    expect(postRequest).toHaveBeenCalled();
    expect(component.message).toBe(res.winner?.name)
  });

});
