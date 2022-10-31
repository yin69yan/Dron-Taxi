import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes} from './routes';
import {Context} from './index';

function App() {
    const {user} = useContext(Context);
    
    return (
        <Routes>
          {publicRoutes.map(({path, element}) => <Route path={path} element={element} key={path} />)}
          {user.isAuth && authRoutes.map(({path, element}) => <Route path={path} element={element} key={path} />)}
        </Routes>
    );
}

export default App;
