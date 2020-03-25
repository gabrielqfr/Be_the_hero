//Bibliotecas
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

//styles e imgs
import './styles.css';
import logoImg from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from 'react-icons/fi';

//API
import api from '../../services/api';

export default function Profile(){
    const [casos, setCasos] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');

    useEffect(() => {
        api.get('perfil', {
            headers: {
                Authorization: ongId,
            }
        }).then(r => {
            setCasos(r.data);
        })
    }, [ongId]);

    async function handleDeleteCaso(id){
        try {
          await api.delete(`casos/${id}`, {
              headers: {
                  Authorization: ongId,
              }
          });

          setCasos(casos.filter(caso => caso.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso.');
        }
    }

    function handleLogOut(){
        localStorage.clear();
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongNome}</span>

                <Link className="button" to="caso/novo">
                    Cadastrar novo caso
                </Link>
                <button onClick={() => handleLogOut()} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                    <strong>CASO:</strong>
                    <p>{caso.titulo}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{caso.descricao}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}</p>

                    <button onClick={() => handleDeleteCaso(caso.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}