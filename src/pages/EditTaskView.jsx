import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";4
import {InlineEdit} from "../components/InLineEdit.jsx";
import TurndownService from "turndown";

export const EditTaskView = ({task}) => {
  const turndown = useMemo(() => new TurndownService(), []);
  const navigate = useNavigate();
   console.log("EditTaskView task:", task);
  function Cancel() {
       console.log("cacnelling");
  //  navigate('/ActiveSprint');
  }

  function handleSubmit(e) {
    console.log("inilineedit phone kr rea aeee:",e);
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