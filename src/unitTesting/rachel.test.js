let axios = require('axios');

describe('Conditions component test', () => {
    test('the conditions data contains condition id', () => {
        axios.get(`/conditions`).then(res => {
            expect(res.data).toContain('condition_id')
        });
    });
    test('the conditions data has', () => {
        axios.get(`/conditions`).then(res => {
            expect(res.data.condition_id).toBeDefined();
        });
    });
    test('the data contains condition name', () => {
        axios.get(`/conditions`).then(res => {
            expect(res.data).to();
        });
    });
    test('conditions array does not contain null', () => {
        const expected = [null];
        axios.get(`/conditions`).then(res => {
            it('matches if the array does not contain nulls', () => {
                expect(res.data).toEqual(expect.not.arrayContaining(expected));
            });
        });
    });
    test('the family history data contains condition id', () => {
        axios.get(`/allergies`).then(res => {
            expect(res.data).toContain('allergy_id')
        });
    });
});