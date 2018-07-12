let schedule = [
    {
        patient_full_name: "Jonathan Smith",
        patient_id: 2,
        patient_visit_date: "2018-07-05T20:00:00.000Z",
        patient_visit_id: 47,
        patient_visit_reason: "My Price Flights"
    }, {
        patient_full_name: "Jonathan Smith",
        patient_id: 2,
        patient_visit_date: "2018-07-05T18:00:00.000Z",
        patient_visit_id: 42,
        patient_visit_reason: "Pocahontas"
    }, {
        patient_full_name: "Becky Johnson",
        patient_id: 4,
        patient_visit_date: "2018-07-05T20:30:00.000Z",
        patient_visit_id: 48,
        patient_visit_reason: "Auth Lecture Week 5"
    }, {
        patient_full_name: "Becky Johnson",
        patient_id: 4,
        patient_visit_date: "2018-07-05T17:30:00.000Z",
        patient_visit_id: 41,
        patient_visit_reason: "asdlfkjas;dfklja;s"
    }, {
        patient_full_name: "How about Now?",
        patient_id: 7,
        patient_visit_date: "2018-07-05T14:00:00.000Z",
        patient_visit_id: 52,
        patient_visit_reason: "asdfljasdfalsk"
    }
]

let employees = [
    { employee_id: 1, company_id: 1, employee_full_name: "Juan Sanchez", employee_first_name: "Juan", employee_last_name: "Sanchez" ,employee_hashed_password:null},
    { employee_id: 2, company_id: 1, employee_full_name: "Donna Schmiphflingherr", employee_first_name: "Donna", employee_last_name: "Schmiphflingherr" ,employee_hashed_password:null},
    { employee_id: 3, company_id: 1, employee_full_name: "Shannon Adair", employee_first_name: "Shannon", employee_last_name: "Adair" ,employee_hashed_password:null},
    { employee_id: 4, company_id: 1, employee_full_name: "Rachel K Hicken", employee_first_name: "Rachel K", employee_last_name: "Hicken" ,employee_hashed_password:null},
    { employee_id: 5, company_id: 1, employee_full_name: "Cameron Nye", employee_first_name: "Cameron", employee_last_name: "Nye" ,employee_hashed_password:null},
    { employee_id: 6, company_id: 1, employee_full_name: "Drew Bloomfield", employee_first_name: "Drew", employee_last_name: "Bloomfield" ,employee_hashed_password:null},
    { employee_id: 8, company_id: 1, employee_full_name: "Saphira Elfslayer", employee_first_name: "Saphira", employee_last_name: "Elfslayer",employee_hashed_password:null}
]

module.exports = {
    
    thirdPtName(){
        if (schedule[2].patient_full_name) {
            return true
        } else {
            return false
        }
    },

    dateIncludes() {
        if (schedule[0].patient_visit_date.includes('2018-07-05')) {
            return true
        } else {
            return false
        }
    },

    employeeNames() {
        if (employees.length > 0) {
            if (employees[0].employee_full_name) {
                return true
            }else return false
        } else return true
    },

    employeeIds() {
        if (employees.length > 0) {
            if (employees[0].employee_id) {
                return true
            } else return false
        } else return true
    },

    noPassword() {
        for (i = 0; i < employees.length; i++){
            if (employees[i].employee_hashed_password) {
                return true
            }
        } return false
    }

}
