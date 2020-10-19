import React from "react";
import {api} from "../api/app"
import {NavBar} from "./NavBar";
import {Alert, Button, Table, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import filter from "../filter.svg"

class StudentsLogs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentId: sessionStorage.getItem("studentId"),
            actions: null,
            action: '',
            startPeriod: null,
            endPeriod: null,
            logs: null,
            error: '',
            hiddenField: true
        }
    }

    componentWillMount() {
        console.log(this.state.studentId)
        api.getStudentsLogs(this.state.studentId)
            .then(response => {
                this.setState({logs: response.data})
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    but = (event) => {
        event.preventDefault();
        let temp = !(this.state.hiddenField)
        this.setState({hiddenField : temp})
        document.getElementById('filter').hidden = false;
    }

    handleChange = (value) => {
        this.setState({actions: value})
        console.log(value)
        console.log(this.state.actions)
    }

    render() {
        return (
            <div>
                <NavBar/>


                <div className="membersTable">

                    <div className="filterIcon">
                        <Button variant="light" onClick={this.but}>
                            <img src={filter} height="20" width="20" alt={"filter"}/>
                        </Button>
                    </div>
                    <div id="filter" hidden={this.state.hiddenField}>

                        <ToggleButtonGroup type="checkbox" value={this.state.action} onChange={this.handleChange}>
                            <ToggleButton value="LOG_IN">Log in</ToggleButton>
                            <ToggleButton value="LOG_OUT">Log out</ToggleButton>
                            <ToggleButton value="HAND_UP">Hand up</ToggleButton>
                            <ToggleButton value="HAND_DOWN">Hand down</ToggleButton>
                        </ToggleButtonGroup>
                    </div>


                    {this.state.logs &&
                    <Table>
                        <h5 className="tableHeadFont">Logs</h5>
                        <tbody>
                        {this.state.logs.map((logs, index) =>
                            <tr key={index}>
                                <td> {logs.username} </td>
                                <td>{logs.action}</td>
                                <td>{logs.date}</td>
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

export {StudentsLogs};