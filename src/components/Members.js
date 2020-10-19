import React from 'react';
import {Table, Alert} from 'react-bootstrap';
import {history} from '../utils';
import SockJsClient from 'react-stomp';
import raisedHand from '../raisedHand.svg';
import {api} from '../api/app';
import {API_URL, SOCK_URL, TOPIC_URL} from "../constants";
import {NavBar} from "./NavBar";

class Members extends React.Component {
    constructor(props) {
        super(props);

        let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null;
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

        api.getAuthorizedStudents()
            .then(response => {
                this.setState({users: response.data})
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    render() {
        return (
            <div>
                <NavBar/>

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