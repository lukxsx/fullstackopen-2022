import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    const addAnecdote = async event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        props.createAnecdote(anecdote)
        event.target.anecdote.value = ''

        props.setNotification(`You added: ${anecdote}`, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
