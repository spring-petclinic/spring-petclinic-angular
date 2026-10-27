import {maxLength, minLength, required, schema} from '@angular/forms/signals';
import type {Moment} from 'moment';
import {notBlank} from '../utils/form-utils';

/**
 * Fields edited by the visit add and edit forms.
 * The date is a string when loaded from the server and a Moment once picked in the datepicker.
 */
export interface VisitFormModel {
  date: string | Moment | null;
  description: string;
}

/** Validation rules shared by the visit add and edit forms. */
export const visitSchema = schema<VisitFormModel>(path => {
  required(path.date);
  required(path.description);
  notBlank(path.description);
  minLength(path.description, 1);
  maxLength(path.description, 255);
});
