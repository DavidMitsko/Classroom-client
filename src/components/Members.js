import React from 'react';
import {Navbar, NavDropdown, Nav, Table, Alert} from 'react-bootstrap';
import {history} from '../utils';
import SockJsClient from 'react-stomp';
import raisedHand from '../raisedHand.svg';
import {api} from '../api/app';
import {API_URL, SOCK_URL, TOPIC_URL} from "../constants";

class Members extends React.Component {
    constructor(props) {
        super(props);

        let user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem('user')) : null;
        this.state = {
            username: user ? user.username : " ",
            userId: user ? user.id : null,
            authorized: user ? user.authorized : false,
            raisedHand: user ? user.raisedHand : false,
            users: null,
            error: ''
        }
    }

    componentWillMount() {
        if (!this.state.authorized) {
            history.replace('/login')
        }

        api.getUsers()
            .then(response => {
                this.setState({users: response.data})
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    componentDidMount() {
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault()
            api.signOut(this.state.userId)
                .catch(err => {
                    this.setState({error: err.response.data.message})
                })
        })
    }

    onActionSubmit = (event) => {
        event.preventDefault();

        api.raiseHand(this.state.userId)
            .then(response => {
                sessionStorage.setItem("user", JSON.stringify(response.data))
                this.setState({raisedHand: response.data.raisedHand})
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    signOut = (event) => {
        event.preventDefault();

        api.signOut(this.state.userId)
            .then(response => {
                sessionStorage.removeItem("user")

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
                            <NavDropdown.Item onClick={this.onActionSubmit}>Raise hand
                                {this.state.raisedHand ? ' down' : ' up'}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.signOut}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>

                <div className="membersTable">
                    {this.state.users &&
                    <Table>
                        <h5 className="tableHeadFont">Class members</h5>
                        <tbody>
                        {this.state.users.map((user, index) =>
                            <tr key={index}>
                                <td> {user.username} </td>
                                <td>{user.raisedHand && <img src={raisedHand} height="20" width="20" alt={"up"}/>}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    }
                    {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
                </div>

                <SockJsClient url={API_URL + SOCK_URL}
                              topics={[TOPIC_URL]}
                              onMessage={(message) => {
                                  this.setState({users: message})
                              }}
                />
            </div>
        )
    }
}

export {Members};