import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        const newAnecdote = await anecdoteService.createAnecdote(anecdote)
        dispatch(createAnecdote(newAnecdote))
        event.target.anecdote.value = ''

        dispatch(setNotification(`You added: ${newAnecdote.content}`))
        setTimeout(() => dispatch(setNotification(``)), 5000)
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

export default AnecdoteForm
