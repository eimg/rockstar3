import React from "react";
import { createStore } from "redux";

var store = createStore(function(state = [], action) {
    switch(action.type) {
        case 'add':
            return [...state, action.name];
            break;
        case 'remove':
            return state.filter(i => i != action.name);
            break;
        default:
            return state;
    }
});

store.dispatch({ type: 'add', name: 'Bob' });
store.dispatch({ type: 'add', name: 'Alice' });

class App extends React.Component {
    input = React.createRef();

    add = () => {
        store.dispatch({ type: 'add', name: this.input.current.value });
        this.forceUpdate();
    }

    render() {
        let data = store.getState();

        return (
            <div>
                <h1>React Redux</h1>
                <ul>
                    {data.map(item => <li>{item}</li>)}
                </ul>
                <input type="text" ref={this.input} />
                <button onClick={this.add}>+</button>
            </div>
        )
    }
}

export default App;
