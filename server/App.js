const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/config"); // 连接数据库的代码
const userRoutes = require("./routes/userRoutes"); // 引入路由
const aiAgentRoutes = require("./routes/aiAgentRoutes");
const conditionReportRoutes = require("./routes/conditionReportRoutes");
const adviceReportRoutes = require("./routes/adviceReportRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const debtRoutes = require("./routes/debtRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const goalRoutes = require("./routes/goalRoutes");
const tansactionsRoutes = require("./routes/tansactionsRoutes");
require("module-alias/register"); //快捷定义引用目录
const { swaggerUi, swaggerSpec } = require("./swagger"); //For REST API in Swagger

dotenv.config();

// 创建Express应用
const app = express();

// 连接数据库
connectDB();

// 中间件
app.use(express.json()); // 解析JSON请求

// 中间件
app.use(express.json({ limit: "50mb" })); // 允许最多 50MB 的 JSON 数据
app.use(express.urlencoded({ limit: "50mb", extended: true })); // 允许最多 50MB 的 URL-encoded 数据

app.use(
  cors({
    origin: "*",
  })
);

// 使用路由
app.use("/api", userRoutes);
app.use("/api", aiAgentRoutes);
app.use("/api", debtRoutes);
app.use("/api", propertyRoutes);
app.use("/api", conditionReportRoutes);
app.use("/api", adviceReportRoutes);
app.use("/api", incomeRoutes);
app.use("/api", goalRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", tansactionsRoutes);

// 启动服务器
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("API Docs available at http://localhost:5001/api-docs");
});
