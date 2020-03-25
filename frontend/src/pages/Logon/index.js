//Bibliotecas
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';


//styles e imgs
import './styles.css';
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";


//API
import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const r = await api.post('login', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', r.data.nome);
            history.push('/perfil');
        } catch (err) {
            alert('Falha no login, tente novamente');
        }

    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e=> setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/cadastro">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}