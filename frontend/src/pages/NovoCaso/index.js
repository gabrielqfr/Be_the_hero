//Bibliotecas
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

//Styles
import './styles.css'
import logoImg from "../../assets/logo.svg";

//API
import api from '../../services/api';

export default function NovoCaso(){

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleCaso(e){
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            valor
        };

        try {
            api.post('casos', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            history.push('/perfil');
        } catch (err) {
            alert('Não foi possível cadastrar o caso, tente novamente.');
        }

    }

    return(
        <div className="novo-caso-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/perfil">
                        <FiArrowLeft size={16} color="#E02041"/>
                            Voltar
                    </Link>
                </section>

                <form onSubmit={handleCaso}>
                    <input 
                        placeholder="Título do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                    />

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}