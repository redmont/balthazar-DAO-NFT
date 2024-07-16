import express from "express";
import nftRoutes from "./routes/nft";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/nft", nftRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
