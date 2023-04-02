import React, { useState } from 'react';
import { View, TouchableOpacity, Button, Modal, TextInput, Image } from 'react-native';

import styles from './chatbot.style';
import { icons } from '../../constants';

function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSendInput = () => {
    // Send the input value to the chatbot endpoint
    fetch('https://api.openai.com/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_API_KEY',
      },
      body: JSON.stringify({
        prompt: inputValue,
        temperature: 0.7,
        max_tokens: 100,
        stop: ['\n'],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the chatbot response
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Close the modal
    setIsModalOpen(false);
    setInputValue('');
  };

  return (
    <View>
      <TouchableOpacity
        title="How can I help you?"
        onPress={() => setIsModalOpen(true)}
        style={styles.chatButton}
      >
        {/* <Text style={styles.chatIcon}>?</Text> */}
        <Image style={styles.chatIcon} resizeMode="contain" source={icons.chat} />
      </TouchableOpacity>
      <Modal visible={isModalOpen} animationType="slide">
        <View style={styles.modalView}>
          <TextInput
            style={styles.inputField}
            value={inputValue}
            onChangeText={handleInputChange}
          />
          <Button title="Send" onPress={handleSendInput} />
          <Button title="Cancel" onPress={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
}

export default Chatbot;
