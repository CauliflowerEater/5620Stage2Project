const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/config"); // 连接数据库的代码
const userRoutes = require("./routes/userRoutes"); // 引入路由
const aiAgentRoutes = require("./routes/aiAgentRoutes");
const conditionReportRoutes = require("./routes/conditionReportRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const debtRoutes = require("./routes/debtRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const goalRoutes = require("./routes/goalRoutes");
require("module-alias/register"); //快捷定义引用目录

dotenv.config();

// 创建Express应用
const app = express();

// 连接数据库
connectDB();

// 中间件
app.use(express.json()); // 解析JSON请求

app.use(
  cors({
    "*": "http://localhost:5173",
  })
);

// 使用路由
app.use("/api", userRoutes);
app.use("/api", aiAgentRoutes);
app.use("/api", debtRoutes);
app.use("/api", propertyRoutes);
app.use("/api", conditionReportRoutes);
app.use("/api", incomeRoutes);
app.use("/api", goalRoutes);

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
