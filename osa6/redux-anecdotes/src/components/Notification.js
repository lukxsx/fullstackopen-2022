import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: props.notification === '' ? 'hidden': 'visible'
  }
  return (
      <div style={style}>
        {props.notification}
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message
  }
}
export default connect(
    mapStateToProps
)(Notification)