import { ComponentFixture } from '@angular/core/testing';

/** Types a value in the input matching the selector, as a user would. */
export async function setValue(fixture: ComponentFixture<unknown>, selector: string, value: string): Promise<void> {
    const input = fixture.nativeElement.querySelector(selector) as HTMLInputElement | HTMLSelectElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
}

/** Submits the form of the component. */
export async function submitForm(fixture: ComponentFixture<unknown>): Promise<void> {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();
}

export function submitButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button[type=submit]') as HTMLButtonElement;
}
