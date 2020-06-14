import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // useHistory é para voltar para a tela inicial apos efetuar o cadastro
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){ // A propriedade style no placeholer UF, permite usar CSS sem criar um arquivo próprio nessa parte (interessante)!
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){ // Função para conectar Back com front para cadastrar usuario (colocamos form onSubmit abaixo, antes tinha só form)
        e.preventDefault();  // prevenir que fique atualizando desnecessariamente

        const data = { // Precisamos enviar para a API
            name,
            email,
            whatsapp,
            city,
            uf,
        }

        try{
            const response = await api.post('ongs', data) // Await para esperar finalizar (ao utilizar, tem que colocar async na function, lá em cima)

            alert(`Seu ID de acesso: ${response.data.id}`) // Para colocar variaveis, tem que usar a CRASE ao inves das aspas!!

            history.push('/') // volta pra tela inicial após efetuar o caadstro
        } catch(err){
            alert('Erro no cadastro, tente novamente')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02001"/>
                        Não tenho cadastro
                    </Link> 
                </section>
                <form onSubmit={handleRegister}> 
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                    <input 
                        type="email" // Faz precisar de um @, caso contrário não deixa
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} 
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} 
                        />
                        <input 
                        placeholder="UF" 
                        style={{width: 80}}
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        /> 
                    </div>
                    <button className= "button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}