import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockMonsters } from '../../__mocks__/monsters';
import { MonsterCardComponent } from '../monster-card/monster-card.component';

import { MonsterListComponent } from './monster-list.component';

describe('MonsterListComponent', () => {
  let component: MonsterListComponent;
  let fixture: ComponentFixture<MonsterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonsterListComponent, MonsterCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the message when it have not monsters', () => {
    component.monsters = [];
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('span')).properties['innerHTML'].trim()
    ).toEqual('No monsters available');
  });
  it('should show the list of monsters', fakeAsync(() => {
    component.monsters = mockMonsters.monsters;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('span')).properties['innerHTML'].trim()
    ).toEqual('Select your monster');
    const matCard = fixture.debugElement.queryAll(By.css('app-monster-card'));
    fixture.detectChanges();
    tick(400);
    expect(matCard.length).toEqual(5);
  }));

  it('should select a monster', fakeAsync(() => {
    const spy = jest.spyOn(component.selected, 'emit');
    component.monsters = mockMonsters.monsters;
    component.monsterSelected(mockMonsters.selectedMonster,mockMonsters.index);
    tick();
    void expect(spy).toHaveBeenCalled();
  }));

  it('should unselect a monster', fakeAsync(() => {
    const spy = jest.spyOn(component.selected, 'emit');
    component.monsters = mockMonsters.monsters;
    component.selectedMonsterId = 'monster-1';
    component.monsterSelected(mockMonsters.selectedMonster,mockMonsters.index);
    tick();
    void expect(spy).toHaveBeenCalled();
  }));
});
