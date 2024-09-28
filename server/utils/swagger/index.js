const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');

// 配置swagger-jsdoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "FAN_CLUB WEB 项目 API",
      servers: [{ url: 'http://localhost:3000' }],
    },
  },
  // 去哪个路由下收集swagger注释
  apis: [path.join(__dirname, "../../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerInstall = function (app) {
  // 定义swaggerJson函数
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerInstall;
