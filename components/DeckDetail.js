import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { purple, white } from '../utils/colors';

/**
 * Class represents an individual card view 
 */
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


const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        marginTop: 12
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
    deckText: {
        fontSize: 20,
        textAlign: 'center'
    },
})

export default DeckDetail;
