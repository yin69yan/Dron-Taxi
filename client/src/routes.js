import Login from './pages/auth';
import Profile from './pages/profile';
import ProfileRoles from './pages/p-roles';
import Roles from './pages/roles';
import Users from './pages/users';

export const authRoutes = [
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/profile/roles',
        element: <ProfileRoles />
    },
    {
        path: '/roles',
        element: <Roles />
    },
    {
        path: '/users',
        element: <Users />
    },
    {
        path: '*',
        element: <Profile />
    }
];

export const publicRoutes = [
    {
        path: '*',
        element: <Login />
    }
];