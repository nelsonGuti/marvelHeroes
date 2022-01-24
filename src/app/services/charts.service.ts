import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hero } from '../components/hero-card/hero.model';

export enum HeroProps {
  NAME = 'nameLabel',
  GENDER = 'genderLabel',
  CITIZENSHIP = 'citizenshipLabel',
  SKILS = 'skillsLabel',
  OCCUPATION = 'occupationLabel',
  MEMBER_OF = 'memberOfLabel',
  CREATOR = 'creatorLabel',
}

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor() {}

  wrangleData(data: MatTableDataSource<Hero>, prop: HeroProps) {
    return data.data.reduce((acc: any, curr: any) => {
      const index = acc.findIndex((i: any) => i.name === curr[prop]);

      if (index >= 0) {
        acc[index].value += 1;
      } else {
        const obj = { name: curr[prop], value: 1 };
        acc.push(obj);
      }

      return acc;
    }, []);
  }
}
