import { useQuery } from "@tanstack/react-query";
import{ getPhasesByBoardByIdOptions } from "../client/@tanstack/react-query.gen.ts";
import { Phase, PhaseTransitions } from "src/client";
import { useEffect, useState } from "react";
import { Box, Checkbox } from "@mui/material";


const PhaseMovements = ({id}: {id:number}) => {
    // To ensure always configuring on latest data, we can fetch the data here instead of passing as props from board view.
    const { data, isLoading } = useQuery({
        ...getPhasesByBoardByIdOptions({
            path: { id: Number(id!) },
           query: { includeTask: false}}),
        },
       );
  
    const [tableData, setTableData] = useState<Phase[]>([]);

    useEffect(() => {
        if(isLoading) return;
     const values = Array.isArray(data) && data?.map(phase =>{ 
        if(phase.phaseMovement?.length==0){
            return {...phase,
                phaseMovement: data.filter(x => x.id !== phase.id).reduce<PhaseTransitions[]>((acc, x) => {
                acc.push({fromPhaseId: phase.id});
                return acc;
            },[])
            }
        }
        return phase
    })||[];
        setTableData(values);
    }, [isLoading]);

    const [selectedPhase, setSelectedPhase] = useState<Number | null>(null);
    const updatePhaseMovements=(phaseId:number,isChecked:boolean,movement:PhaseTransitions[]):PhaseTransitions[]=>{
       const movementIndex = movement.findIndex(x => x.toPhaseId === phaseId);
       if(movementIndex===-1)
        {
        const newMovementIndex = movement.findIndex(x => x.toPhaseId === undefined);
         return movement.map((item,idx) => {
            if(idx===newMovementIndex)
            {
                return {...item,toPhaseId: phaseId};
            }
            return item;
           });
        }
        else
        {
         return movement.map((item,idx) => {
            if(idx===movementIndex)
            {
                if(!isChecked)
                {
                    console.log("unchecked");
                     return {...item,toPhaseId: undefined};
                }
                else
                {
                    return {...item,toPhaseId: phaseId};
                }
            }
            return item;
           });
        }
    }
    return (
        isLoading ? <p>Loading...</p> :
        tableData.length?  (
     <Box sx={{ mx:2, mt: 2, display: 'flex', maxWidth: '100%',minWidth:'50%',  border: '1px solid black', borderRadius: '8px' }}>
        <Box sx={{display:'flex',flexDirection:'column', borderRight: '1px solid black' }}>
                <Box sx={{height:'30px',borderBottom: '1px solid black',color:'black', textAlign:'center',fontWeight:'Bolder'}}>
                   Phases
                </Box>
                {tableData.map(phase => (
                    <Box key={phase.id} sx={{display:'flex',color:'black',borderBottom: '1px solid black',borderLeftRadius:'8px',alignItems:'center',padding:'10px',backgroundColor: selectedPhase === phase.id ? 'lightblue' : 'transparent',cursor:'pointer'}}
                    onClick={() => setSelectedPhase(Number(phase.id))}>
                        {phase.name}
                    </Box>))}
        </Box>
        <Box sx={{flex:1,color:'black'}}>
             <Box sx={{height:'30px',borderBottom: '1px solid black',color:'black',textAlign:'center',fontWeight:'Bolder'}}>
                    Phase Movements
             </Box>
                {selectedPhase && tableData.filter(phase => phase.id !== selectedPhase)?.map(phase => {
                 return <Box key={phase.id} sx={{mt:1,ml:15,color:'black',textAlign:'start',fontWeight:'Bolder'}}>
                    <Checkbox checked={tableData.find(item => item.id === selectedPhase)?.phaseMovement?.some(x => x.toPhaseId === phase.id)} 
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            setTableData(prevData => prevData.map(item =>{
                                if(item.id===selectedPhase)
                                {
                                    const updatedMovements =updatePhaseMovements(Number(phase.id),isChecked,item.phaseMovement!);
                                    console.log(updatedMovements);
                                    return ({...item,
                                           phaseMovement: updatedMovements
                                    });
                                }
                                else
                                {
                                    return item;
                                }
                            }))
                        }}/>
                    {phase.name}
                    </Box>
            })}
        </Box>
    </Box>
        ) : (<p>No phases configured for board</p> )
    );
};

export default PhaseMovements;
