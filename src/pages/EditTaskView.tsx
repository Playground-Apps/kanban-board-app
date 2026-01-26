import {  useMemo } from "react";
import {InlineEdit} from "../components/InLineEdit.js";
import TurndownService from "turndown";
import { useParams } from "react-router-dom";
import { Task } from "../client/types.gen.js";
import { updateTaskMutation } from "../mutations/UpdateTaskMutation.js";
import { useQuery } from '@tanstack/react-query';
import { getTaskOptions } from "../client/@tanstack/react-query.gen.js";


export const EditTaskView = () => {
  const { id } = useParams<{ id: string }>();
  const turndown = useMemo(() => new TurndownService(), []);
  const task = useQuery({
    ...getTaskOptions(
      {
        path:{
        id: Number(id!)
        }
      }
    )
  }).data!;
   console.log("EditTaskView task:", task);

  function handleSubmit(value:string,key:string) {
    console.log("inilineedit phone kr rea aeee:",value,key);
    let taskUpdate: Task = {...task, [key]: value};
      updateTaskMutation().mutate({
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