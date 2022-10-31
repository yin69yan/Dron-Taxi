import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, FormControl, Row} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import {Login, Registration} from '../http/userAPI';
import {Context} from '../index';
import {observer} from 'mobx-react-lite';

const Auth = observer( () => {
    const {user} = useContext(Context);
    const navigation = useNavigate();
    const location = useLocation();
    const isRegistration = location.pathname === '/registration';
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        let data;
        if (isRegistration) {
            data = await Registration(login, password);
        } else {
            data = await Login(login, password);
        }
        console.log(data);

        user.setUser(user);
        user.setIsAuth(true);
    };

    return (
        <Container style={{width: '900', height: '300', backgroundColor: '#7A3D81'}}>
            <div
                className="p-5"
            >
            </div>
            <div
                className="p-3"
            >
            </div>
            <Row>
                <Col>
                    <Card
                    className="p-5"
                    style={{width: 450, backgroundColor: '#7A3D81'}}
                    >
                        <h5
                            style={{color: 'white'}}
                        >
                            {isRegistration ? "РЕГИСТРАЦИЯ" : "АВТОРИЗАЦИЯ"}
                        </h5>
                        <Form
                            className="d-flex flex-column">
                            <label
                                className="mt-3"
                                style={{color: '#D4C7C8'}}
                            >
                                Логин
                                <FormControl
                                    className="mt-2"
                                    style={{borderColor: '#38D1FF'}}
                                    placeholder="Введите логин"
                                    value={login}
                                    onChange={e => setLogin(e.target.value)}
                                />
                            </label>
                            <label
                                className="mt-3"
                                style={{color: '#D4C7C8', borderColor: '#38D1FF'}}
                            >
                                Пароль
                                <FormControl
                                    className="mt-2"
                                    style={{borderColor: '#38D1FF'}}
                                    placeholder="Введите пароль"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </label>
                            <Row className="d-flex justify-content-between mt-4">
                                <Col>
                                    <Form.Check
                                        
                                    id="remember" type="checkbox" label="Запомнить" style={{color: 'white', borderColor: 'white'}} />
                                </Col>
                                <Col>
                                    <Button
                                        variant="info"
                                        style={{width: 200, backgroundColor: '#00C3FF', color: 'white', borderColor: 'white'}}
                                        onClick={click}
                                    >
                                        {isRegistration ? "Зарегистрироваться" : "Войти"}
                                    </Button> 
                                </Col>
                            </Row>
                            <Button className="mt-4"
                                style={{backgroundColor: '#36FF78', color: 'black', borderColor: 'white'}}
                                onClick={() => isRegistration ? navigation.push('/login') : navigation.push('/registration')}
                            >
                                {isRegistration ? "Авторизация" : "Регистрация"}
                            </Button>
                        </Form>
                    </Card>
                </Col>
                <Col>
                    {/* <Image src= '../client/public/Dron-Taxi.png'></Image> */}
                </Col>
            </Row>
            
            <div
                className="p-5"
            >
            </div>
            <div
                className="p-5"
            >
            </div>
        </Container>
    );
});

export default Auth;