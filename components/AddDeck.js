import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import { addDeck } from '../actions';
import { submitDeck } from '../utils/api';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { purple, white } from '../utils/colors';

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

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  titleText: {
    fontSize: 28,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  }
})

export default connect(null, { addDeck })(AddDect);



