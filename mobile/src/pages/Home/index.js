//Bibliotecas
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

//Styles
import styles from './styles';
import logoImg from '../../assets/logo.png';

//API
import api from '../../services/api';

export default function Home() {
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(caso){
        navigation.navigate('Casos', { caso });
    }

    async function loadIncidents() {
        if (loading){
            return;
        }

        if (total > 0 && casos.length === total){
            return;
        }

        setLoading(true);

        const r = await api.get('casos', {
            params: { page }
        });

        setCasos([... casos, ... r.data]);
        setTotal(r.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect (() =>{
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

                <Text style={styles.title}>Bem-Vindo!</Text>
                <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

                <FlatList
                    data={casos} 
                    style={styles.incidentList}
                    keyExtractor={caso => String(caso.id) }
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadIncidents}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: caso }) => (
                        <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{caso.nome}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{caso.titulo}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(caso.valor)}</Text>
                        
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(caso)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes.</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                    )}
                />
            
        </View>
    )
}