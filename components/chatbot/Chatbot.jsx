import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import getChatService from '../../services/openai';

import styles from './chatbot.style';
import { COLORS, icons } from '../../constants';

import ChatBody from './chat-body/ChatBody';

const initalDialog = [{ role: 'assistant', content: 'Hi, how can I help you today?' }];

function Chatbot({ isModalOpen, setIsModalOpen }) {
  const [dialog, setDialog] = useState(initalDialog);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateDialog = () => {
    setDialog((prev) => [
      ...prev,
      {
        role: 'user',
        content: inputValue,
      },
    ]);

    setInputValue('');
  };

  const getAnswer = useCallback(async () => {
    if (dialog.length === 1) return;
    if (dialog[dialog.length - 1].role === 'assistant') return;

    setIsLoading(true);

    const answer = await getChatService(dialog);

    setDialog((prev) => [
      ...prev,
      {
        role: answer.message.role,
        content: answer.message.content,
      },
    ]);

    setIsLoading(false);
  }, [dialog]);

  useEffect(() => {
    getAnswer();
  }, [dialog, getAnswer]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalOpen(true)} style={styles.chatButton}>
        <Image style={styles.chatIcon} resizeMode="contain" source={icons.chat} />
      </TouchableOpacity>

      <Modal visible={isModalOpen} animationType="slide" transparent>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.exitButton} onPress={() => setIsModalOpen(false)}>
            <Image style={styles.exitIcon} resizeMode="contain" source={icons.exit} />
          </TouchableOpacity>

          <View style={{ position: 'absolute', top: 17.5, left: 120 }}>
            <Text style={styles.chatbotTitle}>ShowJob Chatbot</Text>
          </View>

          {isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator style size="small" color={COLORS.primary} />
            </View>
          )}

          <ChatBody style={styles.loader} conversations={dialog} isKeyboardOpen={isKeyboardOpen} />

          <TextInput
            onSubmitEditing={() => updateDialog()}
            onChangeText={(text) => setInputValue(text)}
            autoCorrect={false}
            value={inputValue}
            style={styles.inputField(isKeyboardOpen)}
            placeholder="Ask me something..."
          />
        </View>
      </Modal>
    </View>
  );
}

export default Chatbot;
