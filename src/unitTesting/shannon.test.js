const fns = require('./shannon.js')

test('third patient has a name', () => {
    let result = fns.thirdPtName()
    expect(result).toBeTruthy()
})

test('correct date', () => {
    let result = fns.dateIncludes()
    expect(result).toBeTruthy()
})

test('employee names available', ()=> {
    let result = fns.employeeNames()
    expect(result).toBeTruthy()
})

test('employee ID received', () => {
    let result = fns.employeeIds()
    expect(result).toBeTruthy()
})

test('hashed passwords not sent to front end', () => {
    let result = fns.noPassword()
    expect(result).toBeFalsy()
})