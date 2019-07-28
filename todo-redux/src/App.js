import React from "react";
import { connect } from "react-redux";

const Item = props => {
    return (
        <li>
            {
                props.task.status ?
                <input type="checkbox" checked onChange={() => {
                    props.undo(props.task._id);
                }} /> :
                <input type="checkbox" onChange={() => {
                    props.done(props.task._id);
                }} />
            }

            {props.task.subject}
            <a href="#" onClick={() => {
                props.remove(props.task._id);
            }}>&times;</a>
        </li>
    );
}

const List = props => {
    return (
        <ul>
            {props.tasks.map(task => {
                return (
                    <Item
                        key={task._id}
                        remove={props.remove}
                        undo={props.undo}
                        done={props.done}
                        task={task} />
                )
            })}
        </ul>
    );
}

const App = props => {
    let input = React.createRef();

    return (
        <div>
            <h1>
                React Todo
                ({props.tasks.filter(task => task.status === 0).length})
            </h1>

            <List
                tasks={props.tasks.filter(task => {
                    return task.status === 0;
                })}
                done={props.done}
                undo={props.undo}
                remove={props.remove} />

            <b>DONE</b>
            <List
                tasks={props.tasks.filter(task => {
                    return task.status === 1;
                })}
                done={props.done}
                undo={props.undo}
                remove={props.remove} />

            <div>
                <input ref={input} />
                <button onClick={() => {
                    props.add(input.current.value);
                }}>+</button>
            </div>
        </div>
    );
}

let autoId = 2;

const ReduxApp = connect(state => {
    return {
        tasks: state.tasks
    }
}, dispatch => {
    return {
        add: subject => {
            dispatch({ type: 'ADD', task: { _id: ++autoId, subject, status: 0 }});
        },
        remove: _id => dispatch({ type: 'REMOVE', _id }),
        done: _id => dispatch({ type: 'DONE', _id }),
        undo: _id => dispatch({ type: 'UNDO', _id }),
        clear: _id => dispatch({ type: 'CLEAR', _id }),
        set: tasks => dispatch({ type: 'SET', tasks }),
    }
})(App);

export default ReduxApp;
