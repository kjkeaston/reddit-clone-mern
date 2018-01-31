import React, { Component } from 'react';
import './TextPost.css';

class AddTextPostForm extends Component {
  constructor() {
    super();
    this.state = {
      newPostTitle: '',
      newPostContent: '',
      newPostThumbnail: ''
    }

    this.addNewPost = this.addNewPost.bind(this);
    this.updatePostTitle = this.updatePostTitle.bind(this);
    this.updatePostContent = this.updatePostContent.bind(this);
    this.updatePostThumbnail = this.updatePostThumbnail.bind(this);
  }

  updatePostTitle(e) {
    this.setState({ newPostTitle: e.target.value });
  }

  updatePostContent(e) {
    this.setState({ newPostContent: e.target.value });
  }

  updatePostThumbnail(e) {
    this.setState({ newPostThumbnail: e.target.value });
  }

  // addNewPost(e) {
  //   e.preventDefault(e);
  //   this.props.addingNewPost(this.refs.title.value, this.refs.content.value, this.refs.thumbnail_image_url.value);
  // }

  addNewPost(e) {
    e.preventDefault();
    this.props.addingNewPostPotato(this.state.newPostTitle, this.state.newPostContent, this.state.newPostThumbnail);
    this.setState({
      newPostTitle: '',
      newPostContent: '',
      newPostThumbnail: ''
    });
  }

  render() {
    return (
      <div className="col-md-6">
        <form className="add-text-post-form" onSubmit={ this.addNewPost } >
          <div className="form-group">
            <input 
              value={ this.state.newPostTitle } 
              onChange={ this.updatePostTitle }
              className="form-control" 
              type="text" 
              placeholder="Title" />
          </div>
          <div className="form-group">
            <textarea 
              value={ this.state.newPostContent }
              onChange={ this.updatePostContent }
              className="form-control" 
              type="text" 
              placeholder="Content" />
          </div>
          <div className="form-group">
            <input 
              value={ this.state.newPostThumbnail }
              onChange={ this.updatePostThumbnail }
              className="form-control" 
              type="text" 
              placeholder="Image" />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-outline-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddTextPostForm;
