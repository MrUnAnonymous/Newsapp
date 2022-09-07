import React, {useState, useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';

import useStyles from './styles.js';
import NewsCards from "./components/NewsCards/NewsCards";

// const alanKey = 'bc2ddd4c6c5ac601b9fbe3ca963ad7522e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: 'bc2ddd4c6c5ac601b9fbe3ca963ad7522e956eca572e1d8b807a3e2338fdd0dc/stage',
            oncommand: ({command , articles}) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                }
            }
        })

    }, [])
    return(
        <div>
            <div className={classes.LogoContainer}>
                <img src="" alt="Anonymous News App Logo"/>
            </div>
            <NewsCards articles={newsArticles} />
        </div>
    );
}

export default App;