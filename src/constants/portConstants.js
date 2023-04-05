module.exports = {
  BASE_URL:
    // process.env.NODE_ENV === "production" ? "http://localhost:8080/" : "http://localhost:8080/"
    process.env.NODE_ENV === "production"
      ? "http://localhost:4001/api/v1/"
      : "http://localhost:4001/api/v1/",
  FILE_SERVER:
    // process.env.NODE_ENV === "production" ? "http://localhost:8080/" : "http://localhost:8080/"
    process.env.NODE_ENV === "production"
      ? "http://localhost:4001/public/uploads"
      : "http://localhost:4001/public/uploads",
};
