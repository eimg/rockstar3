var convert = require('./convert');

test('Traditional to imperial', () => {
    expect( convert.traditionalToImperial(1) ).toBe('3.6 lbs in 1 peittha');
    expect( convert.traditionalToImperial('2') ).toBe('7.2 lbs in 2 peittha');
});

test('Imperial to traditional', () => {
    expect( convert.imperialToTraditional(5) ).toBe('1 peittha and 39 kyattha in 5 lbs');
});
