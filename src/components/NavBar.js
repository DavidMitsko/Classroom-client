import React from 'react';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {history} from "../utils"
import {api} from "../api/app";

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null;
        this.state = {
            userId: user.id,
            username: user.username,
            raisedHand: user.raisedHand,
            role: user.role,
            path: window.location.pathname
        }
    }

    raiseHand = (event) => {
        event.preventDefault();

        api.raiseHand(this.state.userId)
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data))
                this.setState({raisedHand: response.data.raisedHand})
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    signOut = (event) => {
        event.preventDefault();

        api.signOut(this.state.userId)
            .then(() => {
                localStorage.removeItem("user")

                history.replace("/login")
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Nav className="mr-auto">
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            {this.state.role === 'STUDENT' ?
                                <NavDropdown.Item onClick={this.raiseHand}>Raise hand
                                    {this.state.raisedHand ? ' down' : ' up'}</NavDropdown.Item> :

                                this.state.path === '/members' || this.state.path === '/log' ?
                                    <NavDropdown.Item href='/students'>Students list</NavDropdown.Item> :
                                    <NavDropdown.Item href='/members'>Class members</NavDropdown.Item>

                            }
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                            {this.state.role === 'TEACHER' && <NavDropdown.Item href='/settings'>Settings</NavDropdown.Item>}
                            <NavDropdown.Item onClick={this.signOut}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export {NavBar};