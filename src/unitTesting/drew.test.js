const fns = require('./drew.js')

test('time converts', () => {
    //arrange and act
    let result = fns.convertTime(new Date())
    
    //assert
    expect(result).toBeTruthy()
})

test('data manipulation is working', () => {
    let result = fns.handleData()
    expect(result).toBeTruthy()
})

test('filtering is working', () => {
    let result = fns.handleData2()
    expect(result).toBeTruthy()
})

test('data is unique', () => {
    let result = fns.handleData3()
    expect(result).toBeTruthy()
})

test('can produce imaging tests only', () => {
    let result = fns.findImaging()
    expect(result).toBeTruthy()
})

