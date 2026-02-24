import { useKanbanBoardController } from './controllers/KanbanBoardController.js';
import '../../styles/KanbanBoard.css';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { PhaseSlab } from './PhaseSlab.js';
import {updateTaskMutation} from './controllers/UpdateTaskMutation.js';
import { Task } from '../../client/types.gen.js';

export default () => {
  const { phases, tasks } = useKanbanBoardController();
  const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
       if (over) {
          const affectedTasks: Task = tasks.find(task =>task.id === active.id)!;
          let updatedTask:Task= { ...affectedTasks, phaseId: Number(over.id) };
          updateTaskMutation().mutate({
            body:{
              ...updatedTask
            },
            path:{
            id: updatedTask?.id!
            }
          });
        }
      }
  return (
    <DndContext 
      onDragEnd={handleDragEnd}>
    {phases.length > 0 &&
    
    phases.map(item => (
      <PhaseSlab key={item?.id} item={item} tasks={tasks} />
    ))}
    </DndContext>
  );
};