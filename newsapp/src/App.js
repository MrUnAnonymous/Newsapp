import React, { useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
const alanKey = 'bc2ddd4c6c5ac601b9fbe3ca963ad7522e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {

    useEffect(() => {
        alanBtn({
            key: alanKey,
            oncommand: ({command}) => {
                if(command === 'testCommand') {
                    alert('this code was executed');
                }
            }
        })

    }, [])
    return(
        <div>
            <h1>Anonymous News App</h1>
        </div>
    );
}

export default App;