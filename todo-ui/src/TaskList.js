import React from "react";
import Item from "./Item";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

const TaskList = props => {
    let SubHeader = <ListSubheader>{props.subheader}</ListSubheader>;

    return (
        <List subheader={SubHeader}>
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
        </List>
    );
}

export default TaskList;
