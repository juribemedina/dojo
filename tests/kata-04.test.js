const { expand } = require('../katas/kata-04-binomial-expansion')

test('kata-04 Should correctly expand binomials where a=1 and b is positive', () => {
    expect(expand('(x+1)^0')).toBe('1')
    expect(expand('(x+1)^1')).toBe('x+1')
    expect(expand('(x+1)^2')).toBe('x^2+2x+1')
})

test('kata-04 Should correctly expand binomials where a=1 and b is negative', () => {
    expect(expand('(x-1)^0')).toBe('1')
    expect(expand('(x-1)^1')).toBe('x-1')
    expect(expand('(x-1)^2')).toBe('x^2-2x+1')
})

test('kata-04 Should correctly expand binomials where a is positive.', () => {
    expect(expand('(5m+3)^4')).toBe('625m^4+1500m^3+1350m^2+540m+81')
    expect(expand('(2x-3)^3')).toBe('8x^3-36x^2+54x-27')
    expect(expand('(7x-7)^0')).toBe('1')
})

test('kata-04 Should correctly expand binomials where a is negative.', () => {
    expect(expand('(-5m+3)^4')).toBe('625m^4-1500m^3+1350m^2-540m+81')
    expect(expand('(-2k-3)^3')).toBe('-8k^3-36k^2-54k-27')
    expect(expand('(-7x-7)^0')).toBe('1')
})

test('kata-04 (x+1)^2', () => {
    expect(expand('(x+1)^2')).toBe('x^2+2x+1')
})

test('kata-04 (p-1)^3', () => {
    expect(expand('(p-1)^3')).toBe('p^3-3p^2+3p-1')
})

test('kata-04 (2f+4)^6', () => {
    expect(expand('(2f+4)^6')).toBe('64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096')
})

test('kata-04 (-2a-4)^0', () => {
    expect(expand('(-2a-4)^0')).toBe('1')
})

test('kata-04 (-12t+43)^2', () => {
    expect(expand('(-12t+43)^2')).toBe('144t^2-1032t+1849')
})

test('kata-04 (r+0)^203', () => {
    expect(expand('(r+0)^203')).toBe('r^203')
})

test('kata-04 (-x-1)^2', () => {
    expect(expand('(-x-1)^2')).toBe('x^2+2x+1')
})



