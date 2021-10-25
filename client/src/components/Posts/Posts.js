import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from '../Pagination';


const Posts = () => {
    const classes = useStyles();
    const posts = useSelector(state => state.posts)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOffirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOffirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        !posts.length ? <CircularProgress /> : (

            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                <Grid item xs={7} sm={7}>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                    />
                </Grid>
                {currentPosts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts