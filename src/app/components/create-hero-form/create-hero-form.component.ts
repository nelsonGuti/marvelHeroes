import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-hero-form',
  templateUrl: './create-hero-form.component.html',
  styleUrls: ['./create-hero-form.component.scss'],
})
export class CreateHeroFormComponent {
  heroForm = new FormGroup({
    nameLabel: new FormControl('', Validators.required),
    occupationLabel: new FormControl('', Validators.required),
    skillsLabel: new FormControl('', Validators.required),
    creatorLabel: new FormControl('', Validators.required),
    citizenshipLabel: new FormControl('', Validators.required),
    memberOfLabel: new FormControl('', Validators.required),
    genderLabel: new FormControl('', Validators.required),
  });
}
