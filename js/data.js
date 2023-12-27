const easyEng =
	"the quick brown fox jumps over the lazy dog journey of thousand miles begins with a single step life what happens when you are busy making other plans all you need love. the early bird catches the worm laughter the best medicine where there will there way practice makes perfect an apple day keeps the doctor away time is money every cloud has silver lining.".split(
		" "
	);

const midEng =
	"In the vast expanse of the cosmos, galaxies twirl and dance like cosmic ballerinas. Stars, like diamonds, sprinkle the inky blackness of space. Each twinkling light's a beacon, telling stories of ages past. Nebulas, the cosmic clouds, weave tales of stellar births and deaths. In this celestial ballet, comets are the shooting stars, leaving ephemeral trails of stardust. The universe, a grand tapestry, unfolds its secrets with each passing moment".split(
		" "
	);

const hardEng =
	'@Tiger#42Roar! The encrypted message reads: 5$ecureP@ssword! Unlock the vault with code 12345. Beware of the darkness that lurks in the shadows. A=πr²: calculate the area of the circle. The quick brown fox jumps over the 1azy dog! "To be or not to be," a famous Shakespearean dilemma. 3.14159265359, the never-ending dance of pi. The cyborg revolution begins on 01/20/3035. @QuantumPhysics: E=mc², unraveling the mysteries of the cosmos. Can you solve the riddle: What has keys but can\'t open locks?'.split(
		" "
	);

const javaCode =
	`abstract assert boolean break byte case catch char class const continue default do // double else enum extends final finally float for if goto implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw . /**/ throws transient try void volatile while String arrays ArrayList LinkedList HashMap HashSet TreeMap TreeSet Calendar Date NumberFormat Random Math StringBuffer StringBuilder FileReader {} FileWriter PrintWriter Scanner BufferedReader BufferedWriter Socket ServerSocket SocketException IOException URL URI URISyntaxException MalformedURLException URLConnection HttpURLConnection InputStream OutputStream FileInputStream [] FileOutputStream ObjectInputStream ObjectOutputStream DataInputStream DataOutputStream Reader Writer PrintStream System out err in getProperty ;
`.split(" ");

const dartCode = `import 'dart:io'; void main() {
  // Accepting the first number
  stdout.write('Enter the first number: ');
  double number1 = double.parse(stdin.readLineSync()!);

  // Accepting the second number
  stdout.write('Enter the second number: ');
  double number2 = double.parse(stdin.readLineSync()!);

  // Calculating and printing the sum
  double sum = number1 + number2;
  print('Sum: $sum');

  // Calculating and printing the difference
  double difference = number1 - number2;
  print('Difference: $difference');

  // Checking if division by zero is possible
  if (number2 != 0) {
    // Calculating and printing the division
    double division = number1 / number2;
    print('Division: $division');
  } else {
    print('Cannot divide by zero.');
  }

  // Calculating and printing the product
  double product = number1 * number2;
  print('Product: $product');
}
`.split(" ");
