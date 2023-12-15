const words =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit Harum veniam ipsam molestias aut at dolorem ratione non Obcaecati porro cumque error enim officia dolores soluta incidunt aliquam vel necessitatibus repellat".split(
		" "
	);
const wordsCount = words.length;

// class adder and remover

const addClass = function (element, className) {
	element.classList.add(className);
};

const removeClass = function (element, className) {
	element.className = element.className.replace(className, " ");
};

// get random word from the words' array
const getRandomWord = () => {
	const randomIndex = Math.ceil(Math.random() * wordsCount);
	return words[randomIndex];
};

// format a random word

const formatWord = (word) =>
	`<div class="word">
        <span class="letter">
            ${word && word.split("").join('</span><span class="letter">')}
        </span>
    </div>`;

// initiate game

const newGame = () => {
	document.getElementById("words").innerHTML = ""; // clearing
	var i;
	for (i = 0; i < 200; i++) {
		document.getElementById("words").innerHTML += formatWord(getRandomWord());
	}

	addClass(document.querySelector(".word"), "current");
	addClass(document.querySelector(".letter"), "current");
};

document.getElementById("game").addEventListener("keyup", (event) => {
	const key = event.key;
});

newGame();
