import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Schedule from './Components/Schedule/Schedule'
import PatientList from './Components/PatientList/PatientList'
import Dashboard from './Components/Dashboard/Dashboard'
import Admin from './Components/Admin/Admin'

const routes = (
    <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/schedule' component={Schedule} />
        <Route path='/patients' component={PatientList} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/admin' component={Admin} />
    </Switch>
)

export default routes