import React from 'react';
import {Form, Button, Alert} from "react-bootstrap";
import {api} from "../api/app"
import {history} from "../utils";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            error: {}
        };
    }

    componentWillMount() {
        if(localStorage.getItem('user')) {
            history.replace('/member')
        }
    }

    onChangeInput = (event) => {
        this.setState({username: event.target.value});
    }

    signIn = (event) => {
        event.preventDefault();

        api.signIn(this.state)
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
                <Form onSubmit={this.signIn}>
                    <Form.Group>
                        <Form.Label className="loginLabelFont">Your name:</Form.Label>
                        <Form.Control type="login" value={this.state.username} onChange={this.onChangeInput}/>
                    </Form.Group>
                    {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
                    <Button variant="primary" type="submit" block className="form-btn">
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}

export {Login};