import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { purple, white } from '../utils/colors';
import styles from './style';

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const entryId = navigation.state.params.entryId;
        return {
            title: `${entryId}`,
         //   headerLeft: null,  // remove the back key
        }
    }

    render() {
        const title = this.props.navigation.state.params.entryId;
        const numOfCard = this.props.navigation.state.params.numCards;

        return (
            <View style={styles.card}>
                <Text style={styles.deckText}>{this.props.navigation.state.params.entryId}</Text>
                <Text style={styles.deckText}>{numOfCard} cards</Text>

                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={() => this.props.navigation.navigate(
                        'DeckCard',
                        { title: title }
                    )}>
                    <Text style={styles.submitBtnText}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={() => this.props.navigation.navigate(
                        'QuizCard',
                        { title: title }
                    )}>
                    <Text style={styles.submitBtnText}>Start Quiz</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default DeckDetail;
