import React from 'react';
import {NavBar} from "./NavBar";
import {api} from '../api/app';
import {Alert, Button, Table} from "react-bootstrap";
import {history} from "../utils";
import {LOG, MEMBERS} from "../routes";


class Students extends React.Component {
    constructor(props) {
        super(props);

        let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        this.state = {
            role: user ? user.role : "",
            students: null,
            error: ''
        }
    }

    componentWillMount() {
        if(this.state.role === "STUDENT") {
            history.replace(MEMBERS)
        }

        api.getAllStudents()
            .then(response => {
                this.setState({students: response.data});
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    chooseStudent = (event) => {
        event.preventDefault();
        sessionStorage.setItem("studentId", event.target.value)
        history.replace({LOG}, event.target.value)
    }

    render() {
        return (
            <div>
                <NavBar/>

                <div className="tables">
                    {this.state.students &&
                    <Table>
                        <h5 className="tableHeadFont">Students list</h5>
                        <tbody>
                        {this.state.students.map((students, index) =>
                            <tr key={index}>
                                <td>
                                    <Button type="submit" variant="link" value={students.id}
                                            onClick={this.chooseStudent}>
                                        {students.username}
                                    </Button>
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </Table>
                    }
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                </div>
            </div>
        )
    }
}

export {Students};