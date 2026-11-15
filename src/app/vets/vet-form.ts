import {maxLength, minLength, pattern, required, schema} from '@angular/forms/signals';

/** Validation rules of the vet first and last names, with the given minimum length. */
export const vetNamesSchema = (minNameLength: number) =>
  schema<{ firstName: string; lastName: string }>(path => {
    for (const name of [path.firstName, path.lastName]) {
      required(name);
      minLength(name, minNameLength);
      maxLength(name, 30);
    }
    pattern(path.firstName, /^[\p{L}]+([ '-][\p{L}]+){0,2}$/u);
    pattern(path.lastName, /^[\p{L}]+([ '-][\p{L}]+){0,2}\.?$/u);
  });
