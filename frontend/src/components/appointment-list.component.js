import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointment = props => (
    <tr>
      <td>{props.appointment.fullname}</td>
      <td>{props.appointment.age}</td>
      <td>{props.appointment.contact}</td>
      <td>{props.appointment.gender}</td>
      <td>{props.appointment. description}</td>
      <td>{props.appointment.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.appointment._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAppointment(props.appointment._id) }}>delete</a>
      </td>
    </tr>
  )

export default class AppointmentList extends Component {
    constructor(props) {
        super(props);

        this.deleteAppointment = this.deleteAppointment.bind(this);

        this.state = { appointments: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/appointments/')
            .then(response => {
                this.setState({ appointments: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteAppointment(id) {
        axios.delete('http://localhost:5000/appointments/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            appointments: this.state.appointments.filter(el => el._id !== id)
        })
    }

    appointmentList() {
        return this.state.appointments.map(currentappointment => {
          return <Appointment appointment={currentappointment} deleteAppointment={this.deleteAppointment} key={currentappointment._id}/>;
        })
      }

    render() {
        return (
            <div>
                <h3>Logged Appointments</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Full Name</th>
                            <th>Age</th>
                            <th>Contact Number</th>
                            <th>Gender</th>
                            <th>Description</th>
                            <th>Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.appointmentList()}
                    </tbody>
                </table>
            </div>
        )
    }
}