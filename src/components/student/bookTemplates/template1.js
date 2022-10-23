import React, { useState, useEffect, useRef } from 'react';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { SaveProgressButton } from '../';

const Template1 = ({ page }) => {
    const [text, setText] = useState("");
    
    const charLength = {
        "a": 0.04814814814,
        "A": 0.05771365149,
        "b": 0.04814814814,
        "B": 0.05771365149,
        "c": 0.04347826086,
        "C": 0.0625,
        "d": 0.04814814814,
        "D": 0.0625,
        "e": 0.04814814814,
        "E": 0.05771365149,
        "f": 0.02272727272,
        "F": 0.05263157894,
        "g": 0.04814814814,
        "G": 0.06753246753,
        "h": 0.04814814814,
        "H": 0.0625,
        "i": 0.01923076923,
        "I": 0.0243902439,
        "j": 0.01923076923,
        "J": 0.04347826086,
        "k": 0.04347826086,
        "K": 0.05771365149,
        "l": 0.01923076923,
        "L": 0.04814814814,
        "m": 0.07142857142,
        "M": 0.07142857142,
        "n": 0.04814814814,
        "N": 0.0625,
        "o": 0.04814814814,
        "O": 0.06753246753,
        "p": 0.04814814814,
        "P": 0.05771365149,
        "q": 0.04814814814,
        "Q": 0.06753246753,
        "r": 0.02857142857,
        "R": 0.0625,
        "s": 0.04347826086,
        "S": 0.05771365149,
        "t": 0.02393005062,
        "T": 0.05263157894,
        "u": 0.04814814814,
        "U": 0.0625,
        "v": 0.04347826086,
        "V": 0.05771365149,
        "w": 0.0625,
        "W": 0.08176100628,
        "x": 0.04347826086,
        "X": 0.05771365149,
        "y": 0.04347826086,
        "Y": 0.05771365149,
        "z": 0.04347826086,
        "Z": 0.05263157894,
        ".": 0.02393005062,
        ",": 0.02393005062,
        " ": 0.0238095238,
        "'": 0.01639344262,
        '"': 0.03066037735,
        "!": 0.02393005062,
        "@": 0.08754208754,
        "#": 0.04814814814,
        "$": 0.04814814814,
        "%": 0.07692307692,
        "&": 0.05771365149,
        "?": 0.04814814814,
        else: 0.04166666666,
    };
    
    function rowLimiter(event, limit) {
        // let lastSentenceLength = undefined; //make this an object with sentence length for each sentense, and it will check if it has a length already, and do it based off of that?
        const sentenceClear = [false, false, false, false, false, false, false, false, false, false, false, false, false];
        
        if (typeof event.target.value === "string"){
            //splits by next line key
            console.log(event.target.value.length)
            let values = event.target.value.replace(/\r\n/g,"\n").split("\n");
            //loop through each value in values and if total sum of individual letter lengths is larger than max length,
            //and split string at the character before that condition is met, and subtract limit param. (can also just push an empty string so length is one longer)
            //  /\ will need an object written where each character has a value of a length;
            // console.log(values)
            //loop through each sentence
            for (let i = 0; i < values.length; i++){
                let lastSentenceLength = undefined;
                let currentSentence = values[i]
                let sentenceLength = 0
                //loop through each character
                    for (let j = 0; j < currentSentence.length; j++){
                        if (sentenceClear[i] !== true){
                            console.log("hitting " + (i+1))
                            sentenceLength += (charLength?.[currentSentence[j]] ?  charLength[currentSentence[j]] : charLength.else);
                            if (sentenceLength >= 1){
                                let lastSpace = j;
                                for (let k = 0; k < j; k++){
                                    if (currentSentence[k] === " "){
                                        lastSpace = k + 1
                                    }
                                }
                                const firstPart = currentSentence.slice(lastSentenceLength ? lastSentenceLength : 0, lastSpace);
                                // if firstpart doesn't end with a space, push last word into second part
                                const secondPart = currentSentence.slice(lastSpace);
                                values.splice(i, 1, firstPart)
                                if (secondPart){
                                    values.splice(i, 1, firstPart, secondPart)
                                } else {
                                    values.splice(i, 1, firstPart)
                                }
                                sentenceClear[i] = true;
                                sentenceLength = 0;
                                lastSentenceLength = j;
                                
                            }
                        }
                    }
                }
            console.log(values)
            //possible issues = other browsers might have an issue with the font, and spacing would be different
            if (values.length > limit) {
                console.log('limit reached')
                event.target.value = values.slice(0, limit).join("\n")
            } 
        }
    }



    useEffect(() => {
        if (page.id) {
            setText(page.content || "");
        }
    }, [page])

    return (
        <div className="page-outer-div temp1-outer-div">
            <div className='text-div'>
                <textarea className="full-text-page" defaultValue={text } onChange={(event) => setText(event.target.value) }
                    rows="13" cols="30"
                    spellCheck="true"
                    onKeyPress={rowLimiter(event, 17)}
                ></textarea>
            </div>
        </div>
    );
};

export default Template1;
