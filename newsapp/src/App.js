import React, {useState, useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles.js';

// const alanKey = 'bc2ddd4c6c5ac601b9fbe3ca963ad7522e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticles , setActiveArticles] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: 'bc2ddd4c6c5ac601b9fbe3ca963ad7522e956eca572e1d8b807a3e2338fdd0dc/stage',
            oncommand: ({ command , articles , number}) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticles(-1);
                } else if(command === 'hightlight'){
                    setActiveArticles((prevActiveArticles) => prevActiveArticles + 1);
                } else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number,  { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20){
                        alanBtn().playText('Please try again.');
                    } else if(article){
                        window.open(article[number].url, '_blank');
                        alanBtn().playText('Opening......');
                    }                
                }
            }
        })

    }, [])
    return(
        <div>
            <div className={classes.LogoContainer}>
                <img src="" alt="Anonymous News App Logo"/>
            </div>
            <NewsCards articles={newsArticles}  activeArticles={activeArticles} />
        </div>
    );
}

export default App;