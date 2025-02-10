import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant'; 

import { styles } from './styles';

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const[participantName, setParticipantName] = useState('');

 

  function handleParticipantAdd(){
    if(participants.includes(participantName)){

      return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome.");
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('');
    
  }

  function handleParticipantRemove( name: string ){

    Alert.alert("Remover", `Remover o Participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(Participant => Participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
    
  }

 

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>

      <Text style={styles.eventDate}>Domingo, 9 de fevereiro de 2025</Text>



      <View style={styles.form}>
        <TextInput 
        style={styles.input} 
        placeholder="Nome do Participante"
        placeholderTextColor="#6B6B6B"
        onChangeText={setParticipantName}
        value={participantName}
        />



        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
      <Participant 
        key={item}
        name={item}
        onRemove={() => handleParticipantRemove(item)}/>

        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou ao evento ainda? Adicione participantes a sua lista de presença. 
          </Text>
        )}
      />

      

     
      
    </View>
  );
}