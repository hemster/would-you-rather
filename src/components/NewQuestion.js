import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        option1Text: '',
        option2Text: '',
        toHome: false
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { option1Text, option2Text } = this.state

        this.props.handleAddQuestion(option1Text, option2Text)

        this.setState(() => ({
            option1Text: '',
            option2Text: '',
            toHome: true
        }))
    }

    handleOptionChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { toHome, option1Text, option2Text } = this.state

        const { isLoggedIn, afterPath } = this.props;

        if (!isLoggedIn) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { afterPath: afterPath }
                }}
            />
        }

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h3 className='center'>Create New Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <p>Complete the question:</p>
                    <h3>Would you rather...</h3>
                    <textarea
                        placeholder="Option 1"
                        value={option1Text}
                        onChange={this.handleOptionChange}
                        className='textarea'
                        maxLength={280}
                        name='option1Text'
                    />
                    <h3 className='center'>or</h3>
                    <textarea
                        placeholder="Option 2"
                        value={option2Text}
                        onChange={this.handleOptionChange}
                        className='textarea'
                        maxLength={280}
                        name='option2Text'
                    />
                    <button
                        className='btn'
                        type='submit'
                        disabled={option1Text === '' || option2Text === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
        isLoggedIn: authedUser !== null,
        afterPath: '/add'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleAddQuestion: (option1Text, option2Text) => {
            dispatch(handleAddQuestion(option1Text, option2Text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)