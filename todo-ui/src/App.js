import React from "react";
import TaskList from "./TaskList";
import Header from "./Header";
import AddTask from "./AddTask";

class App extends React.Component {
    api = 'http://134.209.102.62/tasks';

    state = {
        tasks: []
    };

    componentWillMount() {
        fetch(this.api).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                tasks: json
            });
        });
    }

    add = (subject) => {
        fetch(this.api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject })
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                tasks: [
                    ...this.state.tasks,
                    json
                ]
            });
        });
    }

    remove = _id => {
        fetch(`${this.api}/${_id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            this.setState({
                tasks: this.state.tasks.filter(task => task._id !== _id)
            });
        });
    }

    done = _id => {
        fetch(`${this.api}/${_id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 1 })
        }).then(res => {
            this.setState({
                tasks: this.state.tasks.map(task => {
                    if(task._id === _id) task.status = 1;
                    return task;
                })
            });
        });
    }

    undo = _id => {
        fetch(`${this.api}/${_id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 0 })
        }).then(res => {
            this.setState({
                tasks: this.state.tasks.map(task => {
                    if(task._id === _id) task.status = 0;
                    return task;
                })
            });
        });
    }

    clear = () => {
        fetch(this.api, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            this.setState({
                tasks: this.state.tasks.filter(task => task.status === 0)
            });
        });
    }

    render() {
        return (
            <div>
                <Header
                    clear={this.clear}
                    count={this.state.tasks.filter(task => {
                        return task.status === 0;
                    }).length} />

                <AddTask add={this.add} />

                <TaskList
                    tasks={this.state.tasks.filter(task => {
                        return task.status === 0;
                    })}
                    done={this.done}
                    undo={this.undo}
                    remove={this.remove} />

                <TaskList
                    subheader="DONE"
                    tasks={this.state.tasks.filter(task => {
                        return task.status === 1;
                    })}
                    done={this.done}
                    undo={this.undo}
                    remove={this.remove} />
            </div>
        );
    }
}

export default App;
