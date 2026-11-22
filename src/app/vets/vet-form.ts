import {maxLength, minLength, pattern, required, schema} from '@angular/forms/signals';

/** Validation rules shared by the vet add and edit forms. */
export const vetNamesSchema = schema<{ firstName: string; lastName: string }>(path => {
  for (const name of [path.firstName, path.lastName]) {
    required(name);
    minLength(name, 1);
    maxLength(name, 30);
  }
  pattern(path.firstName, /^[\p{L}]+([ '-][\p{L}]+){0,2}$/u);
  pattern(path.lastName, /^[\p{L}]+([ '-][\p{L}]+){0,2}\.?$/u);
});
