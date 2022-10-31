import React from 'react';
import {Button, Container, Row} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

const NavBarCommon = observer(() => {
    const location = useLocation();
    const isProfile = location.pathname === '/profile';
    const isUsers = location.pathname === '/users';
    const isRoles = location.pathname === '/roles';
    return (
        <Container
            style={{backgroundColor: '#8E0084'}}
        >
            <div
                className="p-4"
            >
            </div>
            <Row>
                <Button
                    className="mt-2 d-flex p-2"
                    variant='outline-light'
                    style={{backgroundColor: isProfile ? '#906782' : '#8E0084', borderColor: '#8E0084', borderRadius: 0}}
                    href='/profile'
                >
                    {/* <Image src="..//client/public/favicon.ico" className="p-2"></Image> */}
                    Профиль
                </Button>
            </Row>
            <Row>
                <Button
                    className="mt-2 d-flex p-2"
                    variant='outline-light'
                    style={{backgroundColor: isUsers ? '#906782' : '#8E0084', borderColor: '#8E0084', borderRadius: 0}}
                    href='/users'
                >
                    Упр. пользователями
                </Button>
            </Row>
            <Row>
                <Button
                    className="mt-2 d-flex p-2"
                    variant='outline-light'
                    style={{backgroundColor: isRoles ? '#906782' : '#8E0084', borderColor: '#8E0084', borderRadius: 0}}
                    href='/roles'
                >
                    Упр. ролями
                </Button>
            </Row>
            <div
                className="p-5"
            >
            </div>
            <div
                className="p-5"
            >
            </div>
            <div
                className="p-5"
            >
            </div>
            <Row>
                <Button
                    className="mt-5 d-flex p-2"
                    variant='outline-light'
                    style={{borderColor: '#8E0084', borderRadius: 0, colorHover: 'gray'}}
                    href='/'
                >
                    Выход
                </Button>
            </Row>
            <div
                className="p-2"
            >
            </div>
        </Container>
    );
});

export default NavBarCommon;
