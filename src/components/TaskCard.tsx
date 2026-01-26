import { useDraggable } from '@dnd-kit/react';
import { Task } from '../client/types.gen';

export const TaskCard = ({ task }: { task: Task }) => {
       const { ref } = useDraggable({
        id: `${task?.id}`,
        data:{
            areaId: task?.id,
        }
    });
  return (
    <div className='task-card' ref={ref}>
      <a href={`/EditTask/${task.id}`} className='task-card-title'>{task?.title}</a>
      <div className='task-card-description'>{task?.storyPoints}</div>
    </div>
  );
};
