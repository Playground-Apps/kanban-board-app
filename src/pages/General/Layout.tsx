import '../../index.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
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
    <div style={{
      alignContent: "center",
       }}>Logo</div>
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
        <NavLink to="/ViewBoards">View Boards</NavLink>
        </div>
        <div className='button-exp' onClick={toggleSidebar}>{layout=="main-layout-a" ? '<<' : '>>'}</div>
    </aside>
    <main>
      <Outlet />
    </main>
    </div>);
}