import React from 'react';

const App = props => {
    let input = React.createRef();

    let [ state, setState ] = React.useState([
        { _id: 1, subject: 'Apple', status: 0 },
        { _id: 2, subject: 'Orange', status: 1 }
    ]);

    const add = () => {
        let subject = input.current.value;

        setState([
            ...state,
            { _id: 3, subject, status: 0 }
        ]);
    }

    return (
        <div>
            <h1>React Hooks</h1>
            <ul>
                {state.map(task => {
                    return (
                        <li key={task._id}>
                            {task.subject}
                        </li>
                    )
                })}
            </ul>
            <input type="text" ref={input} />
            <button onClick={add}>+</button>
        </div>
    );
}

export default App;
