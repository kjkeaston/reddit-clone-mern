import React, { Component } from 'react';
import './TextPost.css';

class AddCommentForm extends Component {
  constructor() {
    super();
    this.state = {
      newCommentContent: ''
    }

    this.addNewComment = this.addNewComment.bind(this);
    this.updateCommentContent = this.updateCommentContent.bind(this);
  }

  updateCommentContent(e) {
    this.setState({ newCommentContent: e.target.value });
  }

  addNewComment(e) {
    e.preventDefault();
    this.props.addingNewComment(this.state.newCommentContent);
    this.setState({
      newCommentContent: ''
    });
  }

  render() {
    return (
      <form className="" onSubmit={this.addNewComment}>
        <div className="form-group">
          <input 
            value={ this.state.newCommentContent } 
            onChange={ this.updateCommentContent }
            className="form-control" 
            type="text" 
            placeholder="Add comment here!" />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-outline-primary" />
        </div>
      </form>
    );
  }
}

export default AddCommentForm;
