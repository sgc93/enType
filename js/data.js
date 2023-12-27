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
	`import java. util. Scanner; public class { static void main ( String [] args ) scanner = new (System .in); // System .out .print ("Enter the first number: "); double number1 = scanner.nextDouble( // Accepting the second number System.out.print("Enter the second number: "); double number2 = scanner.nextDouble( // Calculating and printing the sum double sum = number1 + number2; System.out.println("Sum: " + sum // Calculating and printing the difference double difference = number1 - number2; System.out.println("Difference: " + difference // Checking if division by zero is possible if (number2 != 0) { // Calculating and printing the division double division = number1 / number2; System.out.println("Division: " + division); } else { System.out.println("Cannot divide by zero."); // Calculating and printing the product double product = number1 * number2; System.out.println("Product: " + product // Closing the scanner scanner.close() }`.split(
		" "
	);

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
