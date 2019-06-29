import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

let store = createStore((state = { tasks: [] }, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                tasks: [ ...state.tasks, action.task ]
            };
        case 'REMOVE':
            return {
                tasks: state.tasks.filter(task => task._id !== action._id)
            };
        case 'DONE':
            return {
                tasks: state.tasks.map(task => {
                    if(task._id === action._id) {
                        task.status = 1;
                    }

                    return task;
                })
            };
        case 'UNDO':
            return {
                tasks: state.tasks.map(task => {
                    if(task._id === action._id) {
                        task.status = 0;
                    }

                    return task;
                })
            };
        case 'CLEAR':
            return {
                tasks: state.tasks.filter(task => task.status === 0)
            };
        default:
            return state;
    }
});

store.dispatch({
    type: 'ADD',
    task: { '_id': 1, 'subject': 'Egg', 'status': 0 }
});

store.dispatch({
    type: 'ADD',
    task: { '_id': 2, 'subject': 'Milk', 'status': 1 }
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
