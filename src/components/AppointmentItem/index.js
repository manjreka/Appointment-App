import './index.css'

const AppointmentItem = props => {
  const {details, toggleIsFavorite} = props
  const {id, title, date, isFavorite} = details

  const buttonClicked = () => {
    console.log('button clicked')
    toggleIsFavorite(id)
  }

  const URL = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="content">
        <div className="header">
          <p>{title}</p>
          <button type="button" className="button" onClick={buttonClicked}>
            <img src={URL} alt="star" />
          </button>
        </div>
        <div className="footer">
          <p>{date}</p>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItem
