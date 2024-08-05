import express, { Request, Response } from "express";

const app = express(); // express

const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set

const server = app.listen(port, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode, on localhost:${port}`
  );
  //console.log(process.env.DOTENV_CONFIG_PATH);
});

process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
