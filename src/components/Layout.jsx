import '../index.css';
import { Routes, Route,NavLink } from 'react-router-dom';
import { useState } from 'react';
import KanbanBoard from './KanbanBoardView.jsx';
import Backlog from './Backlog.jsx';
import { useLocation } from 'react-router-dom';

export default ()=>{
const [layout,setLayout]= useState("main-layout-a");
const location = useLocation();
  function toggleSidebar(){
    setLayout(layout==="main-layout-a"?"main-layout-b":"main-layout-a");
  }
    return (
    <div className={layout}>
    <nav>  
    <div className='nav-left-buttons'>
    <div className='side-drawer' onClick={toggleSidebar}>{layout=="main-layout-a" ? '✖' : '≡'}</div> 
    <div>Logo</div>
    {
      location.pathname==="/ActiveSprint" &&
    <button style={{
      marginLeft: "14px",
      border: "solid 1px black",
      borderRadius: "5px",
      padding: "3px",
      backgroundColor: "lightgray",
      cursor: "pointer"
       }}>
        Create
        </button>
    }
    </div>   
    <div className='nav-right-buttons'>
    <div>Dark Mode switch</div>
    <div>User Profile</div>
    </div>
    </nav>
    <aside>
        <div className='menu-items'>
        <NavLink to="/ActiveSprint">Active Sprint</NavLink>
        <NavLink to="/Backlog">Backlog</NavLink>
        </div>
        <div className='button-exp' onClick={toggleSidebar}>{layout=="main-layout-a" ? '<<' : '>>'}</div>
    </aside>
    <main> <Routes>
      <Route path="/ActiveSprint" element={<KanbanBoard />} />
      <Route path="/Backlog" element={<Backlog />} />
    </Routes></main>
    </div>);
}