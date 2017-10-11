import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { receieveDecks } from "../actions";
import { getAllDecks } from '../utils/api';
import { AppLoading } from 'expo';
import { white } from '../utils/colors';

class DeckList extends Component {

    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        getAllDecks()
            .then((decks) => dispatch(receieveDecks(decks)))
            .then(() => this.setState(() => ({ ready: true })));
    }

    render() {
        const { decks } = this.props;
        const { ready } = this.state;

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                {decks !== null && Object.keys(decks).map((key) => {
                    const { title, questions } = decks[key];
                    const numOfQuestions = questions === undefined ? 0 : questions.length;
                    return (
                        <TouchableOpacity key={key}
                            onPress={() => this.props.navigation.navigate(
                                'DeckDetail',
                                { entryId: key, numCards: numOfQuestions })}
                        >
                            <View key={key} style={styles.item}>
                                <Text style={styles.deckText}>{title}</Text>
                                <Text style={styles.deckText}>{numOfQuestions} cards</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    deckText: {
        fontSize: 20,
        textAlign: 'center'
    }
});

function mapStateToProps(decks) {
    return {
        decks: decks
    }
}

export default connect(mapStateToProps, )(DeckList);