import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../../../../models/entities/pokemon';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form: FormGroup;

  private formFields = {
    height: [this.pokemon.height, [Validators.required]],
    description: [this.pokemon.description, [Validators.required]],
    imgUrl: [this.pokemon.imgUrl, [Validators.required]],
    name: [this.pokemon.name, [Validators.required]],
    type: [this.pokemon.type, [Validators.required]],
    weight: [this.pokemon.weight, [Validators.required]],
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent, Pokemon>,
    @Inject(MAT_DIALOG_DATA) private readonly pokemon: Pokemon
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group(this.formFields);
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.pokemon, ...this.form.value });
  }
}
