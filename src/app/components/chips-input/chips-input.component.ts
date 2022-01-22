import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
})
export class ChipsInputComponent {
  @Output() updateHeroes = new EventEmitter<string[]>();
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  heroes: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.heroes.push(value);
    }

    event.chipInput!.clear();
    this.updateHeroes.emit(this.heroes);
  }

  remove(hero: string): void {
    const index = this.heroes.indexOf(hero);

    if (index >= 0) {
      this.heroes.splice(index, 1);
    }

    this.updateHeroes.emit(this.heroes);
  }
}
