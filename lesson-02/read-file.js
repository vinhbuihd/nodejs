const fs = require("fs").promises;

async function main() {
  try {
    const content = await fs.readFile("./lesson-02/read-file.txt", "utf8");
    console.log(content);
  } catch (error) {
    console.log("error", error.message);
  }
}

main();
