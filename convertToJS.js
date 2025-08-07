const fs = require("fs");
const path = require("path");

function convertFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Typen und Interfaces grob entfernen
  content = content
    .replace(/: ?[a-zA-Z0-9_\[\]\|]+/g, "")
    .replace(/interface\s+\w+ ?{[^}]+}/gs, "")
    .replace(/as [A-Za-z0-9_.]+/g, "")
    .replace(/<[^<>]*>/g, "");

  let newFilePath = filePath;
  if (filePath.endsWith(".tsx")) {
    newFilePath = filePath.replace(/\.tsx$/, ".jsx");
  } else if (filePath.endsWith(".ts")) {
    newFilePath = filePath.replace(/\.ts$/, ".js");
  }

  fs.writeFileSync(newFilePath, content);
  if (newFilePath !== filePath) fs.unlinkSync(filePath);
  console.log(`✔️ Konvertiert: ${filePath} → ${newFilePath}`);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".ts") || fullPath.endsWith(".tsx")) {
      convertFile(fullPath);
    }
  });
}

walk("./");
