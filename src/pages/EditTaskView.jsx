import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";4
import {InlineEdit} from "../components/InLineEdit.jsx";
import TurndownService from "turndown";

export const EditTaskView = ({task}) => {
  const turndown = useMemo(() => new TurndownService(), []);
  const navigate = useNavigate();
   console.log("yaaran da log",value);
    const markdownValue = turndown.turndown(value);
    console.log("markdownValue (computed)", markdownValue);

  function Cancel() {
       console.log("cacnelling");
  //  navigate('/ActiveSprint');
  }

  function handleSubmit(e) {
    const md = turndown.turndown(value);
    console.log("Submitting markdown:", md);
    // save logic...
  }

  return (
      <InlineEdit 
        value={task?.Name}
        onConfirm={handleSubmit}
        onCancel={Cancel}
      />
  );
};