import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import NavBar from './navBarCommon';

const Users = observer( () => {
    return (
        <Container style={{backgroundColor: '#8E0084'}}>
            <Row
                className="p-3"
                style={{backgroundColor: '#8E0084', color: 'white'}}
            >
                <h3
                    className='mt-3'
                >
                    DRON TAXI
                </h3>
            </Row>
            <Row>
                <Col
                    className="p-4"
                    md={3}
                >
                    <NavBar/>
                </Col>
                <Col md={10}
                    style={{backgroundColor: '#700068', color: 'white'}}
                >
                    {/* <Image src= '../client/public/Dron-Taxi.png'></Image> */}
                </Col>
            </Row>
        </Container>
    );
});

export default Users;