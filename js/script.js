const words =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit Harum veniam ipsam molestias aut at dolorem ratione non Obcaecati porro cumque error enim officia dolores soluta incidunt aliquam vel necessitatibus repellat".split(
		" "
	);
const wordsCount = words.length;

// get random word from the words' array
const getRandomWord = () => {
	const randomIndex = Math.ceil(Math.random() * wordsCount);
	return words[randomIndex];
};

// format a random word

const formatWord = (word) =>
	`<div class="word">
        <span class="letter">
            ${word.split("").join('</span><span class="letter">')}
        </span>
    </div>`;

// initiate game

const newGame = () => {
	document.getElementById("words").innerHTML = ""; // clearing
	for (var i = 0; i < 200; i++) {
		document.getElementById("words").innerHTML += formatWord(getRandomWord());
	}
};

newGame();
