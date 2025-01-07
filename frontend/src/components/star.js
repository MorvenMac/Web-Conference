// import React from "react";
// import { FaStar } from "react-icons/fa";

// export default function Star( props) {
//   return <FaStar 
//         color={props.selected ? "red" : "grey"}
//         onClick={props.onSelect} 
//         />;
// }
import React from "react";
import { BsStarFill } from "react-icons/bs";

export default function Star(props) {
  console.log(props.selected)
  return <BsStarFill
    color={props.selected ? "#FF7C01" : "#dddddd"}
    onClick={props.onSelect}
  />;
}
