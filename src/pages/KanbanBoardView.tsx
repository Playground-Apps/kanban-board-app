import { useKanbanBoardController } from '../controllers/KanbanBoardController.js';
import '../styles/KanbanBoard.css';
import { DragDropProvider } from '@dnd-kit/react';
import { PhaseSlab } from '../components/PhaseSlab.js';

export default () => {
  const { phases, tasks } = useKanbanBoardController();
  return (
    <DragDropProvider 
      onDragEnd={({operation, canceled}) => {
        const {source, target} = operation;
       if (!canceled && target) {
          setTasks(tasks.map(task => {
              if (task.Id === source.id) {
                console.log('Checking task:', task);
              return { ...task, Phase: target.id };
            }
            return task;
          }));
        }
      }}>
    {phases.length > 0 &&
    
    phases.map(item => (
      <PhaseSlab key={item?.id} item={item} tasks={tasks} />
    ))}
    </DragDropProvider>
  );
};