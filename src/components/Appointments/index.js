import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    favoriteAppointList: [],
    backupappointList: [],
    status: true,
  }

  onChangeTitleEl = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateEl = event => {
    const dateInput = event.target.value

    const dateFormat = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    this.setState({date: dateFormat})
  }

  onSubmittingForm = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
    }

    this.setState(prevState => ({
      backupappointList: [...prevState.appointmentList, newAppointment],
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachContact => {
        if (id === eachContact.id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))
  }

  starredButtonClicked = () => {
    const {appointmentList} = this.state

    const filteredList = appointmentList.filter(
      each => each.isFavorite === true,
    )
    console.log(filteredList)

    this.setState({
      backupappointList: appointmentList,
      appointmentList: filteredList,
      favoriteAppointList: filteredList,
    })
    this.setState(prevState => ({status: !prevState.status}))
  }

  starredButtonClickedOriginal = () => {
    const {backupappointList} = this.state
    this.setState({appointmentList: backupappointList})
    this.setState(prevState => ({status: !prevState.status}))
  }

  render() {
    const {appointmentList, status} = this.state

    return (
      <div className="bg-container">
        <div className="sub-container">
          <div className="header">
            <form
              className="content-container"
              onSubmit={this.onSubmittingForm}
            >
              <h1>Add Appointments</h1>
              <div className="title">
                <label htmlFor="title-label">Title</label>
                <input
                  id="title-label"
                  type="text"
                  onChange={this.onChangeTitleEl}
                />
              </div>
              <div className="date">
                <label htmlFor="date-label">Date</label>
                <input
                  type="date"
                  id="date-label"
                  onChange={this.onChangeDateEl}
                />
              </div>
              <div className="addButton">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="horizontal" />
          <div className="footer">
            <h1> Appointments </h1>
            <div>
              {status ? (
                <button type="button" onClick={this.starredButtonClicked}>
                  Starred
                </button>
              ) : (
                <button
                  type="button"
                  onClick={this.starredButtonClickedOriginal}
                >
                  Starred
                </button>
              )}
            </div>
          </div>
          <ul className="unorderedList">
            {appointmentList.map(each => (
              <AppointmentItem
                details={each}
                key={each.id}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
