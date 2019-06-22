import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import DeleteIcon from "@material-ui/icons/Delete";

const Item = props => {
    return (
        <ListItem>
            <ListItemIcon>
            {
                props.task.status ?
                    <IconButton>
                        <CheckCircleIcon onClick={() => {
                            props.undo(props.task._id);
                        }}  />
                    </IconButton>
                :
                    <IconButton>
                        <RadioButtonUncheckedIcon onClick={() => {
                            props.done(props.task._id);
                        }}  />
                    </IconButton>
            }
            </ListItemIcon>

            <ListItemText primary={props.task.subject} />

            <ListItemSecondaryAction>
                <IconButton>
                    <DeleteIcon onClick={() => {
                        props.remove(props.task._id);
                    }} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Item;
