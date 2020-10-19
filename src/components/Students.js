import React from 'react';
import {NavBar} from "./NavBar";
import {api} from '../api/app';
import {Alert, Button, Table} from "react-bootstrap";
import {history} from "../utils";


class Students extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: null,
            error: ''
        }
    }

    componentWillMount() {
        api.getAllStudents()
            .then(response => {
                this.setState({students: response.data});
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    onClickButton = (event) => {
        event.preventDefault();
        sessionStorage.setItem("studentId", event.target.value)
        history.replace("/log", event.target.value)
    }

    render() {
        return (
            <div>
                <NavBar/>

                <div className="membersTable">
                    {this.state.students &&
                    <Table>
                        <h5 className="tableHeadFont">Students list</h5>
                        <tbody>
                        {this.state.students.map((students, index) =>

                            <tr key={index}>

                                <td>
                                    <Button type="submit" variant="link" value={students.id}
                                            onClick={this.onClickButton}>
                                        {students.username}
                                    </Button>
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </Table>
                    }
                    {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
                </div>
            </div>
        )
    }
}

export {Students};