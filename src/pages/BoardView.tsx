import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Tooltip,
} from '@mui/material';
import type { Board } from '../client/types.gen.js';
import { useBoardViewController } from '../controllers/BoardsViewController.tsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createBoardMutation } from '../mutations/CreateBoardMutation.tsx';
import { deleteBoardMutation } from '../mutations/DeleteBoardMutation.tsx';
import { useNavigate   } from 'react-router-dom';
import { ModalDialogue } from '../components/ModalDialogue.tsx';
import PhaseMovements from './PhaseMovements.tsx';

export const BoardView = () => {
    const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [rowId,setRowId] = useState<Number| null>(null);
   const navigate= useNavigate();
   
  const { mutateAsync: createBoard, isPending: isCreatingBoard } =
    createBoardMutation();
  const { mutateAsync: deleteBoard, isPending: isDeletingBoard } =
   deleteBoardMutation();
    
  const {boards,isLoading}= useBoardViewController();
  const openDeleteConfirmModal = (row: MRT_Row<Board>) => {
   if (window.confirm('Are you sure you want to delete this user?')) {
     deleteBoard({
        path: { id: row.original.id! },
     });
   }
 };
function validateBoard(board: Board) {
  return {
    name: !(!!board.name?.length)
      ? 'Name is Required'
      : ''
  };
}
 const handleCreateBoard: MRT_TableOptions<Board>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateBoard(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createBoard({
        body:values
    });
    table.setCreatingRow(null); //exit creating mode
  };

  const columns = useMemo<MRT_ColumnDef<Board>[]>(
      () => [
          {
        accessorKey: 'id',
        header: 'Id',
        grow:1,
        enableCreating:false,
      },
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Board Name',
        grow:1
      },
      {
        header: 'PhaseMovements',
        Cell: ({ row }) => 
          {
         const isOpen = rowId === row.original.id;

            return(
              <>
                              <Link
                                component="button"
                                underline="hover"
                                onClick={(e) =>
                                {
                                  e.preventDefault() ;
                                  setRowId(row.original.id!);
                                }}
                              >
                                Configure Relationship
                              </Link>
              {row.original.phases && row.original.phases.length > 0 ? (
                                <ModalDialogue open={isOpen} modalHeading={row.original.name!} onConfirm={() => {}} onCancel={() => setRowId(null)} >
                                  <PhaseMovements id={Number(row.original.id!)} />
                                  </ModalDialogue>
              ):(
                 <>
                      <Dialog fullWidth open={isOpen}>
                
                      <DialogContent>
                        No phases found for this board. Please add phases to the board to configure movements.
                      </DialogContent>
                
                      <DialogActions>
                        <Button  onClick={() => setRowId(null)}>Cancel</Button>
                        <Button variant="contained" onClick={() => navigate(`/EditBoard/${row.original.id}`)}>Create Phases</Button>
                      </DialogActions>
                    </Dialog>
                  </>
              )}
                                  </>
                            );
                          },
          enableCreating:false,
      }
    ],
    [rowId],
  );

 const table = useMaterialReactTable({
    columns,
       layoutMode: 'grid',
  muiTablePaperProps: {
    sx: {
        margin: '20px',
      width: '100%',
      border: '2px solid var(--primary-color)',
    borderRadius: '8px',  
    },
},
muiTableBodyProps:{
  sx: {
      //stripe the rows, make odd rows a darker color
      '& tr:nth-of-type(odd) > td': {
        backgroundColor: '#f9f9f9',
      },
    },
},
    data:boards,
    state:{isLoading},
    enableTopToolbar: false, 
   createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    getRowId: (row) => String(row.id!),
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateBoard,
    enableRowActions: true,  
    enableEditing: true,
    editDisplayMode: 'custom', //default ('row', and 'custom' are also available) 
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => navigate(`/EditBoard/${row.original.id}`)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
        }}
      >
        Create New Board
      </Button>
    ),
  });

  return <> 
  <MaterialReactTable table={table} />
  </>;
}