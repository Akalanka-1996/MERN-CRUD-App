import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateAppointment extends Component {
    constructor(props) {
        super(props);

        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            fullname: '',
            age: '',
            contact: '',
            gender: '',
            description: '',
            date: '',
            appointment: []

        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/appointments/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeFullName(e) {
        this.setState({
            fullname: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        })
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const appointment = {
            fullname: this.state.fullname,
            age: this.state.age,
            contact: this.state.contact,
            gender: this.state.gender,
            description: this.state.description,
            date: this.state.date

        }

        console.log(appointment);

        axios.post('http://localhost:5000/appointments/add-appointment', appointment)
            .then(res => console.log(res.data));
        
        window.location = '/';
            

        
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Full Name </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your Full Name"
                            required
                            value={this.state.username}
                            onChange={this.onChangeFullName}
                        />
                        
                    </div>
                    <div className="form-group">
                        <label>Age </label>
                        <input type="text"
                            required
                            className="form-control"
                            placeholder="Enter your age"
                            value={this.state.age}
                            onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Number </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.contact}
                            onChange={this.onChangeContact}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeGender}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}