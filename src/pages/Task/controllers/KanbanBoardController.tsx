import { useQuery } from '@tanstack/react-query';
import {getApiPhasesOptions,getApiTasksOptions} from '../../../client/@tanstack/react-query.gen.ts';

export const useKanbanBoardController = ()=>
{
  const { isSuccess: phaseSuccess, data : phases } = useQuery({ ...getApiPhasesOptions()});
  const { isSuccess: taskSuccess, data : tasks } = useQuery({ ...getApiTasksOptions()});
 if(phaseSuccess && taskSuccess)
 {
    return {phases, tasks};
 }
   return {phases:[], tasks:[]};
}