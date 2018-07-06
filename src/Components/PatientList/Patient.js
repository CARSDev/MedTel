import React from 'react'
import { Link } from 'react-router-dom';
import './Patient.css'

export default function Patient (props) {
    let {val} = props
    return (
    <div  className='onePtInfo'>
            <Link to={`/dashboard/${val.patient_id}`} >
                <div className='patient'>

                <div className="tableCell"><h3 className="ptID">{val.patient_id}</h3></div>
                <div className="tableCell"><h3 className="ptName">{val.patient_full_name}</h3></div>
                <div className="tableCell"><h3 className="ptPhone">{val.patient_phone_number}</h3></div>
                <div className="tableCell"><h3 className="ptEmail">{val.patient_email}</h3></div>    
                </div>
          </Link>
    </div>
  )
}
