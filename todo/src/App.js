import React from "react";

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

class App extends React.Component {
    autoid = 3;

    input = React.createRef();

    state = {
        tasks: [
            { '_id': 1, 'subject': 'Egg', 'status': 0 },
            { '_id': 2, 'subject': 'Bread', 'status': 1 },
            { '_id': 3, 'subject': 'Butter', 'status': 0 },
        ]
    };

    add = () => {
        this.setState({
            tasks: [
                ...this.state.tasks,
                {
                    '_id': ++this.autoid,
                    'subject': this.input.current.value,
                    'status': 0
                }
            ]
        });

        this.input.current.value = "";
        this.input.current.focus();
    }

    remove = _id => {
        this.setState({
            tasks: this.state.tasks.filter(task => task._id !== _id)
        });
    }

    done = _id => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if(task._id === _id) task.status = 1;
                return task;
            })
        });
    }

    undo = _id => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if(task._id === _id) task.status = 0;
                return task;
            })
        });
    }

    render() {
        return (
            <div>
                <h1>
                    React Todo
                    ({this.state.tasks.filter(task => task.status === 0).length})
                </h1>

                <List
                    tasks={this.state.tasks.filter(task => {
                        return task.status === 0;
                    })}
                    done={this.done}
                    undo={this.undo}
                    remove={this.remove} />

                <b>DONE</b>
                <List
                    tasks={this.state.tasks.filter(task => {
                        return task.status === 1;
                    })}
                    done={this.done}
                    undo={this.undo}
                    remove={this.remove} />

                <div>
                    <input ref={this.input} />
                    <button onClick={this.add}>+</button>
                </div>
            </div>
        );
    }
}

export default App;
