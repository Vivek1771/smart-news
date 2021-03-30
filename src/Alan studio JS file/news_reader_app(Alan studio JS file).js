intent("What does this app do?", "What can I do here?", "What is this?",
      reply("This is a smart news application. It can provide the most recent news from various resources. You can get the latest news by saying give me the latest news. You can also get the latest news by categories, by terms and by sources. Please refer to the instructions mentioned in the cards."));


const API_KEY = "45ecbd1bbafa43ad89330dc6e45da810"
let savedArticles = []

// News by Source
intent("Give me the news from $(source* (.*))", (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    //User input can be any: BBC NEWS / BBCNEWS / bbcnews
    //Desired input to make proper api call: bbc-news 
    if(p.source.value){
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join("-")}`
    }
    //API_Request
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        //If no articles related to given source
        if(!articles.length){
            p.play("Sorry, try different source");
            return;
        }
        //If articles are present
        savedArticles = articles;
        p.play({ command: "newHeadlines", articles})
        p.play(`Here are the (latest|recent) news from ${p.source.value}.`);
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);        
    })   
})

//News by Term
intent("what\'s up with $(term* (.*))", (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if(p.term.value){
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
    }
    //API_Request
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        //If no articles related to given term
        if(!articles.length){
            p.play("Sorry, try searching for something else.");
            return;
        }
        //If articles are present
        savedArticles = articles;
        p.play({ command: "newHeadlines", articles})
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
 
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })   
})

// News by category
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(what is|what's) (the|) (recent|latest|) (news|) (about|) $(C~ ${CATEGORIES_INTENT})`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
    
    if(p.C.value){
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    //API_Request
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        //If no articles related to given category
        if(!articles.length){
            p.play("Sorry, try different category");
            return;
        }
        //If articles are present
        savedArticles = articles;
        p.play({ command: "newHeadlines", articles})
        p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })   
})

//latest News
intent('Give me the latest news', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

    //API_Request
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        savedArticles = articles;
        p.play({ command: "newHeadlines", articles})
        p.play(`Here are the (latest|recent) news.`);
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })   
})

//Reading confirmation
const confirmation = context(() => {
    intent('yes', async (p) => {
        for(let i = 0; i < savedArticles.length; i++){
            p.play({ command: 'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    intent('no', (p) => {
        p.play('okay')
    })
})

//For opening specific article
intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
        p.play({ command:'open', number: p.number.value, articles: savedArticles})
    }
})

//For go back
intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newHeadlines', articles: []})
})