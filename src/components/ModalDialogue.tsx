import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";

export const ModalDialogue = ({open,modalHeading,onConfirm,onCancel,children}:{open:boolean,modalHeading:string,onConfirm:()=>void,onCancel:()=>void,children:React.ReactNode})=>{
return (
  <>
      <Dialog open={open} onClose={onCancel} fullWidth>
      <DialogTitle>Configure movement from {modalHeading} </DialogTitle>

      <DialogContent>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>Save</Button>
      </DialogActions>
    </Dialog>
  </>
);
}