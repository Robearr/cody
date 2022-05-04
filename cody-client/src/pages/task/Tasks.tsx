import { Button, Grid, Pagination } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Pageable } from '../../types/Pageable';
import { BaseResponse } from '../../types/BaseResponse';
import { Task } from '../../types/Task';
import { MessageContext } from '../../providers/MessageProvider';
import { useAjax } from '../../hooks/useAjax';
import { TaskCard } from '../../ui/task/TaskCard';
import { useNavigate } from 'react-router';

interface TasksProps {};

export const Tasks: React.FC<TasksProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState<number>(0);

  const navigate = useNavigate();
  const { ajax } = useAjax();
  const { addMessage } = useContext(MessageContext);

  useEffect(() => {

    (async () => {
      const body: Pageable = {
        number: page,
        size: 10,
        offset: page * 10,
        sort: {
          sorted: true,
          orderBy: [{
            ignoreCase: true,
            property: 'name',
            direction: 'ASC',
            ascending: true
          }]
        },
        unpaged: false,
        sorted: true
      };

      try {
        const { response } = await ajax.post('/task/listTasks', body);
        setTasks(response.content ?? []);
      } catch (e) {
        addMessage({ severity: 'ERROR', message: 'Váratlan hiba történt a feladatok lekérdezése közben!' });
      }

    })();

  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <>
      <Button variant='contained' href='/tasks/new'>Új feladat</Button>
      <Grid container spacing={2}>
        {tasks.map((task: Task) => (
          <Grid item xs={12} sm={6} md={4} sx={{ cursor: 'pointer' }} key={task.uuid} >
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
      <Pagination page={page + 1} count={10} onChange={handlePageChange} />
    </>
  );
};