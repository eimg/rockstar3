import React from "react";
import Item from "./Item";

const List = props => {
    return (
        <ul>
            {props.data.map((item, index) => {
                return (
                    <Item name={item} key={index} />
                );
            })}
        </ul>
    )
}

export default List;
