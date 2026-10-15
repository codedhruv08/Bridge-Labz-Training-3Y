// Q2. String Manipulation Report

// Raw product name with extra spaces and mixed case
const rawTitle = "  wireless headphones PRO  ";

// Step 1: remove leading/trailing spaces and convert to lowercase
const trimmedLower = rawTitle.trim().toLowerCase();

// Step 2: capitalize the first letter of each word
const capitalized = trimmedLower
  .split(" ")                                            // break into words
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each
  .join(" ");                                            // join back

// Step 3: replace "Pro" with "Pro Edition"
const cleanTitle = capitalized.replace("Pro", "Pro Edition");

// Step 4: display result
console.log("Original      :", `"${rawTitle}"`);
console.log("Cleaned title :", `"${cleanTitle}"`);
console.log("Length        :", cleanTitle.length);
