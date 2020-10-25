import React from "react";
import {api} from "../api/app"
import {NavBar} from "./NavBar";
import {Alert, Button, Table, Form} from "react-bootstrap";
import filter from "../filter.svg"
import {history} from "../utils";
import {MEMBERS} from "../routes";

class StudentsLogs extends React.Component {
    constructor(props) {
        super(props);

        let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        this.state = {
            studentId: sessionStorage.getItem("studentId") ? sessionStorage.getItem("studentId") : null,
            role: user ? user.role : "",
            actions: [],
            startPeriod: "",
            endPeriod: "",
            logs: null,
            error: "",
            hiddenField: true
        }
    }

    componentWillMount() {
        if(this.state.role === "STUDENT") {
            history.replace({MEMBERS})
        }

        api.getAllStudentsLogs(this.state.studentId, "")
            .then(response => {
                this.setState({logs: response.data})
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    hiddenButton = (event) => {
        event.preventDefault();
        this.setState({hiddenField: !(this.state.hiddenField)})
    }

    chooseAction = (event) => {
        const {name, checked} = event.target;
        this.setState({
            actions: checked
                ? [...this.state.actions, name]
                : this.state.actions.filter(item => item !== name)
        })
    }

    filterLogs = (event) => {
        event.preventDefault();
        const {endPeriod, startPeriod} = this.state
        let time

        if (endPeriod === "" || startPeriod === "") {
            time = ""
        } else {
            time = this.state.startPeriod + ":" + this.state.endPeriod
        }

        if (this.state.actions.length) {
            api.getStudentsLogs(this.state.actions.toString(), this.state.studentId, time)
                .then(response => {
                    this.setState({logs: response.data})
                })
                .catch(err => {
                    this.setState({error: err.response.data.message})
                })
        } else {
            api.getAllStudentsLogs(this.state.studentId, time)
                .then(response => {
                    this.setState({logs: response.data})
                })
                .catch(err => {
                    this.setState({error: err.response.data.message})
                })
        }

        this.setState({actions: [], endPeriod: "", startPeriod: ""})
    }

    pickStartPeriod = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        this.setState({startPeriod: event.target.value})
        console.log(this.state.startPeriod)
    }

    pickEndPeriod = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        this.setState({endPeriod: event.target.value})
        console.log(this.state.startPeriod)
        console.log(this.state.endPeriod)
    }

    render() {
        return (
            <div>
                <NavBar/>

                <div>
                    <div className="filter-section">
                        <div className="d-flex align-items-end">
                            <div className="d-flex">

                                <Form.Group>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type="date" value={this.state.startPeriod}
                                                  onChange={this.pickStartPeriod}/>
                                </Form.Group>
                                <Form.Group className="ml-2">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="date" value={this.state.endPeriod}
                                                  onChange={this.pickEndPeriod}/>
                                </Form.Group>
                            </div>
                            <Button variant="light" onClick={this.hiddenButton} className="filter-button">
                                <img src={filter} height="20" width="20" alt={"filter"}/>
                            </Button>
                            <Button type="submit" onClick={this.filterLogs} className="filter-button">Search</Button>
                        </div>
                        <div id="filter" hidden={this.state.hiddenField}>
                            <Form.Check inline name="SIGN_IN" label="Sign in"
                                        checked={this.state.actions.indexOf("SIGN_IN") !== -1}
                                        onChange={this.chooseAction}
                                        type="checkbox"
                                        id="SIGN_IN"/>
                            <Form.Check inline name="SIGN_OUT" label="Sign out"
                                        checked={this.state.actions.indexOf("SIGN_OUT") !== -1}
                                        onChange={this.chooseAction}
                                        type="checkbox"
                                        id="SIGN_OUT"/>
                            <Form.Check inline name="HAND_UP" label="Hand up"
                                        checked={this.state.actions.indexOf("HAND_UP") !== -1}
                                        onChange={this.chooseAction}
                                        type="checkbox"
                                        id="HAND_UP"/>
                            <Form.Check inline name="HAND_DOWN" label="Hand down"
                                        checked={this.state.actions.indexOf("HAND_DOWN") !== -1}
                                        onChange={this.chooseAction}
                                        type="checkbox" id="HAND_DOWN"/>

                        </div>
                    </div>


                    {this.state.logs &&
                    <Table className="tables">
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
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                </div>
            </div>
        )
    }
}

export {StudentsLogs};