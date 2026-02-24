import { useDraggable } from '@dnd-kit/core';
import { Task } from '../../client/types.gen';

export const TaskCard = ({ task }: { task: Task }) => {
       const { setNodeRef } = useDraggable({
        id: `${task?.id}`,
        data:{
            areaId: task?.id,
        }
    });
  return (
    <div className='task-card' ref={setNodeRef}>
      <a href={`/EditTask/${task.id}`} className='task-card-title'>{task?.title}</a>
      <div className='task-card-description'>{task?.storyPoints}</div>
    </div>
  );
};
