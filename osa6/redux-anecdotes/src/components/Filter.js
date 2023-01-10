import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        const filterContent = event.target.value.trim()
        props.setFilter(filterContent)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = { setFilter }

export default connect(
    null,
    mapDispatchToProps
)(Filter)