const moment = require('moment')
const _ = require('lodash')

let results = [
    {
        is_imaging: false,
        lab_date: "2018-07-02T01:15:59.782Z",
        lab_results: 55,
        lab_result_id: 3,
        patient_id: 1,
        test_id: 1,
        test_name: 'height in inches'
    },
    {
        is_imaging: false,
        lab_date: "2018-07-01T01:15:59.782Z",
        lab_results: 55,
        lab_result_id: 3,
        patient_id: 1,
        test_id: 1,
        test_name: 'height in inches'
    },
    {
        is_imaging: false,
        lab_date: "2018-07-02T01:15:59.782Z",
        lab_results: 100,
        lab_result_id: 3,
        patient_id: 1,
        test_id: 2,
        test_name: 'weight in pounds'
    },
    {
        is_imaging: false,
        lab_date: "2018-07-01T01:15:59.782Z",
        lab_results: 100,
        lab_result_id: 3,
        patient_id: 1,
        test_id: 2,
        test_name: 'weight in pounds'
    },
    {
        is_imaging: true,
        lab_date: "2018-07-01T01:15:59.782Z",
        lab_results: 100,
        lab_result_id: 3,
        patient_id: 1,
        test_id: 3,
        test_name: 'imaging'
    },
]

module.exports = {
    convertTime(time) {
        let here = moment(time)
        let there = moment.utc(time)
        if (here == there) {
            return false
        } else {
            return true
        }
    },

    handleData() {
        let tests = _.uniq(results.map(x => x.test_id))
        if (tests.length === 3) {
            return true
        } else {
            return false
        }
    },

    handleData2() {
        let tests = _.uniq(results.map(x => x.test_id))
        let individualTests = tests.map((test, i) => {
            let data = results.filter(x => x.test_id === test)
            return (
                data
            )
        })
        if (individualTests.length > 1) {
            return true
        } else {
            return false
        }
    },

    handleData3() {
        let tests = _.uniq(results.map(x => x.test_id))
        let individualTests = tests.map((test, i) => {
            let data = results.filter(x => x.test_id === test)
            return (
                data
            )
        })
        if (individualTests[0] == individualTests[1]) {
            return false
        } else {
            return true
        }
    },

    findImaging(){
        let imaging = results.filter(test => test.is_imaging === true)
        if (imaging.length === 1) {
            return true
        } else {
            return false
        }
    }
}
