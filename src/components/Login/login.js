import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './styles/login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function validateForm() {
        return email.length > 0 && password.length > 0
    }

    function handleLogin(event) {
        event.preventDefault()
        if (email === "admin@gmail.com" && password === "123456") {
            localStorage.setItem("isAuthenticated", "true")
            window.location.pathname = "/dashboard"
        }
    }

    useEffect(() => {
        const authCheck = localStorage.getItem("isAuthenticated")
        if (authCheck) {
            window.location.pathname = "/dashboard"
        }
    })

    return(
        <div className='Login'>
            <Form onSubmit={handleLogin}>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    )
}