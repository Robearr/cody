import { Card, CardContent, Typography } from '@mui/material';
import { Task } from '../../types/Task';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>{task.taskName}</Typography>
        <Typography variant='h6'>{task.taskDescription}</Typography>
        <Typography variant='h6'>Elérhető nyelvek: {task.taskForLanguages.map((lang) => lang.language).join()}</Typography>
      </CardContent>
    </Card>
  );
};