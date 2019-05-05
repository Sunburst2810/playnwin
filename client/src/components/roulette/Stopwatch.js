import * as React from "react";
import ReactStopwatch from "react-stopwatch";
import { Button } from "./Style";

const Stopwatch = () => (
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    limit="00:20:00"
    onChange={({ minutes, seconds }) => {
      // do something
    }}
    onCallback={() => console.log("Finish")}
    render={({ minutes, seconds }) => {
      return (
        <Button>
          Time Left - {minutes}:{seconds}
        </Button>
      );
    }}
  />
);

export default Stopwatch;
