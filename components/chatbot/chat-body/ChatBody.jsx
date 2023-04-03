import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './chatbody.style';

export default function ChatBody({ conversations, isKeyboardOpen }) {
  const scrollViewRef = useRef();

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isKeyboardOpen]);

  return (
    <View style={styles.container(isKeyboardOpen)}>
      <ScrollView ref={scrollViewRef} onContentSizeChange={scrollToBottom}>
        {conversations.map((message) => (
          <View
            key={message.content.substring(0, 5)}
            style={[styles.message, styles[message.role]]}
          >
            <Text style={styles.sender}>{message.role === 'assistant' ? 'ShowJob Assistant' : 'You'}</Text>
            <Text style={styles[`${message.role}`]}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
