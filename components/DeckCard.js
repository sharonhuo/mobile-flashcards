import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import { gray, purple, white } from '../utils/colors';
import { addCard } from '../actions';
import { submitCard } from '../utils/api';
import { connect } from 'react-redux';
import styles from './style';

class DeckCard extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
            title: title,
         //   headerLeft: null, //remove the back button
        }
    }

    state = {
        question: '',
        answer: ''
    }

    handleQuestion = (text) => {
        this.setState({ question: text })
    }

    handleAnswer = (text) => {
        this.setState({ answer: text })
    }

    submit = () => {
        const title = this.props.navigation.state.params.title;
        const entry = { question: this.state.question, answer: this.state.answer };
        if (this.state.question.length === 0 || this.state.answer.length === 0) {
            Alert.alert(
                " ",
                "Please enter question and answer fields."
            );
            return;
        } 
        this.props.addCard(title, entry);
        this.setState(() => ({ question: '', answer: ''}));
        this.toHome(title, this.props.decks[title].questions.length);
        submitCard(title, entry)
    }

    toHome = (title, numCards) => {
        this.props.navigation.navigate(
            'DeckDetail',
            {
                entryId: title,
                numCards: numCards
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Question</Text>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#9a73ef"
                    placeholder="Enter the question"
                    autoCapitalize="none"
                    value={this.state.question} 
                    onChangeText={this.handleQuestion} />

                <Text>Answer</Text>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Enter the answer"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    value={this.state.answer} 
                    onChangeText={this.handleAnswer} />

                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={() => this.submit(this.state.title)} >
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks: decks
    }
}

export default connect(mapStateToProps, { addCard })(DeckCard);