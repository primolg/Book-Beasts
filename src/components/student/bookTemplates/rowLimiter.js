function rowLimiter(event, limit) {
    
    //relative spacing for each character
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

    //sentenceClear stops function from looping over the same row
    const sentenceClear = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    
    if (typeof event.target.value === "string"){

        //values splits text into arrays based on manual nextline by user.
        let values = event.target.value.replace(/\r\n/g,"\n").split("\n");

        //loop through array of sentences
        for (let i = 0; i < values.length; i++){
            let lastSentenceLength = undefined;
            let currentSentence = values[i]
            let sentenceLength = 0
            //loop through each character
            for (let j = 0; j < currentSentence.length; j++){
                //checks if sentence has been looped through already
                if (sentenceClear[i] !== true){
                    //reads length of current sentence
                    sentenceLength += (charLength?.[currentSentence[j]] ?  charLength[currentSentence[j]] : charLength.else);
                    //checks if the sentence length is longer than a single line
                    if (sentenceLength >= 1){
                        let lastSpace = j;
                        for (let k = 0; k < j; k++){
                            //finds last space in sentence, so it can properly devide sentence into multiple without splitting words
                            if (currentSentence[k] === " "){
                                lastSpace = k + 1
                            }
                        }
                        //finds longest possible sentence until last comma & before sentence overflows
                        const firstPart = currentSentence.slice(lastSentenceLength ? lastSentenceLength : 0, lastSpace);
                        //makes the remaining sentence it's own obj
                        const secondPart = currentSentence.slice(lastSpace);
                        //replaces original sentence in array with new sentence(s)
                        if (secondPart){
                            values.splice(i, 1, firstPart, secondPart)
                        } else {
                            values.splice(i, 1, firstPart)
                        }
                        //sets (first part of) sentence as cleared
                        sentenceClear[i] = true;
                    }
                }
            }
        }
        //if limit is reached, it removes the final array after arrays are set
        if (values.length > limit) {
            console.log("page limit reached! please stop typing :'(")
            event.target.value = values.slice(0, limit).join("\n")
        } 
    }
}

export default rowLimiter