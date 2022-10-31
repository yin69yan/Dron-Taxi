import React from 'react';
import {Button, Col, Container, /* Image, */ Row} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

const NavBarProfile = observer(() => {
    const location = useLocation();
    const isProfile = location.pathname === '/profile';
    const isProfileRoles = location.pathname === '/profile/roles';
    return (
        <Container
            style={{backgroundColor: '#8E0084'}}
        >
            <Row
                md={5}
            >
                <Col>
                    <Button
                        className="d-flex justify-content-center"
                        variant='outline-light'
                        style={{backgroundColor: isProfileRoles ? '#AA0A9D' : '#8E0084', borderColor: '#8E0084', borderRadius: 0}}
                        href='/profile'
                    >
                        Личные данные
                    </Button>
                </Col>
                <Col>
                    <Button
                        className="d-flex justify-content-center"
                        variant='outline-light'
                        style={{backgroundColor: isProfile ? '#AA0A9D' : '#8E0084', borderColor: '#8E0084', borderRadius: 0}}
                        href='/profile/roles'
                    >
                        Роли
                    </Button>
                </Col>
            </Row>
            <div
                className='p-5'
            >
                <Row
                    className='justify-content-end'
                >
                    <Button
                        variant='outline-light'
                        style={{width: 200, backgroundColor: '#00C3FF', color: 'white', borderColor: 'white'}}
                        href='/profile/roles'
                    >
                        Редактировать
                    </Button>
                </Row>
                <Row
                    className='my-3 mb-5'
                >
                    <Col
                        md={2}
                        className='d-flex justify-content-center align-items-center'
                    >
                        {/* <Image src='//client/public/logo192.png'></Image> */}
                    </Col>
                    <Col
                        md={5}
                    >
                        <Row>
                            <Row
                                className='d-flex justify-content-start'    
                            >
                                Фамилия
                            </Row>
                            <Row
                                className='mt-3'
                            >
                                Тодаренко
                            </Row>
                        </Row>
                        <Row>
                            <Row
                                className='mt-2'
                            >
                                Имя
                            </Row>
                            <Row
                                className='mt-3'
                            >
                                Регина
                            </Row>
                        </Row>
                        <Row>
                            <Row
                                className='mt-2'
                            >
                                Отчество
                            </Row>
                            <Row
                                className='mt-3'
                            >
                                Петровна
                            </Row>
                        </Row>
                        <Row>
                            <Col>
                                <Row
                                    className='mt-2'
                                >
                                    Дата рождения
                                </Row>
                                <Row
                                    className='mt-3'
                                >
                                    14.06.1990
                                </Row>
                            </Col>
                            <Col>
                                <Row
                                    className='mt-2'
                                >
                                    Пол
                                </Row>
                                <Row
                                    className='mt-3'
                                >
                                    Женский
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Row
                                className='mt-2'
                            >
                                Email
                            </Row>
                            <Row
                                className='mt-3'
                            >
                                todor@mail.ru
                            </Row>
                        </Row>
                        <Row>
                            <Row
                                className='mt-2'
                            >
                            Телефон</Row>
                            <Row>скрыт</Row>
                        </Row>
                        <Row>
                            <Row
                                className='mt-3'
                            >
                                Пароль
                            </Row>
                            <Row>......</Row>
                        </Row>
                    </Col>
                </Row>
            </div>
            
        </Container>
    );
});

export default NavBarProfile;
