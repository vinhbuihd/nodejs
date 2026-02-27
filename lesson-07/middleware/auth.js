const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // Bước 1: Lấy token từ header
  // Bước 2: Nếu không có token → trả 401
  // Bước 3: Verify token
  // Bước 4: Gắn decoded data vào req.user, gọi next()
  console.log("tk", req.header("Authorization"));
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = auth;
