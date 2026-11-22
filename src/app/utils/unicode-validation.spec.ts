import { Injector, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, Schema } from '@angular/forms/signals';

import { ownerSchema, emptyOwnerForm } from '../owners/owner-form';
import { vetNamesSchema } from '../vets/vet-form';
import { specialtySchema } from '../specialties/specialty-form';
import { pettypeSchema } from '../pettypes/pettype-form';
import { petSchema } from '../pets/pet-form';

describe('Unicode-aware validation patterns', () => {
    let injector: Injector;

    beforeEach(() => {
        injector = TestBed.inject(Injector);
    });

    function hasPatternError<T>(model: T, schema: Schema<T>, field: keyof T): boolean {
        const f = form(signal(model), schema, { injector });
        return (f as any)[field]().errors().some((e: { kind: string }) => e.kind === 'pattern');
    }

    const personNames = (schema: (model: any) => boolean, valid: string[], invalid: string[]) => {
        valid.forEach(v => expect(schema(v), v).toBe(false));
        invalid.forEach(v => expect(schema(v), v).toBe(true));
    };

    const validFirstNames = ['George', 'Éloïse', 'José', 'Zoë', 'Иван', 'Αλέξανδρος', 'Jean-Pierre', 'O\'Brien', 'Anna Maria', 'Jean-Pierre de'];
    const invalidFirstNames = ['George1', 'Jean_Pierre', ' George', 'George ', '-George', 'a b c d', 'George.', 'Geo<b>', 'Jean--Pierre'];
    const validLastNames = ['Franklin', 'O\'Connor', 'De La Cruz', 'Müller', 'Ковалёв', 'Smith.', 'Garcia-Lopez'];
    const invalidLastNames = ['Franklin2', 'Smith..', 'Smith!', '.Smith', 'a b c d'];

    it('should validate the owner names', () => {
        const owner = (field: 'firstName' | 'lastName') => (v: string) =>
            hasPatternError({ ...emptyOwnerForm(), [field]: v }, ownerSchema, field);
        personNames(owner('firstName'), validFirstNames, invalidFirstNames);
        personNames(owner('lastName'), validLastNames, invalidLastNames);
    });

    it('should validate the vet names', () => {
        const vet = (field: 'firstName' | 'lastName') => (v: string) =>
            hasPatternError({ firstName: 'James', lastName: 'Carter', [field]: v }, vetNamesSchema, field);
        personNames(vet('firstName'), validFirstNames, invalidFirstNames);
        personNames(vet('lastName'), validLastNames, invalidLastNames);
    });

    it('should validate the specialty name', () => {
        const check = (v: string) => hasPatternError({ name: v }, specialtySchema, 'name');
        personNames(check, ['dentistry', 'écologie', 'Хирургия', 'radiology & imaging', 'surgery-care', 'Pediatrics/Neonatology'],
            ['1surgery', 'surgery!!!', 'cat<script>', '-surgery', ' surgery', 'surgery\u0000']);
    });

    it('should validate the pet type name', () => {
        const check = (v: string) => hasPatternError({ name: v }, pettypeSchema, 'name');
        personNames(check, ['cat', 'Éclair', 'Хомяк', 'guinea pig', 'dog\'s friend', 'sea-lion'],
            ['1cat', 'cat!!!', 'cat<script>', '-cat', 'cat & dog', 'cat/dog']);
    });

    it('should not restrict the pet name characters, as the REST backend only enforces its length', () => {
        const check = (v: string) =>
            hasPatternError({ name: v, birthDate: null, typeId: '' }, petSchema, 'name');
        ['Leo', 'Éclair', 'Бобик', 'D\'Artagnan', 'R2-D2', '1Leo', 'Mr. Bean'].forEach(v => expect(check(v), v).toBe(false));
    });
});
