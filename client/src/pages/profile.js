import React, {useContext} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Context} from '../index';
import {observer} from 'mobx-react-lite';
import NavBarCommon from './navBarCommon';
import NavBarProfile from './navBarProfile';

const Profile = observer( () => {
    const {user} = useContext(Context);
    const navigation = useNavigate();
    return (
        <Container style={{backgroundColor: '#8E0084'}}>
            <Row
                className="p-3"
                style={{backgroundColor: '#8E0084', color: 'white'}}
            >
                <h3
                    className="mt-3"
                >
                    DRON TAXI
                </h3>
            </Row>
            <Row>
                <Col
                    className="p-4"
                    md={3}
                >
                    <NavBarCommon />
                </Col>
                <Col md={9}
                    style={{backgroundColor: '#700068', color: 'white'}}
                >
                    <div
                        className="mt-2 p-4"
                    >
                        <Row>
                            <h3
                                className='d-flex justify-content-start'
                            >
                                Мой профиль
                            </h3>
                        </Row>
                        <Row>
                            <NavBarProfile />
                        </Row>
                    </div>
                    
                </Col>
            </Row>
        </Container>
    );
});

export default Profile;