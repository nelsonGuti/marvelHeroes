import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-hero-form',
  templateUrl: './create-hero-form.component.html',
  styleUrls: ['./create-hero-form.component.scss'],
})
export class CreateHeroFormComponent implements OnInit {
  editMode = false;
  heroForm = new FormGroup({
    nameLabel: new FormControl('', Validators.required),
    occupationLabel: new FormControl('', Validators.required),
    skillsLabel: new FormControl('', Validators.required),
    creatorLabel: new FormControl('', Validators.required),
    citizenshipLabel: new FormControl('', Validators.required),
    memberOfLabel: new FormControl('', Validators.required),
    genderLabel: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if (this.data?.hero) {
      this.editMode = true;
      this.heroForm.setValue(this.data.hero);
    }
  }
}
