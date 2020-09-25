import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';


// note: with react-router, each component needs to fetch its own data. can't rely on just one page fetching data if the user doesn't go to that page first (where data is fetched) then other pages (components) will have no data 

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        // console.log(this.props);
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    // initialValues is a special property name with redux-form
                    // title and description are initial values that were passed to redux form (inside of the field name properties of the streamForm component)
                    // the code below is the same as saying -> initialValues={{title: this.props.stream.title, description: this.props.stream.description}} // lodash _.pick method returns a new object that picks the title and description key-value pairs out (since we only care about the title and description for the initial values of the form)
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit}
                />
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    // since this component is wrapped in route component in App.js, it has props object that contains route properties (like match, location and history)
    // return stream that user is trying to edit 
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);