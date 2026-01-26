  import { useMutation,useQueryClient} from '@tanstack/react-query';
  import {putApiTasksByIdMutation,getTaskQueryKey,getApiTasksQueryKey} from '../client/@tanstack/react-query.gen.ts';
  import { Task } from "../client/types.gen.js";

  export const updateTaskMutation = () => {
 return useMutation({
      ...putApiTasksByIdMutation(),
      onSuccess:(data)=>{
        useQueryClient().invalidateQueries({queryKey:getApiTasksQueryKey()});
        if(data.id){
          useQueryClient().invalidateQueries({queryKey:getTaskQueryKey({path:{id:data.id}})});
        }
      console.log("Task updated successfully:", data);
    }
    });
  };