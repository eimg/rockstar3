import React from "react";
import Item from "./Item";

const List = props => {
    return (
        <ul>
            {props.data.map(item => {
                return (
                    <Item name={item} />
                );
            })}
        </ul>
    )
}

export default List;
