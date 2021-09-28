import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import CreateAppointment from "./components/create-appointment.component";
import EditAppointment from "./components/edit-appoinment.component";
import AppointmentList from "./components/appointment-list.component";


function App() {
    return (
        <Router>
            <div className="container">
                <Route path="/" exact component={AppointmentList} />
                <Route path="/create" component={CreateAppointment}  />
                <Route path="/edit/:id" component={EditAppointment} />
            </div>
        </Router>
    )
}

export default App;