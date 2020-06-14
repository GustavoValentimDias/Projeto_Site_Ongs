import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // para não haver uma travadinha
import { FiLogIn } from 'react-icons/fi'; // fi de feather icons, um pacote de icones (existem varios), pegamos só u icone de lá

import api from '../../services/api';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){ // Inicialmente, os icones, botões e etc são jogadas na tela, organizamos usando o CSS (styles.css)
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id); // salva as variáveis na memria do navegador, para kostrar no profile
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile')
        }catch (err){
            alert('Falha no login, tente novamente')
        }
    }

    return(
        <div className="logon-container">  
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className= "button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02001"/>
                        Não tenho cadastro
                    </Link> 
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}