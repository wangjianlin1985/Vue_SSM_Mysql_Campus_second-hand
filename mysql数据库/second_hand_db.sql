/*
 Navicat Premium Data Transfer

 Source Server         : mysql5.6
 Source Server Type    : MySQL
 Source Server Version : 50620
 Source Host           : localhost:3306
 Source Schema         : second_hand_db

 Target Server Type    : MySQL
 Target Server Version : 50620
 File Encoding         : 65001

 Date: 25/03/2021 18:46:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('a', 'a');

-- ----------------------------
-- Table structure for t_areainfo
-- ----------------------------
DROP TABLE IF EXISTS `t_areainfo`;
CREATE TABLE `t_areainfo`  (
  `areaId` int(11) NOT NULL AUTO_INCREMENT COMMENT '区域id',
  `areaName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区域名称',
  PRIMARY KEY (`areaId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_areainfo
-- ----------------------------
INSERT INTO `t_areainfo` VALUES (1, '南校区');
INSERT INTO `t_areainfo` VALUES (2, '北校区');
INSERT INTO `t_areainfo` VALUES (3, '本部');

-- ----------------------------
-- Table structure for t_leaveword
-- ----------------------------
DROP TABLE IF EXISTS `t_leaveword`;
CREATE TABLE `t_leaveword`  (
  `leaveWordId` int(11) NOT NULL AUTO_INCREMENT COMMENT '留言id',
  `leaveTitle` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '留言标题',
  `leaveContent` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '留言内容',
  `userObj` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '留言人',
  `leaveTime` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '留言时间',
  `replyContent` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '管理回复',
  `replyTime` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY (`leaveWordId`) USING BTREE,
  INDEX `userObj`(`userObj`) USING BTREE,
  CONSTRAINT `t_leaveword_ibfk_1` FOREIGN KEY (`userObj`) REFERENCES `t_userinfo` (`user_name`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_leaveword
-- ----------------------------
INSERT INTO `t_leaveword` VALUES (1, '管理你好，问个问题', '我这发布的宝贝，他们怎么购买呢', '18888888888', '2021-03-23 16:49:02', '咱们这个是一个信息平台，你们可以电话联系，线下微信支付宝交易就行！', '2021-03-23 16:49:04');
INSERT INTO `t_leaveword` VALUES (2, '111', '222', '13508123923', '2021-03-24 12:26:33', '--', '--');
INSERT INTO `t_leaveword` VALUES (3, '22', '33', '18888888888', '2021-03-24 12:26:38', '--', '--');

-- ----------------------------
-- Table structure for t_notice
-- ----------------------------
DROP TABLE IF EXISTS `t_notice`;
CREATE TABLE `t_notice`  (
  `noticeId` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `title` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `content` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告内容',
  `publishDate` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`noticeId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_notice
-- ----------------------------
INSERT INTO `t_notice` VALUES (1, '二手平台上线', '<p>同学们以后可以在小程序上面发布二手物品了</p>', '2021-03-23 16:49:16');
INSERT INTO `t_notice` VALUES (2, '这里还可以交友哦', '<p>大家可以把自己不用的物品转给需要的同学，还可以成为好朋友</p>', '2021-03-25 15:21:03');

-- ----------------------------
-- Table structure for t_oldlevel
-- ----------------------------
DROP TABLE IF EXISTS `t_oldlevel`;
CREATE TABLE `t_oldlevel`  (
  `levelId` int(11) NOT NULL AUTO_INCREMENT COMMENT '新旧程度id',
  `levelName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '新旧程度名称',
  PRIMARY KEY (`levelId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_oldlevel
-- ----------------------------
INSERT INTO `t_oldlevel` VALUES (1, '9.9成新');
INSERT INTO `t_oldlevel` VALUES (2, '9成新');
INSERT INTO `t_oldlevel` VALUES (3, '8成新');

-- ----------------------------
-- Table structure for t_priceregion
-- ----------------------------
DROP TABLE IF EXISTS `t_priceregion`;
CREATE TABLE `t_priceregion`  (
  `regionId` int(11) NOT NULL AUTO_INCREMENT COMMENT '区间id',
  `regionName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区间名称',
  PRIMARY KEY (`regionId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_priceregion
-- ----------------------------
INSERT INTO `t_priceregion` VALUES (1, '0~500元');
INSERT INTO `t_priceregion` VALUES (2, '500~1000元');
INSERT INTO `t_priceregion` VALUES (3, '1000~2000元');
INSERT INTO `t_priceregion` VALUES (4, '2000~5000元');
INSERT INTO `t_priceregion` VALUES (5, '5000元以上');

-- ----------------------------
-- Table structure for t_product
-- ----------------------------
DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product`  (
  `productId` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `productClassObj` int(11) NOT NULL COMMENT '商品类别',
  `productName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `mainPhoto` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品图片',
  `oldLevel` int(11) NOT NULL COMMENT '新旧程度',
  `priceRegionObj` int(11) NOT NULL COMMENT '价格区间',
  `price` float NOT NULL COMMENT '商品价格',
  `areaObj` int(11) NOT NULL COMMENT '所在区域',
  `productDesc` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品描述',
  `connectPerson` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系人',
  `connectPhone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系电话',
  `userObj` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '发布人',
  `addTime` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`productId`) USING BTREE,
  INDEX `productClassObj`(`productClassObj`) USING BTREE,
  INDEX `oldLevel`(`oldLevel`) USING BTREE,
  INDEX `priceRegionObj`(`priceRegionObj`) USING BTREE,
  INDEX `areaObj`(`areaObj`) USING BTREE,
  INDEX `userObj`(`userObj`) USING BTREE,
  CONSTRAINT `t_product_ibfk_1` FOREIGN KEY (`productClassObj`) REFERENCES `t_productclass` (`classId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `t_product_ibfk_2` FOREIGN KEY (`oldLevel`) REFERENCES `t_oldlevel` (`levelId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `t_product_ibfk_3` FOREIGN KEY (`priceRegionObj`) REFERENCES `t_priceregion` (`regionId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `t_product_ibfk_4` FOREIGN KEY (`areaObj`) REFERENCES `t_areainfo` (`areaId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `t_product_ibfk_5` FOREIGN KEY (`userObj`) REFERENCES `t_userinfo` (`user_name`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_product
-- ----------------------------
INSERT INTO `t_product` VALUES (1, 1, '苹果SE手机', 'upload/55cbfdd0-6409-452b-bab8-adeddc8509d8.jpg', 1, 2, 628, 1, '<p>二手苹果SE一部，128G内存，成色很新，刚用不到半年，需要的朋友找我吧！生活费快没了，割肉转让了！</p>', '王晓婷', '13058018108', '18888888888', '2021-03-23 16:49:47');
INSERT INTO `t_product` VALUES (5, 1, '二手戴尔台式机主机', 'upload/66fe4374-0cce-43c5-88ff-ae5c1ea7bd52.jpg', 3, 1, 350, 2, '<p>二代990机箱，G630处理器，4G内存，500G硬盘,H61主板，要的速度了</p>', '李小涛', '13081097682', '13508123923', '2021-03-24 01:08:04');
INSERT INTO `t_product` VALUES (6, 3, 'PHP基础案例教程', 'upload/9efbbdae-5bef-4d29-858a-3e889eb217be.jpg', 2, 1, 15, 1, '<p>一本php网站开发的书籍，买来我都没怎么看，没时间看了， 太忙了，转给需要的朋友了</p>', '李夏', '13513908932', '18888888888', '2021-03-24 12:11:24');

-- ----------------------------
-- Table structure for t_productclass
-- ----------------------------
DROP TABLE IF EXISTS `t_productclass`;
CREATE TABLE `t_productclass`  (
  `classId` int(11) NOT NULL AUTO_INCREMENT COMMENT '类别id',
  `className` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类别名称',
  `classDesc` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类别描述',
  PRIMARY KEY (`classId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_productclass
-- ----------------------------
INSERT INTO `t_productclass` VALUES (1, '二手电脑', '二手电脑二手电脑二手电脑二手电脑二手电脑二手电脑二手电脑');
INSERT INTO `t_productclass` VALUES (2, '二手手机', '二手手机二手手机二手手机二手手机');
INSERT INTO `t_productclass` VALUES (3, '二手图书', '二手图书二手图书二手图书二手图书二手图书');
INSERT INTO `t_productclass` VALUES (4, '二手服装', '二手服装二手服装二手服装二手服装二手服装二手服装二手服装');

-- ----------------------------
-- Table structure for t_userinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_userinfo`;
CREATE TABLE `t_userinfo`  (
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'user_name',
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录密码',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `gender` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '性别',
  `birthDate` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '出生日期',
  `userPhoto` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户照片',
  `telephone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系电话',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `address` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '家庭地址',
  `regTime` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '注册时间',
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_userinfo
-- ----------------------------
INSERT INTO `t_userinfo` VALUES ('13508123923', '123', '张晓彤', '女', '2021-03-16', 'upload/84384452-fd56-4fcb-8b37-599ce28ab265.jpg', '13508083908', 'xiaoteng@126.com', '四川成都春熙路', '2021-03-23 16:48:12', NULL);
INSERT INTO `t_userinfo` VALUES ('18888888333', '123456', '小萌新', '男', '2020-12-21', 'upload/NoImage.jpg', '18888888333', '', '', '2021-03-25 18:15:23', '--');
INSERT INTO `t_userinfo` VALUES ('18888888888', '123456', '小萌萌', '男', '2020-12-21', 'upload/a4a73cd7-4340-4304-99d8-817a3348fcbf.jpg', '18888888888', 'dashn@126.com', '成都红星路', '2021-03-23 17:09:53', '--');

SET FOREIGN_KEY_CHECKS = 1;
