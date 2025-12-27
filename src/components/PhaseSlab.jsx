import { useDroppable } from '@dnd-kit/react';
import { TaskCard  } from './TaskCard';

export const Phase = ({item,tasks})=>{
   const { ref } = useDroppable({
        id: `${item?.Id}`,
        data:{
            areaId: item?.Id,
        }
    });

    return (
    <div className='action-slab' ref={ref}>
      <div className='action-slab-title'>{item?.Name}</div>
      {tasks.filter(task => String(task?.Phase) === String(item?.Id)).map(taskItem => {
        return <TaskCard key={taskItem?.Id} task={taskItem} />;
      })}
    </div>
  );
}