import { useEffect, useRef } from 'react';
import { useState } from 'react';

export const useKanbanBoardController = ()=>
{
   const [areas, setAreas] = useState([]);
  const [tasks, setTasks] = useState([]);
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    const fetchData = async () => {
      console.log("Fetching data...");
      var [res1, res2] = await Promise.all([
        fetch("https://691cdb683aaeed735c92617e.mockapi.io/Areas/DropArea"),
        fetch("https://free.mockerapi.com/mock/2b4677ec-ab75-4053-9a5d-8403a51077b9")
      ]);
      if (!res1.ok || !res2.ok) {
        throw new Error("One or both API requests failed");
      }
      const [json1, json2] = [await res1.json(), await res2.json()];
      setAreas(json1);
      setTasks(json2);
    };
    fetchData();
  }, []);

    return {areas, tasks,setTasks};
}