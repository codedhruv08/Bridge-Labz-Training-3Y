const userName = "Aman";                 // test user name
const currentHour = new Date().getHours(); // 0-23 from system clock
 
let greeting;
if (currentHour < 12) {
  greeting = `Good Morning ${userName}!`;
} else if (currentHour <= 17) {           // 12 to 17 inclusive
  greeting = `Good Afternoon ${userName}!`;
} else {
  greeting = `Good Evening ${userName}!`;
}
console.log(greeting);