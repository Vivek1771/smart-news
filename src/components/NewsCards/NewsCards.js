import React from 'react'
import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow } from "@material-ui/core"
import PropTypes from 'prop-types';
import useStyles from './styles.js';
import InfoCards from "../InfoCards/InfoCards.js"


const NewsCards = ({ articles, activeArticle }) => {
    // console.log(articles);
    const classes = useStyles();

    if (!articles.length) {
        return (
            <InfoCards />
        )
    }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }} key={i}>
                        <NewsCard article={article} i={i} activeArticle={activeArticle} />
                    </Grid>
                ))}
            </Grid>
        </Grow>
    )
}



NewsCards.propTypes = {
    articles: PropTypes.array,
    activeArticle: PropTypes.number
}

export default NewsCards;



