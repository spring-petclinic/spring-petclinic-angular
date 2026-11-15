import {maxLength, minLength, pattern, required, schema} from '@angular/forms/signals';

/** Validation rules shared by the specialty add and edit forms. */
export const specialtySchema = schema<{ name: string }>(path => {
  required(path.name);
  minLength(path.name, 1);
  maxLength(path.name, 80);
  pattern(path.name, /^[\p{L}][\p{L}\s\-&/]{0,79}$/u);
});
