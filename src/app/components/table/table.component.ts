import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartsService, HeroProps } from 'src/app/services/charts.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CreateHeroFormComponent } from '../create-hero-form/create-hero-form.component';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Hero } from '../hero-card/hero.model';

import DATA from './../../data/wikipedia_marvel_data.json';

const DATA_KEY = 'marvel_heroes_data';
function filterPredicate(record: Hero, filter: string) {
  const wordsToFilterBy = JSON.parse(filter);
  const isMatch = !wordsToFilterBy.length
    ? true
    : wordsToFilterBy.includes(record.nameLabel.trim().toLowerCase());
  return isMatch;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  genderData = [];
  creatorData = [];
  memberOfData = [];
  citizenshipData = [];
  skillsData = [];
  occupationData = [];

  // chart config options
  view: [number, number] = [200, 200];
  gradient = true;
  showLabels = true;
  cardColor = '#efe8e7';

  dataSource = new MatTableDataSource([] as Hero[]);
  displayedColumns = [
    'nameLabel',
    'creatorLabel',
    'genderLabel',
    'memberOfLabel',
    'citizenshipLabel',
    'occupationLabel',
    'skillsLabel',
    'delete',
    'edit',
  ];

  chipsList = [];

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private chartsService: ChartsService
  ) {}

  ngOnInit(): void {
    this.initializeDataSource();
    this.updateCharts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  initializeDataSource() {
    let data = this.localStorageService.getItem(DATA_KEY);

    if (data == null) {
      this.localStorageService.setItem(DATA_KEY, JSON.stringify(DATA));
      data = this.localStorageService.getItem(DATA_KEY);
    }

    this.dataSource = new MatTableDataSource(JSON.parse(data || ''));
    this.dataSource.filterPredicate = filterPredicate;
  }

  updateCharts() {
    this.genderData = this.chartsService.wrangleData(
      this.dataSource,
      HeroProps.GENDER
    );

    this.creatorData = this.chartsService.wrangleData(
      this.dataSource,
      HeroProps.CREATOR
    );

    this.memberOfData = this.chartsService.wrangleData(
      this.dataSource,
      HeroProps.MEMBER_OF
    );

    this.citizenshipData = this.chartsService.wrangleData(
      this.dataSource,
      HeroProps.CITIZENSHIP
    );

    this.skillsData = this.chartsService.wrangleData(
      this.dataSource,
      HeroProps.SKILS
    );

    this.occupationData = this.chartsService.wrangleData(
      this.dataSource,
      HeroProps.OCCUPATION
    );
  }

  filterHeroes(heroes: string[]) {
    if (heroes.length) {
      this.dataSource.filter = JSON.stringify(heroes);
    } else {
      this.dataSource.filter = '';
    }
  }

  clickedRow(row: any) {
    this.dialog.open(HeroCardComponent, {
      width: '650px',
      data: { row },
    });
  }

  createHero() {
    const dialogRef = this.dialog.open(CreateHeroFormComponent, {
      width: '550px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((actionType: string) => {
      if (
        actionType === 'submit' &&
        dialogRef.componentInstance.heroForm.status === 'VALID'
      ) {
        const newHero = dialogRef.componentInstance.heroForm.value;

        this.dataSource.data.unshift(newHero as Hero);
        this.dataSource.data = [...this.dataSource.data];

        this.localStorageService.setItem(
          DATA_KEY,
          JSON.stringify(this.dataSource.data)
        );

        this.updateCharts();
      }
    });
  }

  removeHero(event: Event, name: string) {
    event.preventDefault();
    event.stopPropagation();

    this.dataSource.data = this.dataSource.data.filter(
      ({ nameLabel }) => nameLabel !== name
    );

    this.localStorageService.setItem(
      DATA_KEY,
      JSON.stringify(this.dataSource.data)
    );

    this.updateCharts();
  }

  editHero(event: Event, hero: Hero) {
    const index = this.dataSource.data.findIndex(
      ({ nameLabel }) => nameLabel === hero.nameLabel
    );

    event.preventDefault();
    event.stopPropagation();

    const dialogRef = this.dialog.open(CreateHeroFormComponent, {
      width: '650px',
      data: { hero },
    });

    dialogRef.afterClosed().subscribe((actionType: string) => {
      if (
        actionType === 'submit' &&
        dialogRef.componentInstance.heroForm.status === 'VALID'
      ) {
        const hero = dialogRef.componentInstance.heroForm.value;

        this.dataSource.data[index] = hero;
        this.dataSource.data = [...this.dataSource.data];

        this.localStorageService.setItem(
          DATA_KEY,
          JSON.stringify(this.dataSource.data)
        );
        this.updateCharts();
      }
    });
  }
}
