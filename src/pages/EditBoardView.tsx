import { TextField, Button, Stack, Paper, Typography, Box } from '@mui/material';
import { useFieldArray, UseFieldArrayUpdate, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBoardOptions, getBoardQueryKey, putApiBoardsByIdMutation } from '../client/@tanstack/react-query.gen';
import { Board } from 'src/client';
import { PhaseForm } from '../components/PhaseForm';

const EditBoardView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1️⃣ Fetch existing board
  const { data: board, isLoading } = useQuery(
    getBoardOptions({ path: { id: Number(id) } })
  );
  // 2️⃣ Form setup
  const {
      register,
      handleSubmit,
      reset,
      control,
      formState: { errors },
    } = useForm<Board>();

   const { fields, append, remove } = useFieldArray({
       control,
       name:"phases"
     });

   // 3️⃣ Update mutation
  const mutation = useMutation({
    ...putApiBoardsByIdMutation(),
    onSuccess: (data,variables) => {
        const {id} = variables.path;
      queryClient.invalidateQueries({queryKey:getBoardQueryKey({path:{id:id}})});
      navigate('/ViewBoards');
    },
  });
  
  // Fill form when API data arrives
  useEffect(() => {
    if (board) reset(board);
  }, [board, reset]);

  const onSubmit = (values: Board) => {
    console.log("Submitting values:", values);
    mutation.mutate({ path: { id: Number(id) }, body: values });
  };

  if (isLoading) return <>Loading...</>;

  return (
    <Paper sx={{ p: 4, width: '100%', mx: 'auto', mt: 4,  minHeight: '80vh', display: 'flex',
    flexDirection: 'column'  }}>
      <Typography variant="h6" mb={2}>
        Edit Board
      </Typography>

       <form onSubmit={handleSubmit(onSubmit)}   style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
     <Box
      sx={{
        maxWidth: 500,  
        width: '100%',
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Board Name"
          fullWidth
          {...register('name')}
          />
          </Stack>
    </Box>

     <Typography variant="h6" sx={{ mt: 3 }}>
          Phases
     </Typography>

        {fields.map((field, index) => (
          <PhaseForm
            key={field.id}
            index={index}
            remove={remove}
            value={field}
            register ={register}
          />
          
        ))}

     <Box sx={{ mt: 2 }}>

          <Button variant="contained" type="submit"
          onClick={() => append({ name: "",boardId: Number(id) })}
          style={{ backgroundColor:'var(--primary-color)' }}>
        Add Phase
      </Button>
     </Box>

       <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" type="submit" style={{ marginRight: '8px',backgroundColor:'var(--primary-color)' }}>
        Save
      </Button>
       <Button variant="contained" type="button" onClick={() => navigate('/ViewBoards')} style={{backgroundColor:'var(--primary-color)' }}>
        Cancel
      </Button>
       </Box>
      </form>
    </Paper>
  );
};

export default EditBoardView;
