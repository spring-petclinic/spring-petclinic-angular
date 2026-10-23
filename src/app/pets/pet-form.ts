import {maxLength, minLength, pattern, required, schema} from '@angular/forms/signals';
import type {Moment} from 'moment';

/**
 * Fields edited by the pet add and edit forms.
 * The birth date is a string when loaded from the server and a Moment once picked in the datepicker.
 * The type is the id of the selected pet type, as the native select only handles strings.
 */
export interface PetFormModel {
  name: string;
  birthDate: string | Moment | null;
  typeId: string;
}

/** Validation rules shared by the pet add and edit forms. */
export const petSchema = schema<PetFormModel>(path => {
  required(path.name);
  minLength(path.name, 1);
  maxLength(path.name, 30);
  pattern(path.name, /^[A-Za-z0-9].{0,29}$/);
  required(path.birthDate);
  required(path.typeId);
});
