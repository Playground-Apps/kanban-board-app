import { useNavigate } from "react-router-dom";

export const EditTaskView = ({task}) => {
     const navigate = useNavigate();
    function Cancel()
    {
        navigate('/ActiveSprint');
    }
    return  <form action={search}>
      <input name="query" />
      <button type="submit">Save</button>
      <button formAction={Cancel}>Cancel</button>
    </form>
};