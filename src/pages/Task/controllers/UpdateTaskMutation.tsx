  import { useMutation,useQueryClient} from '@tanstack/react-query';
  import {putApiTasksByIdMutation,getTaskQueryKey, getApiTasksOptions} from '../../../client/@tanstack/react-query.gen.ts';

  export const updateTaskMutation = () => {
    const queryClient = useQueryClient();
    const getTaskOptions = getApiTasksOptions();
 return useMutation({
      ...putApiTasksByIdMutation(),
      onSuccess:(data)=>{
       queryClient.invalidateQueries({queryKey:getTaskOptions.queryKey});
        if(data.id){
          queryClient.invalidateQueries({queryKey:getTaskQueryKey({path:{id:data.id}})});
        }
      console.log("Task updated successfully:", data);
    }
    });
  };