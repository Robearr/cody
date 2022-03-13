import { Button, Grid, Pagination } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Pageable } from '../../types/Pageable';
import { BaseResponse } from '../../types/BaseResponse';
import { Task } from '../../types/Task';
import { MessageContext } from '../../providers/MessageProvider';

interface TasksProps {};

export const Tasks: React.FC<TasksProps> = () => {

  const { addMessage } = useContext(MessageContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState<number>(0);

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
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/task/listTasks`, {
          method: 'POST',
          body: JSON.stringify(body),
        });

        // TODO
        // const tasksResponse: BaseResponse<Task[]> = await response.json();
      } catch (e) {
        addMessage({ severity: 'ERROR', message: 'Váratlan hiba történt a feladatok lekérdezése közben!' });
      }

    })();

  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <Button variant='contained' href='/new-task'>Új feladat</Button>
    // <Grid container spacing={2}>
    //   {tasks.map((task: Task) => (
    //     <Grid item xs={12} sm={6} md={4} key={task.uuid}>
    //       {task.uuid}
    //     </Grid>
    //   ))}
    // </Grid>
    // <Pagination page={page + 1} count={10} onChange={handlePageChange} />
  );
};