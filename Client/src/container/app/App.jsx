import React, { Fragment } from 'react';
import Globalprovider, { GlobalConsumer } from '../../context/context';
import { BrowserRouter as Router, Route} from "react-router-dom";

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer,MDBBadge,MDBListGroupItem,MDBListGroup  } from "mdbreact";

// CSS
import './App.css'

// Component
// Pages
import ChatDashboard from '../Pages/chat_dashboard/chat_dashboard';
import create_ticket from '../Pages/create_ticket/create_ticket';
import detail_ticket from '../Pages/detail_ticket/detail_ticket';
import ListTickets from '../Pages/list_tickets/list_tickets';
import pageNotFound from '../../component/404/pageNotFound';
import Register from '../Pages/Auth/register/register';
import Dashboard from '../Pages/dashboard/dashboard';
import Profile from '../Pages/profile/profile';
import Login from '../Pages/Auth/login/login'
import Home from '../Pages/home/home';

class App extends React.Component {

  state = {
    isOpen: false,
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logout(){
      this.props.dispatch({type:'navbarHide'})
      localStorage.removeItem('user')  
  }
  render() {
 
    return (
      <Router>
        <Fragment>
              {this.props.state.navbarStatus && (
              <MDBNavbar color="indigo"  dark expand="md">
              <MDBContainer>
              <MDBNavbarBrand>
                <strong className="white-text">Menu</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav left>
                  {this.props.state.navbarHomeStatus ? (
                  <MDBNavItem active>
                    <MDBNavLink to='/home'>Home</MDBNavLink>
                  </MDBNavItem>
                  ) : (
                    <MDBNavItem>
                    <MDBNavLink to='/home'>Home</MDBNavLink>
                    </MDBNavItem>
                  )}
                 
                </MDBNavbarNav>
             
                <MDBNavbarNav right>
                <MDBNavItem className="mr-3">
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="bell" /> 
                        <MDBBadge color="danger" className="notif-all">4</MDBBadge>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default notif-drop mr-3 mt-3 p-1" >
                      <MDBListGroup >
                        <MDBListGroupItem href="#">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1"><b>COP-20210719-0000005</b></h6>
                            <small>3 days ago</small>
                          </div>
                          <p className="mb-1">Return Materials</p>
                          <small>Critical</small>
                        </MDBListGroupItem>
                        <MDBListGroupItem hover href="#">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1"><b>COP-20210719-00000053</b></h6>
                            <small className="text-muted">3 days ago</small>
                          </div>
                          <p className="mb-1">Tower Telecomunication</p>
                          <small className="text-muted">Critical</small>
                        </MDBListGroupItem>
                        <MDBListGroupItem hover href="#">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1"><b>COP-20210719-000000531</b></h6>
                            <small className="text-muted">3 days ago</small>
                          </div>
                          <p className="mb-1">Return Materials</p>
                          <small className="text-muted">Critical</small>
                        </MDBListGroupItem>
                      </MDBListGroup>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                      {this.props.state.navbarProfileStatus ? (
                        <MDBDropdownItem href='/profile' active> Profile</MDBDropdownItem>
                      ) : (
                        <MDBDropdownItem href='/profile'> Profile</MDBDropdownItem>
                      )}
                        <MDBDropdownItem href="#!" >Reset Password</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=> this.logout()} href="/" >Logout</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
              )}

        {/* Routes */}
        <Route path="/404" exact component={pageNotFound}/>
        
        {/* Auth */}
        <Route path="/" exact component={Login}/>
        <Route path="/register" component={Register}/>
        {/* Menu */}
        <Route path="/home" exact component={Home}/>
        <Route path="/home/verify/:token/:username" component={Home}/>

        <Route path="/create-ticket" component={create_ticket}/>
        <Route path="/list-tickets" component={ListTickets}/>
        <Route path="/detail-ticket/:id" component={detail_ticket}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/profile" component={Profile}/>
       
        <Route path="/chat-dashboard" component={ChatDashboard}/>
        </Fragment>
        
      </Router> 
    );
  }
}

// Exporting the component
export default Globalprovider(GlobalConsumer(App));