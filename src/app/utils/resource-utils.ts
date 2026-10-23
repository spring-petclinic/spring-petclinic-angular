import {Resource} from '@angular/core';

/**
 * Current value of a resource, or the given fallback while it has none (loading, idle or in error).
 * Reading `value()` directly would throw when the resource is in error.
 */
export function valueOrDefault<T>(resource: Resource<T | undefined>, fallback: T): T {
  return resource.hasValue() ? (resource.value() as T) : fallback;
}

/**
 * Message of the error of a resource, or undefined when it has none.
 * The HTTP error handler throws plain strings: the resource wraps them in an error whose cause is the original value.
 */
export function resourceErrorMessage(resource: Resource<unknown>): string | undefined {
  const error = resource.error();
  if (!error) {
    return undefined;
  }
  return String((error as {cause?: unknown}).cause ?? error.message);
}
