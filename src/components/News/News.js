import React, { useState, useEffect } from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from 'words-to-numbers';
import NewsCards from "../NewsCards/NewsCards"
import { Typography } from '@material-ui/core';
import Navbar from "../Navbar/Navbar.js"
import useStyles from "./styles.js"


const alanKey = "3407b6e2b851e9d2d6e6e143f145c6c32e956eca572e1d8b807a3e2338fdd0dc/stage";

const News = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    //If command triggers, store the data in state 
                    setNewsArticles(articles)
                    //Reset active state for every new action
                    setActiveArticle(-1)
                }
                else if (command === "highlight") {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                }
                else if (command === "open") {
                    // console.log(number)
                    //"for" => 4
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > 20) {
                        alanBtn().playText("please try again.")
                    } else if (article) {
                        window.open(article.url, "_blank");
                        alanBtn().playText("Opening...")
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <div style={{ paddingBottom: "40px" }}>
                <Navbar />
            </div>

            {/* suggestion cards */}
            <div className={classes.container}>
                {newsArticles.length ? (
                    <div className={classes.infoContainer}>
                        <div className={classes.card}>
                            <Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [6]</Typography>
                        </div>
                        <div className={classes.card}>
                            <Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography>
                        </div>
                    </div>
                ) : null}
            </div>
            <br />

            {/* Pass the data as a props */}
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />

            {/* footer */}
            {!newsArticles.length ? (
                <div className={classes.footer}>
                    <Typography variant="body1" component="h2">Made with ❤️ by <a className={classes.link} href="https://www.linkedin.com/in/vivek1771/">Vivek Mehta</a>
                    </Typography>
                </div>
            ) : null}
        </div>
    )
}

export default News
