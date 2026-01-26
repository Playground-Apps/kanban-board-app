import { useDroppable } from '@dnd-kit/react';
import { TaskCard  } from './TaskCard';
import { Task,Phase } from '../client/types.gen';

export const PhaseSlab = ({item,tasks}:{item: Phase; tasks: Task[]})=>{
   const { ref } = useDroppable({
        id: `${item?.id}`,
        data:{
            areaId: item?.id,
        }
    });

    return (
    <div className='action-slab' ref={ref}>
      <div className='action-slab-title'>{item?.name}</div>
      {tasks.filter(task => String(task?.phase) === String(item?.id)).map(taskItem => {
        return <TaskCard key={taskItem?.id} task={taskItem} />;
      })}
    </div>
  );
}