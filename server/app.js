const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const productRoutes = require('./routes/productRoutes');
const userCartRoutes = require('./routes/userCartRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerInstaller = require('./utils/swagger');
const authenticateToken = require('./middleware/authMiddleware');
const discussionRoutes = require('./routes/discussionRoutes');
require('dotenv').config(); // 加载环境变量

const app = express();
// CHECK JWT_SECRET
console.log(process.env.JWT_SECRET);

// Express配置了默认的 Content-Type 为 application/json，
// 可能会导致Swagger UI返回原始HTML而不是渲染后的页面。
// 需要调整Swagger UI的配置位置，使其在所有其他中间件之前加载。
swaggerInstaller(app);

// 设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 跨域
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"]
    })
);
app.use(bodyParser.json());

// 配置 express-jwt 中间件
// const jwtSecret = process.env.JWT_SECRET;
// app.use(expressJwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({ path: ['/api/auth/login'] }));

// 路由中间件
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/contents', authenticateToken, contentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/userCarts', authenticateToken, userCartRoutes);
app.use('/api/discussions', authenticateToken, discussionRoutes);
// 捕获404错误
app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.');
});

module.exports = app;
