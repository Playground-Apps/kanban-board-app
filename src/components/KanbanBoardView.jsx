import { useKanbanBoardController } from '../controllers/KanbanBoardController.jsx';
import '../styles/KanbanBoard.css';
import { DragDropProvider } from '@dnd-kit/react';
import { Phase } from './PhaseSlab.jsx';

export default () => {
  const { areas, tasks, setTasks } = useKanbanBoardController();
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
    {areas.length > 0 &&
    
    areas.map(item => (
      <Phase key={item?.Id} item={item} tasks={tasks} />
    ))}
    </DragDropProvider>
  );
};