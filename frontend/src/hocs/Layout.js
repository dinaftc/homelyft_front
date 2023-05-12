
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import Sidebar from '../Admin/components/Sidebar';
import './Admin/App.css';




const Layout = ({isAuthenticated, checkAuthenticated, load_user,user, children }) => {
  
    useEffect(() => {
        checkAuthenticated();
        load_user();
    
    },[checkAuthenticated, load_user]);
    return ( <div>
   {(!isAuthenticated || (user && user.role === 3)) && (
  <div className='dashboard-body'>{children}</div>
) }{ (user && user.role !== 3) &&  (
  <div className='dashboard-container'>
    <Sidebar />
    <div className='dashboard-body'>{children}</div>
  </div>
)}

   </div> )
};
const mapStateToProps = state =>({
    isAuthenticated :state.auth.isAuthenticated,
    user:state.auth.user,
});

export default connect(mapStateToProps, {checkAuthenticated, load_user})(Layout);