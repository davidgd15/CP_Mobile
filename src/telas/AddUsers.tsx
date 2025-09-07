import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Usuario = {
  id: string;
  nome: string;
  email: string;
  avatar: number;
};

const STORAGE_KEY = '@usuarios_app';

export default function AddUsers() {
  const navigation = useNavigation<NavigationProp>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [avatarSelecionado, setAvatarSelecionado] = useState<number | null>(null);

  const avatares = [
    require('../assets/avatar1.jpeg'),
    require('../assets/avatar2.jpeg'),
    require('../assets/avatar3.jpeg'),
  ];

  const handleSalvar = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (avatarSelecionado === null) {
      Alert.alert('Erro', 'Por favor, selecione um avatar');
      return;
    }

    try {
      const novoUsuario: Usuario = {
        id: Date.now().toString(),
        nome,
        email,
        avatar: avatarSelecionado,
      };

      const usuariosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      let usuarios: Usuario[] = [];
      
      if (usuariosSalvos) {
        usuarios = JSON.parse(usuariosSalvos);
      }

      usuarios.push(novoUsuario);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));

      setNome('');
      setEmail('');
      setAvatarSelecionado(null);

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Users') }
      ]);

    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Adicionar Usuário</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
        keyboardType="email-address"
      />
      
      <Text style={styles.subtitulo}>Escolha um avatar:</Text>
      
      <View style={styles.containerAvatares}>
        {avatares.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setAvatarSelecionado(index)}
            style={[
              styles.avatarContainer,
              avatarSelecionado === index && styles.avatarSelecionado
            ]}
          >
            <Image
              source={avatar}
              style={styles.avatar}
            />
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ed145b',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
    marginTop: 10,
  },
  containerAvatares: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 50,
    padding: 5,
  },
  avatarSelecionado: {
    borderColor: 'white',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  botaoSalvar: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#ed145b',
    fontSize: 18,
    fontWeight: 'bold',
  },
});