import { useDraggable } from '@dnd-kit/react';

export const TaskCard = ({ task }) => {
       const { ref } = useDraggable({
        id: `${task?.Id}`,
        data:{
            areaId: task?.Id,
        }
    });
  return (
    <div className='task-card' ref={ref}>
      <a href={`/EditTask/${task.id}`} className='task-card-title'>{task?.Name}</a>
      <div className='task-card-description'>{task?.Points}</div>
    </div>
  );
};
