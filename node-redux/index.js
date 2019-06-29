var createStore = require('redux').createStore;

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

store.subscribe(function() {
    console.log(store.getState());
});

store.dispatch({ type: 'add', name: 'Bob' });
store.dispatch({ type: 'add', name: 'Tom' });
store.dispatch({ type: 'add', name: 'Alice' });
store.dispatch({ type: 'add', name: 'Mary' });
store.dispatch({ type: 'remove', name: 'Tom' });
