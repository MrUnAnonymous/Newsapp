import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/logo.jpeg'
//import Toggle from 'react-toggle'

import { NewsCards } from './components';
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [theme, setTheme] = useState("light-theme");

  const toggleTheme = () => {
    if(theme === "light-theme"){
      setTheme("dark-theme")
    }else{
      setTheme("light-theme")
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: 'bc2ddd4c6c5ac601b9fbe3ca963ad7522e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2" className={classes.textcolor}>Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
         <img src={logo} className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://github.com/MrUnAnonymous"> Saurabh Sapkal</a>
          </Typography>
        </div>
      ) : null}
      <button className={classes.darkModeButton} onClick={() => toggleTheme()}>
        <img className={classes.darkModeImage} src="https://img.icons8.com/external-regular-kawalan-studio/100/000000/external-dark-mode-user-interface-regular-kawalan-studio.png"alt='Dark Mode Button' />
      </button>
    </div>
  );
};
export default App;