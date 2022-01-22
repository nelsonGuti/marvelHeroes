import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateHeroFormComponent } from '../create-hero-form/create-hero-form.component';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Hero } from '../hero-card/hero.model';

import DATA from './../../data/wikipedia_marvel_data.json';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource = new MatTableDataSource(DATA as Hero[]);
  displayedColumns = [
    'nameLabel',
    'creatorLabel',
    'genderLabel',
    'memberOfLabel',
    'citizenshipLabel',
    'occupationLabel',
    'skillsLabel',
  ];

  chipsList = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.filterPredicate;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
  }

  filterPredicate(record: Hero, filter: string) {
    const wordsToFilterBy = JSON.parse(filter);
    const isMatch = !wordsToFilterBy.length
      ? true
      : wordsToFilterBy.includes(record.nameLabel.trim().toLowerCase());
    return isMatch;
  }

  filterHeroes(heroes: string[]) {
    if (heroes.length) {
      this.dataSource.filter = JSON.stringify(heroes);
    } else {
      this.dataSource.filter = '';
    }
  }

  clickedRow(row: any) {
    const dialogRef = this.dialog.open(HeroCardComponent, {
      width: '650px',
      data: { row },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }

  createHero() {
    const dialogRef = this.dialog.open(CreateHeroFormComponent, {
      width: '550px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (dialogRef.componentInstance.heroForm.status === 'VALID') {
        const newHero = dialogRef.componentInstance.heroForm.value;
        this.dataSource.data.unshift(newHero as Hero);
        this.dataSource.filter = ''; // Refresh table
      }
    });
  }
}
