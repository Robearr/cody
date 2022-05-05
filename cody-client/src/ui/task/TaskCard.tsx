import { Card, CardContent, Typography } from '@mui/material';
import { Task } from '../../types/task/Task';
import { useTranslation } from 'react-i18next';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {

  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>{task.taskName}</Typography>
        <Typography variant='h6'>{task.taskDescription}</Typography>
        <Typography variant='h6'>{t('task.availableLanguages')}: {task.taskForLanguages.map((lang) => lang.language).join()}</Typography>
      </CardContent>
    </Card>
  );
};