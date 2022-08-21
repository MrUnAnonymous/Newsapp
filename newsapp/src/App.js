import React, {useState, useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from "./components/NewsCards/NewsCards";

const alanKey = 'bc2ddd4c6c5ac601b9fbe3ca963ad7522e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        alanBtn({
            key: alanKey,
            oncommand: ({command , articles}) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                }
            }
        })

    }, [])
    return(
        <div>
            <h1>Anonymous News App</h1>
            <NewsCards articles={newsArticles} />
        </div>
    );
}

export default App;