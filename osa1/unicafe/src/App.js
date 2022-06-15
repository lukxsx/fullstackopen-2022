import { useState } from 'react'

const Button = ({handleClick, text}) =>
    <button onClick={handleClick}>{text}</button>

const Stats = ({feedback}) => {
    return (
        <div>
        <ul>
            <li>Bad: {feedback.bad}</li>
            <li>Neutral: {feedback.neutral}</li>
            <li>Good: {feedback.good}</li>
        </ul>
        </div>
    )
}

const App = () => {
    const [feedback, setFeedback] = useState({
        bad: 0, neutral: 0, good: 0})
    
    const addBad = () => {
        setFeedback({
            ...feedback,
            bad: feedback.bad + 1
        })
    }
    const addNeutral = () => {
        setFeedback({
            ...feedback,
            neutral: feedback.neutral + 1
        })
    }
    const addGood = () => {
        setFeedback({
            ...feedback,
            good: feedback.good + 1
        })
    }
    
    return (
        <div>
            <h1>Feedback</h1>
            <div>
                <Button handleClick={addBad} text="Bad" />
                <Button handleClick={addNeutral} text="Neutral" />
                <Button handleClick={addGood} text="Good" />
            </div>
            <Stats feedback={feedback} />
        </div>
    )
}

export default App;
