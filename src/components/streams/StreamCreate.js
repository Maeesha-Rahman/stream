import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';


class StreamCreate extends Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }
    // Field component is hooked up to this function, anytime field component calls this function, it passes its props which we destructured to get all props for input elements 
    renderInput = ({ input, label, meta }) => {
        // console.log(meta)
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        // console.log(formProps);
        // return <input onChange={formProps.input.onChange} value={formProps.input.value} />
        // another syntax to add all the props to input element 
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = formValues => {
        this.props.createStream(formValues);
    }

    render() {
        // redux form props -> console.log(this.props);
        // handleSubmit is a cb function given by redux form
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter Description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors;
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);