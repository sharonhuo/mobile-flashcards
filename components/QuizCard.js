import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import { green, white, red } from "../utils/colors"
import { fetchDeck } from "../actions";
import TextButton from "./TextButton";
import { clearLocalNotification, setLocalNotification } from "../utils/api";

class QuizCard extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            //     headerLeft: null,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            questionAnswered: 0,
            showQuestion: true,
            numOfCorrectAnswer: 0
        }
    }

    componentDidMount() {
        const title = this.props.navigation.state.params.title;
        this.props.fetchDeck(title);
    }

    renderQuestion() {
        const { decks } = this.props;
        const title = this.props.navigation.state.params.title;
        const currentDeck = decks[title];
        const totQuestions = currentDeck.questions.length;
        const currentQuestionNum = this.state.questionAnswered;
        const currentQuestion = currentDeck.questions[currentQuestionNum];
        const questionAnsweredText = `${currentQuestionNum + 1}/${currentDeck.questions.length}`;
        const questionText = currentQuestion === undefined ? '' : currentQuestion.question;
        const answerText = currentQuestion === undefined ? '' : currentQuestion.answer;

        return (
            <View style={styles.card}>
                {this.state.showQuestion &&
                    <Text style={{ fontSize: 20, textAlign: 'center', paddingTop: 50 }}>{questionText}</Text>}
                {!this.state.showQuestion &&
                    <Text style={{ fontSize: 20, textAlign: 'center', paddingTop: 50 }}>{answerText}</Text>}

                {currentQuestion !== undefined &&
                    <TextButton style={{ margin: 20 }} onPress={this.toggle.bind(this)}>
                        {this.state.showQuestion ? 'Show answer' : 'Show question'}
                    </TextButton>
                }

                {this.state.questionAnswered < totQuestions &&
                    this.renderAnswerButtons(title)}

            </View>
        )
    }

    renderAnswerButtons() {
        return (
            <View>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.AndroidCorrectBtn}
                    onPress={() => this.submit('correct')} >
                    <Text style={styles.deckText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosInorrectBtn : styles.AndroidIncorrectBtn}
                    onPress={() => this.submit('incorrect')} >
                    <Text style={styles.deckText}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderRouterButtons(title) {
        return (
            <View>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.AndroidCorrectBtn}
                    onPress={() => this.props.navigation.navigate(
                        'QuizCard',
                        { title: title })}>
                    <Text style={styles.deckText}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.AndroidCorrectBtn}
                    onPress={() => this.props.navigation.navigate(
                        'DeckDetail',
                        { entryId: title })}>
                    <Text style={styles.deckText}>Back to Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.AndroidCorrectBtn}
                    onPress={() => this.props.navigation.navigate(
                        'Home')}>
                    <Text style={styles.deckText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        )
    }

    toggle() {
        const { showQuestion } = this.state;
        this.setState({
            showQuestion: !showQuestion,
        });
    }

    submit(answer) {
        const { decks } = this.props;
        const title = this.props.navigation.state.params.title;
        const currentDeck = decks[title];
        const { numOfCorrectAnswer, questionAnswered } = this.state;

        if (answer === 'correct') {
            this.setState({ numOfCorrectAnswer: numOfCorrectAnswer + 1 })
        }

        this.setState({ questionAnswered: questionAnswered + 1 });

        // Clear local notification
        clearLocalNotification()
            .then(setLocalNotification);
    }

    render() {
        const { decks } = this.props;
        const title = this.props.navigation.state.params.title;
        const currentDeck = decks[title];
        const totQuestions = currentDeck.questions.length;
        const score = this.state.numOfCorrectAnswer == 0 ? 0 :
            Math.round((this.state.numOfCorrectAnswer / currentDeck.questions.length * 100) * 10) / 10;
        return (
            <View style={styles.container}>
                {currentDeck.questions.length === 0 &&
                    <Text>Please add card first.</Text>
                }

                {currentDeck.questions.length > 0 &&
                    this.renderQuestion()
                }

                {currentDeck.questions.length !== 0 && this.state.questionAnswered === currentDeck.questions.length &&
                    <Text style={{ fontSize: 20, textAlign: 'center', paddingTop: 50 }}>Score: {score}%</Text>
                }

                {currentDeck.questions.length !== 0 && this.state.questionAnswered === currentDeck.questions.length &&
                    this.renderRouterButtons(title)}

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
    card: {
        flexDirection: 'column',
        marginTop: 12
    },
    deckText: {
        fontSize: 20,
        textAlign: 'center',
        color: white,
    },
    iosCorrectBtn: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidCorrectBtn: {
        backgroundColor: green,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iosInorrectBtn: {
        backgroundColor: red,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidIncorrectBtn: {
        backgroundColor: red,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

function mapStateToProps(decks) {
    return {
        decks: decks
    }
}

export default connect(mapStateToProps, { fetchDeck })(QuizCard);