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
	for (i = 0; i < 3; i++) {
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
	const expected = currentLetter?.innerHTML || " ";
	const isLetter = key.length === 1 && key !== " ";
	const isSpace = key === " ";
	const isBackspace = key === "Backspace";
	const isFirstLetter = currentLetter === currentWord.firstChild;
	const isFirstWord = Boolean(!currentWord.previousSibling);
	const isLastWord = Boolean(!currentWord.nextSibling);
	console.log(isLastWord);
	console.log("key :" + key + ", expected :" + expected);
	// console.log("current letter: " + currentLetter.innerHTML);

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
			if (currentLetter.nextSibling) {
				addClass(currentLetter.nextSibling, "current");
			}
		} else if (!isLastWord) {
			const extraLetter = document.createElement("span");
			extraLetter.innerHTML = key;
			extraLetter.className = "letter error extra";
			currentWord.appendChild(extraLetter);
		}
	}

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
		} else {
			removeClass(currentWord, "current");
			addClass(currentWord.nextSibling, "current");
			addClass(currentWord.nextSibling.firstChild, "current");
		}
	}

	if (isBackspace) {
		if (currentLetter && isFirstLetter && !isFirstWord) {
			// make previous word current and its last letter current
			removeClass(currentWord, "current");
			addClass(currentWord.previousSibling, "current");
			removeClass(currentLetter, "current");
			addClass(currentWord.previousSibling.lastChild, "current");
			removeClass(currentWord.previousSibling.lastChild, "correct");
			removeClass(currentWord.previousSibling.lastChild, "error");
		}

		if (currentLetter && !isFirstLetter) {
			removeClass(currentLetter, "current");
			addClass(currentLetter.previousSibling, "current");
			removeClass(currentLetter.previousSibling, "correct");
			removeClass(currentLetter.previousSibling, "error");
		}

		if (currentWord && !currentLetter) {
			addClass(currentWord.lastChild, "current");
			removeClass(currentWord.lastChild, "correct");
			removeClass(currentWord.lastChild, "error");
		}
	}

	// handle cursor movement
	const nextLetter = document.querySelectorAll(".letter.current");
	const cursor = document.getElementById("cursor");
	let left = 226;
	if (currentLetter) {
		// cursor.style.top = "10px";
		left += 10;
		cursor.style.left = left + "px";
	}
});
newGame();
