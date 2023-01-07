

const Notification = ({ message, warning }) => {
  if (message !== null) {
    return (
      <div
        style={{
          border: warning ? 'solid red' : 'solid green',
          color: warning ? 'red' : 'green',
          borderRadius: '10px',
          paddingLeft: '10px',
          paddingTop: '1px',
          paddingBottom: '1px'
        }}
      >
        <p>{message}</p>
      </div>
    )
  }
}

export default Notification
