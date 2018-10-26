import React, { Component } from "react";
import PostForm from "./PostForm";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export default class NewPost extends Component {
    render() {
        return (
            <div>
                <h1>New Post</h1>
                <Mutation mutation={NEW_POST}>
                    {createPost => <PostForm onSubmit={createPost} />}
                </Mutation>
            </div>
        );
    }
}

const NEW_POST = gql`
    mutation addPost($title: String!, $body: String) {
        createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
            title
            body
            id
        }
    }
`;

/*
* To use graphql mutation form within one component
import React, { Component } from "react";
import PostForm from "./PostForm";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export default class NewPost extends Component {
    state = {
        title: "",
        body: ""
    };

    handleInput = e => {
        const formData = {};
        formData[e.target.name] = e.target.value;
        this.setState({ ...formData });
    };

    render() {
        const { title, body } = this.state;
        return (
            <div>
                <h1>New Post</h1>
                <Mutation mutation={NEW_POST} variables={{ title, body }}>
                    {createPost => (
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                createPost()
                                    .then(() => {
                                        this.setState({ title: "", body: "" });
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    });
                            }}
                        >
                            <input
                                name="title"
                                type="text"
                                onChange={this.handleInput}
                                value={title}
                                placeholder="title"
                            />
                            <textarea
                                name="body"
                                type="text"
                                onChange={this.handleInput}
                                value={body}
                                placeholder="body"
                            />
                            <button>Submit</button>
                        </form>
                    )}
                </Mutation>
            </div>
        );
    }
}

const NEW_POST = gql`
    mutation addPost($title: String!, $body: String) {
        createPost(data: { status: PUBLISHED, title: title, body: $body }) {
            title
            body
            id
        }
    }
`;
*/
