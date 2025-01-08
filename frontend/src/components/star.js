import React from "react";
import { BsStarFill } from "react-icons/bs";

export default function Star(props) {
  console.log(props.selected)
  return <BsStarFill
    color={props.selected ? "#FF7C01" : "#dddddd"}
    onClick={props.onSelect}
  />;
}
