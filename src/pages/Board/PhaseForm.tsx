import { UseFieldArrayRemove, UseFieldArrayUpdate, UseFormRegister } from "react-hook-form";
import { Board, Phase } from "src/client";
import { Button } from "@mui/material";

export const PhaseForm = ({remove,index,register}:{remove:UseFieldArrayRemove,index:number,register:UseFormRegister<Board>}) => {
  return (
    <div>
      <input
        placeholder="name"
        {...register(`phases.${index}.name`, { required: true })}
      />
      <Button
        type="button"
        variant="outlined"
        color="error"
        sx={{ mx: 1 ,mt: 1, backgroundColor:'var(--primary-color)'}}
        onClick={() => remove(index)}
      >
        Remove Phase
      </Button>
    </div>
  );
};