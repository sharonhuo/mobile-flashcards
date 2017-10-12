import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import { addDeck } from '../actions';
import { submitDeck } from '../utils/api';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './style';

class AddDect extends Component {
  state = {
    title: '',
    questions: []
  }

  handleTitle = (text) => {
    this.setState({ title: text, questions: [] })
  }

  submit = (title) => {
    if (title.length === 0) {
      Alert.alert(
        " ",
        "Please enter the title of the deck."
      );
      return;
    }
    const deck = this.state;
    this.props.addDeck(deck);
    this.setState(() => ({ title: '', questions: [] }))
    this.toHome(title);
    submitDeck({ title, deck })
  }

  toHome = (title) => {
    this.props.navigation.navigate(
      'DeckDetail',
      { entryId: title, numCards: 0 })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>What is the title of your new deck?</Text>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Deck title"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          value={this.state.title}
          onChangeText={this.handleTitle} />

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={() => this.submit(this.state.title)} >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, { addDeck })(AddDect);



