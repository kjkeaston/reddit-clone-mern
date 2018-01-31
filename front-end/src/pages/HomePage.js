import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddTextPostForm from '../components/textPost/AddTextPostForm.js';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      allMyPosts: []
    }
    this.onAddNewPost = this.onAddNewPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/posts/').then( (res) => {
      // console.log(res)
      return res.json();
    }).then( (json) => {
      console.log(json);
      this.setState({
        allMyPosts: json
      })
    })
  }

  onAddNewPost(title, content, img) {
    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        thumbnail_image_url: img,
        votes: 0,
        comments: []
      })
    }).then((res) => {
      return res.json()
    }).then((newlyCreatedPost) => {
      this.setState({
        allMyPosts: this.state.allMyPosts.concat(newlyCreatedPost)
      });
    });
  }

  deletePost(post_id) {
    fetch(`http://localhost:8080/api/posts/${ post_id }`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      this.setState({
        allMyPosts: this.state.allMyPosts.filter(post => post._id !== post_id)
      });
    });
  }

  render() {
    return (
      <div className="HomePage">

        <AddTextPostForm addingNewPostPotato={ this.onAddNewPost }/>

          {this.state.allMyPosts.map(eachPost => {
            return <div id={eachPost._id} className="row">
              
                <div className="col-md-3">
                  <img height="100" width="100" src={eachPost.thumbnail_image_url} alt="added pic" />
                </div>

                <div className="col-md-3">
                  <Link to={`/posts/${eachPost._id}`}>
                    <h2>{eachPost.title}</h2>
                  </Link>
                </div>

                <div className="col-md-3">
                  <p>Votes: {eachPost.votes}</p>
                </div>

                <div className="col-md-3">
                  <button onClick={() => {this.deletePost(eachPost._id)}} className="btn btn-outline-danger">Delete</button>
                </div>
              </div>
          })
        }          
      </div>
    );
  }
}

export default HomePage;
