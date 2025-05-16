/* ------------------------------------------------------------------------ *  
4 states per letter: Transparent | Line | Block | Visible.
These states are shuffled for a unique "decode" effect each time.
* ------------------------------------------------------------------------ */

function decodeText() {
    // Set the paragraph you want to decode
    const inputText = "This is the paragraph that will be decoded on the homepage.";
    const textContainer = document.getElementById('decodeTextContainer');

    // Clear previous content
    textContainer.innerHTML = '';

    // Create text animation elements
    for (let char of inputText) {
        const charDiv = document.createElement('div');
        charDiv.classList.add('text-animation');
        charDiv.innerText = char === ' ' ? ' ' : char.toUpperCase(); // Handle spaces
        textContainer.appendChild(charDiv);
    }

    // Assign the placeholder array its places
    const state = Array.from(textContainer.children).map((_, index) => index);

    // Shuffle the array to get new sequences each time
    const shuffled = shuffle(state);

    for (let i = 0, j = shuffled.length; i < j; i++) {
        const child = textContainer.children[shuffled[i]];
        const classes = child.classList;

        // Fire the first one at random times
        const state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
        if (classes.contains('text-animation')) {
            setTimeout(firstStages.bind(null, child), state1Time);
        }
    }
}

// The rest of your existing JavaScript functions (firstStages, secondStages, thirdStages, shuffle)
// ...


// send the node for later .state changes
function firstStages(child){
    if( child.classList.contains('state-2') ){   
        child.classList.add('state-3');
    } else if( child.classList.contains('state-1') ){
        child.classList.add('state-2')
    } else if( !child.classList.contains('state-1') ){
        child.classList.add('state-1');
        setTimeout(secondStages.bind(null, child), 100);
    }    
}
function secondStages(child){
    if( child.classList.contains('state-1') ){
        child.classList.add('state-2')
        setTimeout(thirdStages.bind(null, child), 100);
    } 
    else if( !child.classList.contains('state-1') )
    {
        child.classList.add('state-1')
    }
}
function thirdStages(child){
    if( child.classList.contains('state-2') ){
        child.classList.add('state-3')
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

document.addEventListener('DOMContentLoaded', function() {
    decodeText();
    setInterval(decodeText, 10000);
});