import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export default class Posts extends Component {
    render() {
        return (
            <div>
                <Link className="button" to={"/post/new"}>
                    New Post
                </Link>
                <ol className="posts-listing">
                    <Query query={POSTS_QUERY}>
                        {({ loading, data, fetchMore }) => {
                            if (loading) return "loading...";
                            const { posts } = data;
                            return (
                                <React.Fragment>
                                    {posts.map(post => (
                                        <li key={post.id}>
                                            <Link to={`/post/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() =>
                                                /**
                                                 * fetchMore will send an update query to server
                                                 */
                                                fetchMore({
                                                    variables: {
                                                        skip: posts.length
                                                    },
                                                    updateQuery: (
                                                        prev,
                                                        { fetchMoreResult }
                                                    ) => {
                                                        /**
                                                         * updateQuery will be called after receive update query
                                                         * we want to update Apollo
                                                         * "prev" argument is the previous data
                                                         * "featchMoreResult" is the new received update data
                                                         */
                                                        if (!fetchMoreResult)
                                                            return prev;

                                                        return Object.assign(
                                                            {},
                                                            prev,
                                                            {
                                                                posts: [
                                                                    ...prev.posts,
                                                                    ...fetchMoreResult.posts
                                                                ]
                                                            }
                                                        );
                                                    }
                                                })
                                            }
                                        >
                                            Load More
                                        </button>
                                    </li>
                                </React.Fragment>
                            );
                        }}
                    </Query>
                </ol>
            </div>
        );
    }
}

const POSTS_QUERY = gql`
    query allPosts($skip: Int) {
        posts(orderBy: createdAt_DESC, first: 10, skip: $skip) {
            id
            title
            body
        }
    }
`;
