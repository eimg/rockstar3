import React from 'react';

const App = props => {
    let api = 'http://localhost:8000/tasks';

    let input = React.createRef();

    let [ state, setState ] = React.useState([]);

    React.useEffect(() => {
        fetch(api).then(res => res.json()).then(json => {
            setState(json);
        });
    });

    const add = () => {
        let subject = input.current.value;

        fetch(api, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ subject })
        }).then(res => res.json()).then(json => {
            setState([ ...state, json ]);
        });
    }

    const remove = _id => () => {
        fetch(`${api}/${_id}`, {
            method: 'delete'
        }).then(res => {
            setState(state.filter(task => task._id !== _id));
        });
    }

    const check = _id => () => {
        fetch(`${api}/${_id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 1 })
        }).then(res => {
            setState(state.map(task => {
                if(task._id === _id) task.status = 1;
                return task;
            }));
        });
    }

    const undo = _id => () => {
        fetch(`${api}/${_id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 0 })
        }).then(res => {
            setState(state.map(task => {
                if(task._id === _id) task.status = 0;
                return task;
            }));
        });
    }

    const clear = () => {
        fetch(api, {
            method: 'delete'
        }).then(res => {
            setState(state.filter(task => task.status === 0));
        });
    }

    let tasks = state.filter(task => task.status === 0);
    let done = state.filter(task => task.status === 1);

    return (
        <div>
            <h1>React Hooks</h1>
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task._id}>
                            <input type="checkbox" onChange={check(task._id)} />
                            {task.subject}
                            <a href='#' onClick={remove(task._id)}>&times;</a>
                        </li>
                    )
                })}
            </ul>
            <hr />
            <ul>
                {done.map(task => {
                    return (
                        <li key={task._id}>
                            <input type="checkbox" checked onChange={undo(task._id)} />
                            {task.subject}
                            <a href='#' onClick={remove(task._id)}>&times;</a>
                        </li>
                    )
                })}
            </ul>

            <input type="text" ref={input} />
            <button onClick={add}>+</button>

            <a href='#' onClick={clear}>Clear all done</a>
        </div>
    );
}

export default App;
