const crypto = require('crypto');
const fs = require('fs');

// Generate a secure JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Write to .env format
const envContent = `MONGODB_URI=mongodb://localhost:27017/edumanage
JWT_SECRET=${jwtSecret}
PORT=3001
`;

// Write to file
fs.writeFileSync('.env', envContent);

console.log('✅ JWT Secret Generated and .env file created!');
console.log('Generated JWT Secret:', jwtSecret);
console.log('\n📝 .env file content:');
console.log(envContent);
