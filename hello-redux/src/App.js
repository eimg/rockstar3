import React from "react";
import { createStore } from "redux";
import { connect } from "react-redux";

const App = props => {
    let input = React.createRef();

    return (
        <div>
            <h1>React Redux</h1>
            <ul>
                {props.users.map(item => <li>{item}</li>)}
            </ul>
            <input type="text" ref={input} />
            <button onClick={() => {
                props.add(input.current.value);
            }}>+</button>
        </div>
    )
}

const ReduxApp = connect(state => {
    return {
        users: state
    };
}, dispatch => {
    return {
        add: name => {
            dispatch({ type: 'add', name });
        }
    }
})(App);

export default ReduxApp;
