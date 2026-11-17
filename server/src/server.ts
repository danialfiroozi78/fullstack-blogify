import app from "./app.js";
import "./association/index.js";
import { connectDB } from "./config/db.config";

const PORT = 3001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 👍`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
