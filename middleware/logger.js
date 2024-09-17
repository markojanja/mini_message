const fs = require("fs");
const path = require("path");

const logDirPath = path.join(__dirname, "..", "logs");

const logFilePath = path.join(logDirPath, "request.log");

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath, { recursive: true });
}

const logger = (req, res, next) => {
  const logEntry = `${new Date().toISOString()} ${req.method} ${req.url}`;

  fs.appendFile(logFilePath, logEntry + "\n", (err) => {
    if (err) {
      console.error("Failed to write log:", err);
    }
  });

  next();
};

module.exports = logger;
