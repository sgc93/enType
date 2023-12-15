const words =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit Harum veniam ipsam molestias aut at dolorem ratione non Obcaecati porro cumque error enim officia dolores soluta incidunt aliquam vel necessitatibus repellat".split(
		" "
	);
const wordsCount = words.length;

// class adder and remover

const addClass = function (element, className) {
	element.className += " " + className;
};

const removeClass = function (element, className) {
	element.className = element.className.replace(className, " ");
};

// get random word from the words' array
const getRandomWord = () => {
	const randomIndex = Math.ceil(Math.random() * wordsCount);
	return words[randomIndex - 1];
};

// format a random word

const formatWord = (word) =>
	`<div class="word"><span class="letter">${word
		.split("")
		.join('</span><span class="letter">')}</span></div>`;

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

// handle typing correctness
document.getElementById("game").addEventListener("keyup", (event) => {
	const key = event.key;
	const currentWord = document.querySelector(".word.current");
	const currentLetter = document.querySelector(".letter.current");
	const expected = currentLetter.innerHTML;
	const isLetter = key.length === 1 && key !== " ";
	const isSpace = key === " ";

	if (isLetter) {
		if (currentLetter) {
			if (expected === key) {
				removeClass(currentLetter, "error");
				addClass(currentLetter, "correct");
			} else {
				removeClass(currentLetter, "correct");
				addClass(currentLetter, "error");
			}
			removeClass(currentLetter, "current");
			addClass(currentLetter.nextSibling, "current");
		}
	}

	console.log(isSpace);
	if (isSpace) {
		if (expected !== " ") {
			const lettersToJump = [
				...document.querySelectorAll(".word.current .letter:not(.correct)"),
			];
			lettersToJump.forEach((letter) => {
				addClass(letter, "error");
			});
			removeClass(currentWord, "current");
			addClass(currentWord.nextSibling, "current");
			if (currentLetter) {
				removeClass(currentLetter, "current");
				addClass(currentWord.nextSibling.firstChild, "current");
			}
		}
	}
});

newGame();
