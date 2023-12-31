const toEnglish = document.getElementById("english");
const toProgramming = document.getElementById("programming");
const languages = document.getElementById("languages");
const levels = document.getElementById("level");
const easyLevel = document.getElementById("easy");
const medLevel = document.getElementById("medium");
const hardLevel = document.getElementById("difficult");
const time15 = document.getElementById("time15");
const time30 = document.getElementById("time30");
const time60 = document.getElementById("time60");
const time120 = document.getElementById("time120");
const toJs = document.getElementById("js");
const toPython = document.getElementById("python");
const toJava = document.getElementById("java");
const toDart = document.getElementById("dart");
const toCSharp = document.getElementById("cSharp");
const toCPlus = document.getElementById("cPlusPlus");
const toC = document.getElementById("c");

const resultBox = document.getElementById("result");
const wpm = document.getElementById("wpm");
const test = document.getElementById("test");
const testTime = document.getElementById("testTime");

const gamePage = document.getElementById("gamePage");
const aboutPage = document.getElementById("about");
const aboutBtn = document.getElementById("aboutBtn");
const closeBtn = document.getElementById("closeBtn");
const contactPage = document.getElementById("contactPage");
const contactBtn = document.getElementById("contactBtn");
const closeContact = document.getElementById("closeContactBtn");

const themeBtn = document.getElementById("themeBtn");
const themeList = ["theme_one", "theme_two", "theme_three", "theme_four"];

window.timer = null;
window.startTime = null;
window.endTime = null;

// class adder and remover
const addClass = function (element, className) {
	if (element) element.className += " " + className;
};

const removeClass = function (element, className) {
	element.className = element.className.replace(className, " ");
};

// get random word from the words' array
const getRandomWord = (wordsCount) => {
	const randomIndex = Math.ceil(Math.random() * wordsCount);
	return words[randomIndex - 1];
};

// format a random word

const formatWord = (word) =>
	word
		? `<div class="word"><span class="letter">${word
				.split("")
				.join('</span><span class="letter">')}</span></div>`
		: "";

// initiate game

let words = easyEng;
let testType = "English | easy";
let wordsCount = words.length;
let gameTime = 30 * 1000;
const newGame = (type, lev, dur) => {
	removeClass(resultBox, "app_result");
	addClass(resultBox, "hidden");
	document.getElementById("words").innerHTML = ""; // clearing
	document.getElementById("cursor").style.left = 390 + "px";
	document.getElementById("cursor").style.top = 383 + "px";
	document.getElementById("words").style.marginTop = "0px";
	removeClass(restart, "show");
	addClass(restart, "hidden");
	window.startTime = null;
	window.endTime = null;
	window.timer = null;

	if (type) {
		words = type;
		testType = lev;
	}
	if (dur) {
		gameTime = dur * 1000;
	}

	if (document.querySelector("#game.over")) {
		document.querySelector("#game.over").classList.remove("over");
	}

	for (var i = 0; i < 200; i++) {
		document.getElementById("words").innerHTML += formatWord(
			getRandomWord(wordsCount)
		);
	}
	document.getElementById("timer").innerHTML = gameTime / 1000 + "";
	addClass(document.querySelector(".word"), "current");
	addClass(document.querySelector(".letter"), "current");
};

const getWPM = () => {
	const allWords = [...document.querySelectorAll(".word")];
	const lastTypedWord = document.querySelector(".word.current");
	const lastTypedWordIndex = allWords.indexOf(lastTypedWord);
	const typedWords = allWords.slice(0, lastTypedWordIndex);
	const correctWords = typedWords.filter((word) => {
		const letters = [...word.children];
		const correctLetters = letters.filter((letter) =>
			letter.className.includes("correct")
		);
		const incorrectLetters = letters.filter((letter) =>
			letter.className.includes("error")
		);
		return incorrectLetters.length === 0;
	});

	const WPM = (correctWords.length / gameTime) * 60000;
	console.log("correct words: " + correctWords.length);
	return WPM;
};

const gameOver = () => {
	clearInterval(window.timer);
	addClass(document.getElementById("game"), "over");
	document.getElementById("timer").innerHTML = getWPM() + " WPM";
	wpm.innerHTML = getWPM() + "";
	test.innerHTML = testType;
	testTime.innerHTML = gameTime / 1000 + " Secs";
};

const showModal = (element, className) => {
	if (element.classList.contains("hidden")) {
		removeClass(element, "hidden");
		addClass(element, className);
	}
};

const hideModal = (element, className) => {
	if (element.classList.contains(className)) {
		removeClass(element, className);
		addClass(element, "hidden");
	}
};

const toggleOnMOdal = (element, className) => {
	if (element.classList.contains("hidden")) {
		showModal(element, className);
	} else {
		hideModal(element, className);
	}
};

let themeIndex = 0;
const toggleTheme = () => {
	themeList.forEach((cl) => {
		removeClass(document.body, cl);
	});
	document.body.classList.add(themeList[themeIndex]);
	if (themeIndex < 3) {
		themeIndex += 1;
	} else {
		themeIndex = 0;
	}
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
	const isLastLetter = currentLetter === currentWord.lastChild;
	const isFirstWord = Boolean(!currentWord.previousSibling);
	const isLastWord = Boolean(!currentWord.nextSibling);
	const restart = document.getElementById("restart");

	if (!window.timer && isLetter) {
		window.timer = setInterval(() => {
			if (!window.startTime) {
				window.startTime = new Date().getTime();
			}
			const currentTime = new Date().getTime();
			const msPassed = currentTime - window.startTime;
			const sPassed = Math.round(msPassed / 1000);
			const sRemain = gameTime / 1000 - sPassed;
			if (sRemain <= 0) {
				removeClass(restart, "hidden");
				addClass(restart, "show");
				removeClass(resultBox, "hidden");
				addClass(resultBox, "app_result");
				gameOver();
				return;
			}
			const timerInfo = document.getElementById("timer");
			timerInfo.innerHTML = sRemain + "";
		}, 1000);
	}

	// game over

	if (document.querySelector("#game.over")) {
		return;
	}

	if (isLetter) {
		//  handle typing alphabetical letters
		if (currentLetter) {
			addClass(currentLetter, key === expected ? "correct" : "error");
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

	// handle spacing
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

	// handle backspace
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

	// handle line moves
	console.log(currentWord.getBoundingClientRect().top);
	if (currentWord.getBoundingClientRect().top > 450) {
		const words = document.getElementById("words");
		const margin = parseInt(words.style.marginTop || "0px");
		words.style.marginTop = margin - 35 + "px";
	}

	// handle cursor movement
	const nextLetter = document.querySelector(".letter.current");
	const nextWord = document.querySelector(".word.current");
	const cursor = document.getElementById("cursor");
	if (nextLetter) {
		cursor.style.top = nextLetter.getBoundingClientRect().top + "px";
		cursor.style.left = nextLetter.getBoundingClientRect().left + "px";
	} else {
		cursor.style.top = nextWord.getBoundingClientRect().top + "px";
		cursor.style.left = nextWord.getBoundingClientRect().right + "px";
	}

	// cursor.style.top =
	// 	(nextLetter || nextWord).getBoundingClientRect().top + nextLetter
	// 		? 4
	// 		: 8 + "px";
	// cursor.style.left =
	// 	(nextLetter || nextWord).getBoundingClientRect()[
	// 		nextLetter ? "left" : "right"
	// 	] + "px";
});

// handling pressing Enter, Control, Esc and ArrowUp

document.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		clearInterval(timer);
		gameOver();
		newGame();
	}

	if (event.key === "Escape") {
		toggleOnMOdal(aboutPage, "app__aboutPage");
	}

	if (event.key === "Control") {
		toggleOnMOdal(contactPage, "app__contactPage");
	}

	if (event.key === "ArrowUp") {
		toggleTheme();
	}
});

// handle switching between English and Programming

toProgramming.addEventListener("click", () => {
	removeClass(toEnglish, "active");
	addClass(toProgramming, "active");
	removeClass(languages, "hidden");
	addClass(languages, "show");
	removeClass(levels, "show");
	addClass(levels, "hidden");

	clearInterval(timer);
	gameOver();
	newGame(jsCode, "Coding | JavaScript");
});

toEnglish.addEventListener("click", () => {
	removeClass(toProgramming, "active");
	addClass(toEnglish, "active");
	removeClass(levels, "hidden");
	addClass(levels, "show");
	removeClass(languages, "show");
	addClass(languages, "hidden");

	clearInterval(timer);
	gameOver();
	newGame(easyEng, "English | easy");
});

// handle switching between durations

time15.addEventListener("click", () => {
	removeClass(time30, "active");
	removeClass(time60, "active");
	removeClass(time120, "active");
	addClass(time15, "active");

	clearInterval(timer);
	gameOver();
	newGame("", " ", 15);
});

time30.addEventListener("click", () => {
	removeClass(time15, "active");
	removeClass(time60, "active");
	removeClass(time120, "active");
	addClass(time30, "active");

	clearInterval(timer);
	gameOver();
	newGame("", " ", 30);
});

time60.addEventListener("click", () => {
	removeClass(time30, "active");
	removeClass(time15, "active");
	removeClass(time120, "active");
	addClass(time60, "active");

	clearInterval(timer);
	gameOver();
	newGame("", " ", 60);
});

time120.addEventListener("click", () => {
	removeClass(time30, "active");
	removeClass(time60, "active");
	removeClass(time15, "active");
	addClass(time120, "active");

	clearInterval(timer);
	gameOver();
	newGame("", " ", 120);
});

// handle levels
easyLevel.addEventListener("click", () => {
	removeClass(medLevel, "active");
	removeClass(hardLevel, "active");
	addClass(easyLevel, "active");

	clearInterval(timer);
	gameOver();
	newGame(easyEng, "English | easy", 0);
});

medLevel.addEventListener("click", () => {
	removeClass(hardLevel, "active");
	removeClass(easyLevel, "active");
	addClass(medLevel, "active");

	clearInterval(timer);
	gameOver();
	newGame(midEng, "English | medium", 0);
});

hardLevel.addEventListener("click", () => {
	removeClass(medLevel, "active");
	removeClass(easyLevel, "active");
	addClass(hardLevel, "active");

	clearInterval(timer);
	gameOver();
	newGame(hardEng, "English | difficult", 0);
});

// handle language switching

toPython.addEventListener("click", () => {
	removeClass(toJs, "active");
	removeClass(toJava, "active");
	removeClass(toDart, "active");
	removeClass(toCSharp, "active");
	removeClass(toCPlus, "active");
	removeClass(toC, "active");
	addClass(toPython, "active");

	clearInterval(timer);
	gameOver();
	newGame(pythonCode, "Codding | Python", 0);
});

toJava.addEventListener("click", () => {
	removeClass(toJs, "active");
	removeClass(toPython, "active");
	removeClass(toDart, "active");
	removeClass(toCSharp, "active");
	removeClass(toCPlus, "active");
	removeClass(toC, "active");
	addClass(toJava, "active");

	clearInterval(timer);
	gameOver();
	newGame(javaCode, "Coding | Java", 0);
});

toDart.addEventListener("click", () => {
	removeClass(toJs, "active");
	removeClass(toJava, "active");
	removeClass(toPython, "active");
	removeClass(toCSharp, "active");
	removeClass(toCPlus, "active");
	removeClass(toC, "active");
	addClass(toDart, "active");

	clearInterval(timer);
	gameOver();
	newGame(dartCode, "Coding | Dart", 0);
});

toCSharp.addEventListener("click", () => {
	removeClass(toJs, "active");
	removeClass(toJava, "active");
	removeClass(toPython, "active");
	removeClass(toDart, "active");
	removeClass(toCPlus, "active");
	removeClass(toC, "active");
	addClass(toCSharp, "active");

	clearInterval(timer);
	gameOver();
	newGame(cSharp, "Coding | C#", 0);
});

toCPlus.addEventListener("click", () => {
	removeClass(toJs, "active");
	removeClass(toJava, "active");
	removeClass(toPython, "active");
	removeClass(toDart, "active");
	removeClass(toCSharp, "active");
	removeClass(toC, "active");
	addClass(toCPlus, "active");

	clearInterval(timer);
	gameOver();
	newGame(cPlusCode, "Coding | C++", 0);
});

toC.addEventListener("click", () => {
	removeClass(toJs, "active");
	removeClass(toJava, "active");
	removeClass(toPython, "active");
	removeClass(toDart, "active");
	removeClass(toCSharp, "active");
	removeClass(toCPlus, "active");
	addClass(toC, "active");

	clearInterval(timer);
	gameOver();
	newGame(cCode, "Coding | C", 0);
});

toJs.addEventListener("click", () => {
	removeClass(toC, "active");
	removeClass(toJava, "active");
	removeClass(toPython, "active");
	removeClass(toDart, "active");
	removeClass(toCSharp, "active");
	removeClass(toCPlus, "active");
	addClass(toJs, "active");

	clearInterval(timer);
	gameOver();
	newGame(jsCode, "Coding | JavaScript", 0);
});

// handle about modal window hiding and showing

aboutPage.addEventListener("click", () =>
	hideModal(aboutPage, "app__aboutPage")
);

aboutBtn.addEventListener("click", () =>
	showModal(aboutPage, "app__aboutPage")
);
closeBtn.addEventListener("click", () =>
	hideModal(aboutPage, "app__aboutPage")
);

// handle contact modal window hiding and showing

contactBtn.addEventListener("click", () =>
	showModal(contactPage, "app__contactPage")
);

closeContact.addEventListener("click", () =>
	hideModal(contactPage, "app__contactPage")
);

// handle theme change ( toggling)

themeBtn.addEventListener("click", () => toggleTheme());

// handle test restarting
document.getElementById("newGameBtn").addEventListener("click", () => {
	clearInterval(timer);
	gameOver();
	newGame();
});
newGame();
