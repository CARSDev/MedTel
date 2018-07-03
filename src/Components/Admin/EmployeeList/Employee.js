import React from 'react'
import './Employee.css'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'

export default (props) => {
    const { employee } = props
    return (
        <div className='employee' >
            <div className='icons' >
                <Edit style={{
                    color: '#5A5A5A'
                }}/>
                <Delete style={{
                    color: '#5A5A5A'
                }}/>
            </div>
            <div className = "tableCell"><img className="empPic2" src={employee.employee_picture ? employee.employee_picture : 'http://www.navchetanhospital.com/wp-content/uploads/2015/02/noprofile.gif'} alt="" /></div>
            <div className="tableCell"><h3 className="empid">{employee.employee_id}</h3></div>
            <div className="tableCell"><h3 className="empName">{employee.employee_full_name}</h3></div>
            <div className="tableCell"><a href={`mailto:${employee.employee_email}`}><h3 className="empEmail">{employee.employee_email}</h3></a></div>
        </div>
    )
}
