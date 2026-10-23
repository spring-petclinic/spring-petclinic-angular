import {maxLength, minLength, pattern, required, schema} from '@angular/forms/signals';
import {notBlank} from '../utils/form-utils';

/** Fields edited by the owner add and edit forms. */
export interface OwnerFormModel {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
}

export const emptyOwnerForm = (): OwnerFormModel => ({firstName: '', lastName: '', address: '', city: '', telephone: ''});

/** Validation rules shared by the owner add and edit forms. */
export const ownerSchema = schema<OwnerFormModel>(path => {
  required(path.firstName);
  minLength(path.firstName, 1);
  maxLength(path.firstName, 30);
  pattern(path.firstName, /^[a-zA-Z]*$/);

  required(path.lastName);
  minLength(path.lastName, 1);
  maxLength(path.lastName, 30);
  pattern(path.lastName, /^[a-zA-Z]*$/);

  required(path.address);
  notBlank(path.address);
  maxLength(path.address, 255);

  required(path.city);
  notBlank(path.city);
  maxLength(path.city, 80);

  required(path.telephone);
  pattern(path.telephone, /^[0-9]*$/);
  minLength(path.telephone, 10);
  maxLength(path.telephone, 10);
});
