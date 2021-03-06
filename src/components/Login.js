import React from 'react';
import {Form, Button, Alert, Tabs, Tab, OverlayTrigger, Tooltip, FormGroup, Spinner} from "react-bootstrap";
import {api} from "../api/app"
import {history} from "../utils";
import {MEMBERS} from "../routes";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: "STUDENT",
            email: "",
            error: "",
            spinner: false
        };
    }

    componentWillMount() {
        if (localStorage.getItem("user")) {
            history.replace(MEMBERS)
        }
    }

    nameInputForm = (event) => {
        this.setState({username: event.target.value});
    }

    emailInputForm = (event) => {
        this.setState({email: event.target.value});
    }

    nameInput = () => (
        <Form.Group>
            <Form.Label className="loginLabelFont">Your name:</Form.Label>
            <Form.Control type="login" value={this.state.username} onChange={this.nameInputForm}/>
        </Form.Group>
    )

    emailInput = () => (
        <FormGroup>
            <Form.Label className="loginLabelFont">Your e-mail:</Form.Label>
            <OverlayTrigger placement="right" overlay={
                <Tooltip id="tooltip">
                    This field is optional. You can change your email at any time in the settings
                </Tooltip>
            }>
                <Form.Control type="email" value={this.state.email} onChange={this.emailInputForm}/>
            </OverlayTrigger>
        </FormGroup>
    )

    studentLogin = () => (
        <Form onSubmit={this.signIn}>
            {this.nameInput()}
            {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
            <Button variant="primary" type="submit" block className="form-btn">
                Login
            </Button>
        </Form>
    )

    teacherLogin = () => (
        <Form onSubmit={this.signIn}>
            <Form.Group>
                {this.nameInput()}
                {this.emailInput()}
            </Form.Group>
            {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
            <Button variant="primary" type="submit" block className="form-btn">
                Login
            </Button>
        </Form>
    )

    signIn = (event) => {
        event.preventDefault();
        this.setState({hidden: !this.state.hidden})

        api.signIn({
            username: this.state.username,
            role: this.state.role,
            email: this.state.email
        })
            .then(response => {
                this.setState({hidden: !this.state.hidden})
                localStorage.setItem("user", JSON.stringify(response.data))

                history.replace(MEMBERS)
            })
            .catch(err => {
                this.setState({hidden: !this.state.hidden})
                this.setState({error: err.response.data.message})
            })
    }

    render() {
        return (

            <div>
                <Spinner className="spinner" hidden={!this.state.hidden} animation="border" variant="primary"/>

                <div className="login" hidden={this.state.hidden}>
                    <Tabs defaultActiveKey="STUDENT" id="controlled-tab-example"
                          onSelect={eventKey => this.setState({role: eventKey})}>
                        <Tab eventKey="STUDENT" title="Student">
                            {this.studentLogin()}
                        </Tab>
                        <Tab eventKey="TEACHER" title="Teacher">
                            {this.teacherLogin()}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export {Login};