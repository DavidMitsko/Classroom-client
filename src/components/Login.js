import React from 'react';
import {Form, Button, Alert, Tabs, Tab, OverlayTrigger, Tooltip, FormGroup} from "react-bootstrap";
import {api} from "../api/app"
import {history} from "../utils";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            role: 'STUDENT',
            email: '',
            error: ''
        };
    }

    componentWillMount() {
        if(localStorage.getItem('user')) {
            history.replace('/members')
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
                    Email
                </Tooltip>
            }>
                <Form.Control type="email" value={this.state.email} onChange={this.emailInputForm}/>
            </OverlayTrigger>
        </FormGroup>
    )

    studentLogin = () => (
        <Form onSubmit={this.signIn}>
            {this.nameInput()}
            {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
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
            {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
            <Button variant="primary" type="submit" block className="form-btn">
                Login
            </Button>
        </Form>
    )

    signIn = (event) => {
        event.preventDefault();

        api.signIn({
            username: this.state.username,
            role: this.state.role,
            email: this.state.email
        })
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data))

                history.replace("/members")
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
            })
    }

    render() {
        return (
            <div className="login">
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
        )
    }
}

export {Login};