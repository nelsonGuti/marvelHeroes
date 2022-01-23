import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';

// Components
import { TableComponent } from './components/table/table.component';
import { ChipsInputComponent } from './components/chips-input/chips-input.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { CreateHeroFormComponent } from './components/create-hero-form/create-hero-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ChipsInputComponent,
    HeroCardComponent,
    CreateHeroFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    MatSortModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
