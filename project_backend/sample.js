const crypto = require("crypto");

function sha256(message) {
    const hash = crypto.createHash("sha256");
    hash.update(message);
    return hash.digest("hex");
}

// Example usage
const messageToHash = "Hello, World!";
const hash = sha256(messageToHash);
console.log(`Message: ${messageToHash}`);
console.log(`SHA-256 Hash: ${hash}`);
