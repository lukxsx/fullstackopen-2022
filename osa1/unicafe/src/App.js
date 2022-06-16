import { useState } from 'react'

const Button = ({handleClick, text}) =>
    <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => {
    return (
        <tr>
        <td>{text}</td><td>{value}</td>
        </tr>
    )
}

const Stats = ({feedback}) => {
    const bad = feedback.bad
    const neutral = feedback.neutral
    const good = feedback.good
    const all = bad + neutral + good
    const avg = ((bad * -1) + good) / all
    const pos = good / all
    
    if (!(bad === 0 && neutral === 0 && good === 0)) {
    
        return (
            <table>
            <tbody>
                <StatisticLine text="Good: " value={good} />
                <StatisticLine text="Neutral: " value={neutral} />
                <StatisticLine text="Bad: " value={bad} />
                <StatisticLine text="All: " value={all} />
                <StatisticLine text="Avg: " value={avg} />
                <StatisticLine text="Pos: " value={pos} />
            </tbody>
            </table>
        )
    } else {
        return (<p>No feedback</p>)
    }
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
                <Button handleClick={addGood} text="Good" />
                <Button handleClick={addNeutral} text="Neutral" />
                <Button handleClick={addBad} text="Bad" />

            </div>
            <Stats feedback={feedback} />
        </div>
    )
}

export default App;
