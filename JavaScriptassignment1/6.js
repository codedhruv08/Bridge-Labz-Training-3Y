const total = 6500;   // input purchase amount
 
let discountPercent;
if (total >= 10000) {
  discountPercent = 25;
} else if (total >= 5000) {
  discountPercent = 15;
} else if (total >= 2000) {
  discountPercent = 5;
} else {
  discountPercent = 0;
}
 
const finalPrice = Math.round(total - (total * discountPercent) / 100);
 
console.log(`Original total     : ${total}`);
console.log(`Discount percentage: ${discountPercent}%`);
console.log(`Final price        : ${finalPrice}`);
 