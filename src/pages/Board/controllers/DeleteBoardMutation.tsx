  import { useMutation, useQueryClient} from '@tanstack/react-query';
  import {deleteApiBoardsByIdMutation, getApiBoardsOptions, getBoardQueryKey} from '../../../client/@tanstack/react-query.gen.ts';

  export const deleteBoardMutation = () => {
      const queryClient = useQueryClient();
      const getBoardOptions = getApiBoardsOptions();
 return useMutation({
      ...deleteApiBoardsByIdMutation(),
      onSuccess:(data,variables)=>{
        const {id} = variables.path;
        queryClient.invalidateQueries({queryKey:getBoardOptions.queryKey});
        if(id){
          queryClient.invalidateQueries({queryKey:getBoardQueryKey({path:{id:id}})});
        }
      }
    });
  };