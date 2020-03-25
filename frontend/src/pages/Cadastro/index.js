//Bibliotecas
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

//Styles
import './styles.css';
import logoImg from "../../assets/logo.svg";

//API
import api from '../../services/api';

export default function Cadastro(){

    const history = useHistory();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [UF, setUf] = useState('');

    async function handleCadastro(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            UF
        };

        try {
            const r = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${r.data.id}`)
            history.push('/');
        } catch (err){
            alert('Erro no cadastro, tente novamente.');
        }

    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleCadastro}>
                    <input 
                        placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}    
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e=> setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e=> setCidade(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={UF}
                            onChange={e=> setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}