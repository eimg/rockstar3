import React from "react";
import TaskList from "./TaskList";
import Header from "./Header";
import AddTask from "./AddTask";

class App extends React.Component {
    autoid = 3;

    state = {
        tasks: [
            { '_id': 1, 'subject': 'Egg', 'status': 0 },
            { '_id': 2, 'subject': 'Bread', 'status': 1 },
            { '_id': 3, 'subject': 'Butter', 'status': 0 },
        ]
    };

    add = (subject) => {
        this.setState({
            tasks: [
                ...this.state.tasks,
                {
                    '_id': ++this.autoid,
                    'subject': subject,
                    'status': 0
                }
            ]
        });
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

    clear = () => {
        this.setState({
            tasks: this.state.tasks.filter(task => task.status === 0)
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
