import React, {Component} from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
import { withRouter } from 'react-router';

class HeaderComponent extends Component{

    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);
        return(
            <div>
               <header>
                   <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                       <div className="navbar-brand">To Do application</div>
                       <ul className="navbar-nav">
                           {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/sandeep">Home</Link></li>}
                           {isUserLoggedIn && <li><Link className="nav-link" to="/todos">To Dos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                           {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                           { isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ul>
                   </nav>
                </header>
            </div>
        )
    }
}

export default withRouter(HeaderComponent);