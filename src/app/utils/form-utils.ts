import {requiredError, SchemaPath, validate} from '@angular/forms/signals';

/**
 * Reports a required error on a value made only of whitespace.
 * An empty value is left to required(), which already reports it.
 */
export function notBlank(path: SchemaPath<string>): void {
  validate(path, ({value}) => (value().length > 0 && value().trim() === '' ? requiredError() : undefined));
}
