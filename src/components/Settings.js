import React from "react";
import {NavBar} from "./NavBar";
import {Button, Form, FormGroup} from "react-bootstrap";
import {api} from "../api/app"

class Settings extends React.Component {
    constructor(props) {
        super(props);

        let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null;
        this.state = {
            userId: user.id,
            report: false,
            currentReportStatus: false,
            frequency: 'DAY',
            email: '',
            error: ''
        }
    }

    componentWillMount() {
        api.getReportInfo(this.state.userId)
            .then(response => {
                this.setState({report: response.data.enable})
                this.setState({currentReportStatus: response.data.enable})
                if (response.data.enable === true) {
                    this.setState({frequency: response.data.frequency})
                }
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    emailInputForm = (event) => {
        this.setState({email: event.target.value});
    }

    changeReportStatus = () => {
        this.setState({report: !this.state.report})
    }

    changeFrequency = (event) => {
        this.setState({frequency: event.target.name})
    }

    confirmChanging = () => {
        console.log(this.state.report)
        if (this.state.currentReportStatus === false && this.state.report === true) {
            api.turnOnReports({userId: this.state.userId, frequency: this.state.frequency})
                .then(() => {
                    this.setState({currentReportStatus: true})
                })
                .catch(err => {
                    this.setState({error: err.response.data.message})
                })
        }
        if (this.state.currentReportStatus === true && this.state.report === false) {
            api.turnOffReports(this.state.userId)
                .then(() => {
                    this.setState({currentReportStatus: false})
                })
                .catch(err => {
                    this.setState({error: err.response.data.message})
                })
        }
        if (this.state.currentReportStatus === this.state.report) {
            api.setUpReports({userId: this.state.userId, frequency: this.state.frequency})
                .catch(err => {
                    this.setState({error: err.response.data.message})
                })
        }
    }

    changeEmail = (event) => {
        event.preventDefault()
        api.changeEmail({
            userId: this.state.userId,
            email: this.state.email
        })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })

    }

    render() {
        return (
            <div>
                <NavBar/>

                <div className="settings">
                    <Form.Group>
                        <Form.Label className="loginLabelFont">Your new e-mail:</Form.Label>
                        <div className="d-flex align-items-end">
                            <Form.Control type="email" value={this.state.email} onChange={this.emailInputForm}/>
                            <Button className="ml-2" onClick={this.changeEmail}>Edit</Button>
                        </div>
                    </Form.Group>

                    <FormGroup className="mt-5">
                        <Form.Label className="loginLabelFont">Customize your reports:</Form.Label>
                        <div className="d-flex">
                            <Form.Check type="switch" id="report-switch" label="Allow receiving the reports"
                                        checked={this.state.report} onClick={this.changeReportStatus}/>
                            <Button className="report-button" onClick={this.confirmChanging}>Edit</Button>
                        </div>

                        <Form.Check inline name="DAY" label="Day"
                                    checked={this.state.frequency === "DAY"}
                                    onChange={this.changeFrequency}
                                    type="checkbox"
                                    id="DAY"/>
                        <Form.Check inline name="WEEK" label="Week"
                                    checked={this.state.frequency !== "DAY"}
                                    onChange={this.changeFrequency}
                                    type="checkbox"
                                    id="WEEK"/>
                    </FormGroup>
                </div>
            </div>

        )
    }
}

export {Settings};