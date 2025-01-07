import React from "react";
import { BsHeartFill } from "react-icons/bs";

export default function Star(props) {
    console.log(props.selected)
    return < BsHeartFill
        color={props.selected ? "#F18AD1" : "#dddddd"}
        onClick={props.onSelect}
    />;
}