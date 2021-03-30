import React from 'react'
import { Grid, Grow, Typography } from "@material-ui/core"
import useStyles from './styles.js';



const infoCards = [
    { color: '#2D68C4', title: 'Latest News', text: 'What does this app do? Give me the latest news.' },
    { color: '#073980', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'What is the recent news about Technology' },
    { color: '#000080', title: 'News by Terms', info: 'Coronavirus, PlayStation, Smartphones, Narendra Modi...', text: 'What\'s up with Narendra Modi' },
    { color: '#3F00FF', title: 'News by Sources', info: 'The Times of India, CNN, Wired, BBC News, IGN, Buzzfeed, Tech crunch...', text: 'Give me the news from CNN' },
];



const InfoCards = () => {
    const classes = useStyles();

    return (
        <div>
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {infoCards.map((infoCard, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard} key={i}>
                            <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                                <Typography variant="h5">
                                    {infoCard.title}
                                </Typography>
                                {infoCard.info
                                    ? (<Typography variant="h6">
                                        <strong>
                                            {infoCard.title.split(" ")[2]}:
                                        </strong>
                                        <br />
                                        {infoCard.info}
                                    </Typography>) : null}
                                <Typography variant="h6">
                                    Try saying: <br /> <i>{infoCard.text}</i>
                                </Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        </div>
    )
}

export default InfoCards
