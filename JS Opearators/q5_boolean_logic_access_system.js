// Q5. Boolean Logic Access System

// Checks all security conditions and prints the result
function checkSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
  // Door "closed" is treated as locked.
  // Secure only if alarm is on AND door locked AND window closed AND owner inside
  const isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;

  console.log(
    `Door locked: ${isDoorLocked}, Window closed: ${isWindowClosed}, ` +
    `Alarm on: ${isAlarmOn}, Owner inside: ${isOwnerInside} -> ${isSecure ? "Secure" : "Unsafe"}`
  );
}

// Test multiple outcomes
checkSecurity(true, true, true, true);    // Secure
checkSecurity(false, true, true, true);   // Unsafe (door not locked)
checkSecurity(true, false, true, true);   // Unsafe (window open)
checkSecurity(true, true, false, true);   // Unsafe (alarm off)
checkSecurity(true, true, true, false);   // Unsafe (owner not inside)

// Example using ! and ||: unsafe if anything is wrong
const door = true, windowClosed = true, alarm = false, owner = true;
if (!door || !windowClosed || !alarm || !owner) {
  console.log("Using ! and || -> Unsafe");
} else {
  console.log("Using ! and || -> Secure");
}
