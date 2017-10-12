import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { receieveDecks } from "../actions";
import { getAllDecks } from '../utils/api';
import { AppLoading } from 'expo';
import styles from './style';

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
            <View style={styles.containerList}>
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

function mapStateToProps(decks) {
    return {
        decks: decks
    }
}

export default connect(mapStateToProps, )(DeckList);