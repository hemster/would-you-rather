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
        const { dispatch } = this.props

        dispatch(handleAddQuestion(option1Text, option2Text))

        this.setState(() => ({
            option1Text: '',
            option2Text: ''
        }))
    }

    handleOpt1Change = (e) => {
        const option1Text = e.target.value

        this.setState(() => ({
            option1Text
        }))
    }

    handleOpt2Change = (e) => {
        const option2Text = e.target.value

        this.setState(() => ({
            option2Text
        }))
    }

    render() {
        const { toHome, option1Text, option2Text } = this.state

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
                        onChange={this.handleOpt1Change}
                        className='textarea'
                        maxLength={280}
                    />
                    <h3 className='center'>or</h3>
                    <textarea
                        placeholder="Option 2"
                        value={option2Text}
                        onChange={this.handleOpt2Change}
                        className='textarea'
                        maxLength={280}
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
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)