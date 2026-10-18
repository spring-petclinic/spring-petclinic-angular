import {ApplicationRef, resource} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {resourceErrorMessage, valueOrDefault} from './resource-utils';

describe('valueOrDefault', () => {
  it('should return the fallback while the resource is idle', () => {
    const idle = TestBed.runInInjectionContext(() => resource({
      params: () => undefined,
      loader: async () => 'loaded'
    }));
    expect(valueOrDefault(idle, 'fallback')).toBe('fallback');
  });

  it('should return the loaded value', async () => {
    const loaded = TestBed.runInInjectionContext(() => resource({
      loader: async () => 'loaded'
    }));
    await TestBed.inject(ApplicationRef).whenStable();
    expect(valueOrDefault(loaded, 'fallback')).toBe('loaded');
  });

  it('should return the fallback instead of throwing when the resource is in error', async () => {
    const failing = TestBed.runInInjectionContext(() => resource({
      loader: async (): Promise<string> => {
        throw new Error('boom');
      }
    }));
    await TestBed.inject(ApplicationRef).whenStable();
    expect(failing.error()).toBeTruthy();
    expect(valueOrDefault(failing, 'fallback')).toBe('fallback');
  });

  it('should expose the original error thrown as a plain string', async () => {
    const failing = TestBed.runInInjectionContext(() => resource({
      loader: async (): Promise<string> => {
        throw 'server returned code 404';
      }
    }));
    await TestBed.inject(ApplicationRef).whenStable();
    expect(resourceErrorMessage(failing)).toBe('server returned code 404');
  });

  it('should have no error message while the resource is healthy', () => {
    const idle = TestBed.runInInjectionContext(() => resource({
      params: () => undefined,
      loader: async () => 'loaded'
    }));
    expect(resourceErrorMessage(idle)).toBeUndefined();
  });
});
