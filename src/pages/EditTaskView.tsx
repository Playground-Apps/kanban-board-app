import {  useMemo } from "react";
import {InlineEdit} from "../components/InLineEdit.js";
import TurndownService from "turndown";
import { Task } from "../client/types.gen.js";
import { updateTaskMutation } from "../mutations/UpdateTaskMutation.js";


export const EditTaskView = ({task}:{task:Task}) => {
  const turndown = useMemo(() => new TurndownService(), []);
   console.log("EditTaskView task:", task);

  function handleSubmit(value:string,key:string) {
    console.log("inilineedit phone kr rea aeee:",value,key);
    let taskUpdate: Task = {...task, [key]: value};
      updateTaskMutation(taskUpdate).mutate({
      body:{
        ...taskUpdate
      },
      path:{
      id: taskUpdate?.id!
      }
    });
  }

  return (
      <InlineEdit 
        key="title"
        value={task?.title || ""}
        onConfirm={handleSubmit}
      />
  );
};