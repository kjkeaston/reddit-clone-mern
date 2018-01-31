import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddCommentForm from '../components/textPost/AddCommentForm.js';

class SinglePostPage extends Component {
  constructor() {
    super();
    this.state = {
      onePost: [],
      newComment: ''
    }
    this.onAddNewComment = this.onAddNewComment.bind(this);
  }

  componentDidMount() {
    // const { match: { params } } = this.props;
    var idOfPostToDisplay = this.props.match.params.post_id;
    fetch(`http://localhost:8080/api/posts/${idOfPostToDisplay}`).then( (res) => {
      console.log(res)
      return res.json();
    }).then( (json) => {
      // console.log(json);
      this.setState({
        onePost: json
      })
    })
  }

  onAddNewComment(content) {
    // console.log(content);
    let idOfCurrentPost = this.props.match.params.post_id;
        // console.log(this.props.match.params.post_id);
    fetch(`http://localhost:8080/api/posts/${idOfCurrentPost}/comments`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        votes: 0
      })
    }).then((res) => {
        console.log(res);
      return res.json();
    }).then((newlyCreatedComment) => {
        console.log(newlyCreatedComment);
      this.setState({
        onePost: {
          comments: this.state.onePost.comments.concat(newlyCreatedComment)
        }
      });
    });
  }

  render() {
          // console.log(this.state.onePost.comments);
    return (
      <div className="container">
        <div className="SinglePostPage">
  	      <h1>Checkout this Post</h1>
          <div key={this.state.onePost._id}>
            <div className="row">
              <div className="col-md-6">
                <img height="300" width="300" src={this.state.onePost.thumbnail_image_url} alt="added pic" />
              </div>
              <div className="col-md-6">
                <h2>{this.state.onePost.title}</h2>
                <p>{this.state.onePost.content}</p>
                <p><strong>Votes:</strong> {this.state.onePost.votes} - <button className="btn btn-outline-info btn-sm">Upvote</button></p>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-12 text-left">
                <h3>Comments</h3>
                <hr/>
              </div>
              
              <div className="col-md-6">
                {
                  (this.state.onePost.comments) && this.state.onePost.comments.map(comment => {
                    return <ul>
                        <li>{comment.content} - {comment.votes} votes - <button className="btn btn-outline-info btn-sm">Upvote</button></li>
                      </ul>
                  })
                }
              </div>
              <div className="col-md-6">
                <h4>Add a comment</h4>
                <AddCommentForm addingNewComment={this.onAddNewComment} />
              </div>
            </div>
            <Link to={'/'} className="btn btn-outline-success btn-lg">Return Home</Link>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}
// <div>{this.state.onePost.comments[1].votes}</div>

export default SinglePostPage;
