const fs = require("fs").promises;

async function write(params) {
  try {
    const content = process.argv[2] || "Hướng dẫn sử dụng";
    await fs.writeFile("./lesson-02/output.txt", content);
    console.log("Written to output.txt successfully!");
  } catch (error) {
    console.log(error);
  }
}

write();
