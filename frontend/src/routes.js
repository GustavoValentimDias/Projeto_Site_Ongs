import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon'; // ele ja pega o index na pasta, não precisa passar
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes(){ // O exact é pra ser exatamente / o caminh do logon (caso contrario, a tela logom aparece em todas as outras)
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon}/>
            <Route path="/register" component={Register}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/incidents/new" component={NewIncident}/>
        </Switch>
        </BrowserRouter>
    );
}