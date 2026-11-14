import {maxLength, minLength, pattern, required, schema, validate} from '@angular/forms/signals';
import moment from 'moment';
import type {Moment} from 'moment';

/** Oldest age allowed for a pet, as enforced by the REST backend (@PetAgeValidation). */
export const MAX_PET_AGE_YEARS = 50;

/** Latest allowed birth date: today. */
export function maxBirthDate(): Moment {
  return moment().startOf('day');
}

/** Earliest allowed birth date: 50 years ago. */
export function minBirthDate(): Moment {
  return maxBirthDate().subtract(MAX_PET_AGE_YEARS, 'years');
}

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
  validate(path.birthDate, ({value}) => {
    const birthDate = value();
    if (!birthDate) {
      return undefined;
    }
    const date = moment(birthDate);
    if (!date.isValid()) {
      return undefined;
    }
    if (date.isAfter(maxBirthDate(), 'day')) {
      return {kind: 'futureBirthDate'};
    }
    if (date.isBefore(minBirthDate(), 'day')) {
      return {kind: 'tooOldBirthDate'};
    }
    return undefined;
  });
  required(path.typeId);
});
