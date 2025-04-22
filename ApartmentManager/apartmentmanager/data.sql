-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: apartmentmanager
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apartment_bill`
--

DROP TABLE IF EXISTS `apartment_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_bill` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `payment_method` int DEFAULT NULL,
  `bill_date` date NOT NULL,
  `bill_image` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Apartment_bill_user_id_3680b599_fk_Apartment_user_id` (`user_id`),
  CONSTRAINT `Apartment_bill_user_id_3680b599_fk_Apartment_user_id` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_bill`
--

LOCK TABLES `apartment_bill` WRITE;
/*!40000 ALTER TABLE `apartment_bill` DISABLE KEYS */;
INSERT INTO `apartment_bill` VALUES (1,'2024-10-08','2024-10-08',1,'Phi don dep toa nha',NULL,'2024-10-08',NULL,150000.00,NULL,4),(2,'2024-10-08','2024-10-08',1,'Phi co so vat chat',NULL,'2024-10-08',NULL,200000.00,NULL,4),(3,'2024-10-09','2024-10-11',1,'Phi trong tre em',0,'2024-10-09','image/upload/v1728640424/sjsheoquodoh2itmx5je.jpg',500000.00,1,5),(4,'2024-10-09','2024-10-11',1,'Phi sua xe',0,'2024-10-09','image/upload/v1728640408/zztwzh60l3r12svdv6ji.jpg',1000000.00,1,4);
/*!40000 ALTER TABLE `apartment_bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_bill_service`
--

DROP TABLE IF EXISTS `apartment_bill_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_bill_service` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bill_id` bigint NOT NULL,
  `service_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Apartment_bill_service_bill_id_service_id_dd031943_uniq` (`bill_id`,`service_id`),
  KEY `Apartment_bill_servi_service_id_a1195c3f_fk_Apartment` (`service_id`),
  CONSTRAINT `Apartment_bill_servi_service_id_a1195c3f_fk_Apartment` FOREIGN KEY (`service_id`) REFERENCES `apartment_service` (`id`),
  CONSTRAINT `Apartment_bill_service_bill_id_628d1cde_fk_Apartment_bill_id` FOREIGN KEY (`bill_id`) REFERENCES `apartment_bill` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_bill_service`
--

LOCK TABLES `apartment_bill_service` WRITE;
/*!40000 ALTER TABLE `apartment_bill_service` DISABLE KEYS */;
INSERT INTO `apartment_bill_service` VALUES (2,3,2),(1,4,3);
/*!40000 ALTER TABLE `apartment_bill_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_feedback`
--

DROP TABLE IF EXISTS `apartment_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Apartment_feedback_user_id_11a6b14e_fk_Apartment_user_id` (`user_id`),
  CONSTRAINT `Apartment_feedback_user_id_11a6b14e_fk_Apartment_user_id` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_feedback`
--

LOCK TABLES `apartment_feedback` WRITE;
/*!40000 ALTER TABLE `apartment_feedback` DISABLE KEYS */;
INSERT INTO `apartment_feedback` VALUES (1,'2024-10-08','2024-10-08',1,'Phong ke ben on ao','2024-10-08 10:31:41.553634',4),(2,'2024-10-11','2024-10-11',1,'Cu dan phong ben canh dem nao cung on ao khong cho ai ngu.','2024-10-11 09:39:30.996747',4),(3,'2024-10-11','2024-10-11',1,'Tang tren bi dot nuoc xuong phong toi','2024-10-11 09:39:57.028682',4),(4,'2024-10-11','2024-10-11',1,'Phong cua toi bi mat nuoc','2024-10-11 09:40:23.520376',4);
/*!40000 ALTER TABLE `apartment_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_notification`
--

DROP TABLE IF EXISTS `apartment_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_notification`
--

LOCK TABLES `apartment_notification` WRITE;
/*!40000 ALTER TABLE `apartment_notification` DISABLE KEYS */;
INSERT INTO `apartment_notification` VALUES (1,'2024-10-08','2024-10-08',1,'Nâng cấp dịch vụ','Tháng sau chung cư sẽ nâng cấp các dịch vụ.'),(2,'2024-10-08','2024-10-08',1,'Họp mặt cư dân','Tháng sau chung cư tiến hành họp cư dân'),(3,'2024-10-09','2024-10-09',1,'Tong ve sinh chung cu','Cuoi tuan nay cung cu tien hanh tong ve sinh.');
/*!40000 ALTER TABLE `apartment_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_package`
--

DROP TABLE IF EXISTS `apartment_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_package` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `tuDo_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Apartment_package_tuDo_id_fe65a93f_fk_Apartment_tudo_id` (`tuDo_id`),
  CONSTRAINT `Apartment_package_tuDo_id_fe65a93f_fk_Apartment_tudo_id` FOREIGN KEY (`tuDo_id`) REFERENCES `apartment_tudo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_package`
--

LOCK TABLES `apartment_package` WRITE;
/*!40000 ALTER TABLE `apartment_package` DISABLE KEYS */;
INSERT INTO `apartment_package` VALUES (4,'2024-10-09','2024-10-09',1,'Hang quan ao',1,1),(5,'2024-10-09','2024-10-11',1,'Dien thoai',1,2);
/*!40000 ALTER TABLE `apartment_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_residentfamily`
--

DROP TABLE IF EXISTS `apartment_residentfamily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_residentfamily` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `cccd` varchar(50) NOT NULL,
  `sdt` varchar(15) NOT NULL,
  `relationship` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cccd` (`cccd`),
  KEY `Apartment_residentfamily_user_id_4acd1e9d_fk_Apartment_user_id` (`user_id`),
  CONSTRAINT `Apartment_residentfamily_user_id_4acd1e9d_fk_Apartment_user_id` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_residentfamily`
--

LOCK TABLES `apartment_residentfamily` WRITE;
/*!40000 ALTER TABLE `apartment_residentfamily` DISABLE KEYS */;
INSERT INTO `apartment_residentfamily` VALUES (1,'2024-10-08','2024-10-08',1,'Le Van Tan','0123456789','0321654987',1,1,4);
/*!40000 ALTER TABLE `apartment_residentfamily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_service`
--

DROP TABLE IF EXISTS `apartment_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_service` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_service`
--

LOCK TABLES `apartment_service` WRITE;
/*!40000 ALTER TABLE `apartment_service` DISABLE KEYS */;
INSERT INTO `apartment_service` VALUES (1,'2024-07-25','2024-07-25',1,'Dịch vụ cơ bản','Bảo vệ: Bảo vệ an ninh 24/7, kiểm soát ra vào, tuần tra khu vực chung.\r\nVệ sinh: Dọn dẹp khu vực chung, thu gom rác thải, vệ sinh thang máy, hành lang.\r\nQuản lý: Quản lý tài chính, kế hoạch sửa chữa, bảo trì, giải quyết vấn đề của cư dân.\r\nSửa chữa: Sửa chữa các thiết bị, hệ thống chung của tòa nhà (điện nước, thang máy, hệ thống PCCC...).\r\nGiữ xe: Bãi giữ xe ô tô, xe máy, dịch vụ trông giữ xe.',500000.00),(2,'2024-07-25','2024-07-25',1,'Dịch vụ tiện ích','Hồ bơi: Hồ bơi trong nhà hoặc ngoài trời, dịch vụ huấn luyện bơi lội.\r\nPhòng tập thể dục: Phòng tập gym, yoga, các lớp tập luyện thể dục.\r\nKhu vui chơi trẻ em: Khu vui chơi trong nhà hoặc ngoài trời cho trẻ em.\r\nCửa hàng tiện lợi: Cửa hàng tạp hóa, siêu thị mini, dịch vụ giao hàng.\r\nNhà hàng/quán cà phê: Dịch vụ ăn uống, giải trí trong khuôn viên chung cư.\r\nSpa/Salon: Dịch vụ làm đẹp, chăm sóc sức khỏe.\r\nPhòng họp/sự kiện: Cho thuê phòng họp, tổ chức sự kiện.',1000000.00),(3,'2024-07-25','2024-07-25',1,'Dịch vụ khác','Dịch vụ giặt là: Dịch vụ giặt ủi, sấy khô, là ủi quần áo.\r\nDịch vụ sửa chữa nhà: Sửa chữa, cải tạo, trang trí nội thất.\r\nDịch vụ cho thuê: Cho thuê văn phòng, cho thuê căn hộ ngắn hạn.\r\nDịch vụ chăm sóc người già: Dịch vụ chăm sóc sức khỏe, y tế cho người già.\r\nDịch vụ cho thú cưng: Dịch vụ tắm, cắt tỉa lông, chăm sóc thú cưng.',2000000.00),(4,'2024-10-08','2024-10-08',1,'Dich vu trong tre','Cham soc tre em',200000.00);
/*!40000 ALTER TABLE `apartment_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_survey`
--

DROP TABLE IF EXISTS `apartment_survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_survey` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `type_survey` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_survey`
--

LOCK TABLES `apartment_survey` WRITE;
/*!40000 ALTER TABLE `apartment_survey` DISABLE KEYS */;
INSERT INTO `apartment_survey` VALUES (1,'Khao sat ve dich vu','Dich vu cua toa nha',0,'2024-10-08 09:50:50.940097',1,1,'2024-10-08','2024-10-08'),(2,'Khao sat ve nhan vien cua toa nha','Khao sat ve nhan vien',0,'2024-10-08 10:20:34.587508',1,1,'2024-10-08','2024-10-08');
/*!40000 ALTER TABLE `apartment_survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_surveyanswer`
--

DROP TABLE IF EXISTS `apartment_surveyanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_surveyanswer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `answer` longtext NOT NULL,
  `question_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Apartment_surveyansw_question_id_c5fe8eb6_fk_Apartment` (`question_id`),
  KEY `Apartment_surveyanswer_user_id_40119207_fk_Apartment_user_id` (`user_id`),
  CONSTRAINT `Apartment_surveyansw_question_id_c5fe8eb6_fk_Apartment` FOREIGN KEY (`question_id`) REFERENCES `apartment_surveyquestion` (`id`),
  CONSTRAINT `Apartment_surveyanswer_user_id_40119207_fk_Apartment_user_id` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_surveyanswer`
--

LOCK TABLES `apartment_surveyanswer` WRITE;
/*!40000 ALTER TABLE `apartment_surveyanswer` DISABLE KEYS */;
INSERT INTO `apartment_surveyanswer` VALUES (1,'Co',1,4,1,'2024-10-08','2024-10-08'),(2,'Rat la kho chiu',1,4,1,'2024-10-08','2024-10-08');
/*!40000 ALTER TABLE `apartment_surveyanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_surveyquestion`
--

DROP TABLE IF EXISTS `apartment_surveyquestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_surveyquestion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question_text` longtext NOT NULL,
  `survey_id` bigint NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Apartment_surveyques_survey_id_ea653ddf_fk_Apartment` (`survey_id`),
  CONSTRAINT `Apartment_surveyques_survey_id_ea653ddf_fk_Apartment` FOREIGN KEY (`survey_id`) REFERENCES `apartment_survey` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_surveyquestion`
--

LOCK TABLES `apartment_surveyquestion` WRITE;
/*!40000 ALTER TABLE `apartment_surveyquestion` DISABLE KEYS */;
INSERT INTO `apartment_surveyquestion` VALUES (1,'Dich vu co lam ban thoai mai khong?',1,1,'2024-10-08','2024-10-08'),(2,'Dich vu co on khong?',1,1,'2024-10-08','2024-10-08'),(3,'Nhan vien co lam viec dung gio khong?',2,1,'2024-10-11','2024-10-11');
/*!40000 ALTER TABLE `apartment_surveyquestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_tudo`
--

DROP TABLE IF EXISTS `apartment_tudo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_tudo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_tudo`
--

LOCK TABLES `apartment_tudo` WRITE;
/*!40000 ALTER TABLE `apartment_tudo` DISABLE KEYS */;
INSERT INTO `apartment_tudo` VALUES (1,'2024-07-25','2024-07-25',1,'Tủ đồ 1'),(2,'2024-07-25','2024-07-25',1,'Tủ đồ 2'),(3,'2024-07-25','2024-07-25',1,'Tủ đồ 3'),(4,'2024-07-25','2024-07-25',1,'Tủ đồ 4'),(5,'2024-07-25','2024-07-25',1,'Tủ đồ 5'),(6,'2024-07-25','2024-07-25',1,'Tủ đồ 6'),(7,'2024-07-25','2024-07-25',1,'Tủ đồ 7'),(8,'2024-07-25','2024-07-25',1,'Tủ đồ 8'),(9,'2024-07-25','2024-07-25',1,'Tủ đồ 9'),(10,'2024-07-25','2024-07-25',1,'Tủ đồ 10'),(11,'2024-10-08','2024-10-08',1,'Tu do 11');
/*!40000 ALTER TABLE `apartment_tudo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_user`
--

DROP TABLE IF EXISTS `apartment_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_user`
--

LOCK TABLES `apartment_user` WRITE;
/*!40000 ALTER TABLE `apartment_user` DISABLE KEYS */;
INSERT INTO `apartment_user` VALUES (1,'pbkdf2_sha256$600000$aAsP9O9DLLfzVsWJpEW63J$2OoaYiA8RD0zXMH8RX44w7t3ogL+7Iy9p/Shtme9+Ys=','2024-10-09 13:05:54.507545',1,'tan','Tân','Nguyễn Huy','tan@gmail.com',1,1,'2024-07-25 10:55:09.325239','image/upload/v1728380101/t2sj19qrj6lqe0so4qmx.jpg',0),(4,'pbkdf2_sha256$600000$7CBgkiL9GD0oUxblamRa3g$mNbme88lhith2otgg8DcZEsxo3SXcMS4sC2djSicJ80=',NULL,0,'user1','Tân','Lê Văn','tanle@gmail.com',0,1,'2024-10-08 09:35:57.019585','image/upload/v1728380452/wj9ejqxdu9g35eqqgrlh.jpg',1),(5,'pbkdf2_sha256$600000$AKj8JDdAMa2nQdAgrpnIgA$PqqignOIDJinhT9hSJTq2juPYF7ZMicsCcC6Gz7DujY=',NULL,0,'user2','','','',0,1,'2024-10-08 09:36:07.985354',NULL,1),(6,'pbkdf2_sha256$600000$QynW0knSQ68iQgMwJJXyfg$59FopmyDLgep1Utlskt9QeIdKZmg47WGNZKWY3tjzAw=',NULL,0,'user3','','','',0,1,'2024-10-08 09:36:17.479320',NULL,1),(7,'pbkdf2_sha256$600000$4o2t9OZahZpKlpsZ4cTDgJ$k4czFRIUM7BASPviW9EH9C7hgSEpXLI/vez/QOet0Gc=',NULL,0,'user4','','','',0,1,'2024-10-08 09:42:11.596395',NULL,1),(8,'pbkdf2_sha256$600000$9OncH6lMYF0uJJHmYltZ98$zUh7JKEtNIIBK5uiajJpFARqz1hls4zuuzo08rUePJU=',NULL,0,'user5','','','',0,1,'2024-10-08 09:42:21.538266',NULL,1),(9,'pbkdf2_sha256$600000$8leMmstM1W4H7M7bvDCWdA$qF1ZyPIPoHv+8Kn/4macnQcTqD77otZZI5L2JEBnH5w=',NULL,0,'user6','','','',0,1,'2024-10-09 14:44:34.954722',NULL,1),(10,'pbkdf2_sha256$600000$jHha0MZ2sPYDhJbfDpjpBt$BluBmouacwzm+vu/GTaR0/y0crsv8VB/+sdvHZePE6o=',NULL,0,'user7','','','',0,1,'2024-10-09 14:44:40.443493',NULL,1),(11,'pbkdf2_sha256$600000$ruEryInlLZsgUa3dijsXxL$jMduX9a0q6n+GlWsfdhzo6dbQ267cj7hgpn2kmm/zx8=',NULL,0,'user8','','','',0,1,'2024-10-09 14:44:45.560256',NULL,1),(12,'pbkdf2_sha256$600000$229HQiXE0N2yLghrZ7obXW$vBkDNeiG+KyAXM7Fu+TmfARZh8NsozSv4d96mjth8E8=',NULL,0,'user9','','','',0,1,'2024-10-09 14:44:50.279037',NULL,1),(13,'pbkdf2_sha256$600000$o8OcaonbeQWOmKASmqXQ4u$dSDyLv9hsQ6kD8TJXnfzHcRD8IqFRkFRjKtbKhOSm5w=',NULL,0,'user10','','','',0,1,'2024-10-09 14:44:55.348895',NULL,1),(14,'pbkdf2_sha256$600000$mRwdm0RJDhsaiDG8aRdjCY$bW7gC9OQIs89VPcu2gBvhjFYMYWfcolCB+ejFnGcKZI=',NULL,0,'user11','','','',0,1,'2024-10-09 14:44:59.888191',NULL,1),(15,'pbkdf2_sha256$600000$5ZelbwNRf8QsBTXlArXJiK$xaahHu0jSSQtcdhypOLcdPDt/2xwT9uUm86WvGtA6ZI=',NULL,0,'user12','','','',0,1,'2024-10-09 14:45:04.471152',NULL,1),(16,'pbkdf2_sha256$600000$UM1x3wxUwh1CuJlWbeGfNr$4H/h+0y3VDKNwT6De/TS2++qcIq5ZJ4zXfUx2Ker+Rk=',NULL,0,'user13','','','',0,1,'2024-10-09 14:45:08.470087',NULL,1),(17,'pbkdf2_sha256$600000$dy0dAF7WpRVjzHaUNVJLxX$s7gdiY58mGPhgfY6/rh64uLcW830P+oeN2pMkGl/axI=',NULL,0,'user14','','','',0,1,'2024-10-09 14:45:13.076988',NULL,1),(18,'pbkdf2_sha256$600000$iZodEeC2TyfCeZ3kX9KMbI$oBFd1JQ8GY9O1v6YM41BfFMdv3QjSmtOej6BydZBZds=',NULL,0,'user15','','','',0,1,'2024-10-09 14:45:22.980628',NULL,1);
/*!40000 ALTER TABLE `apartment_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_user_groups`
--

DROP TABLE IF EXISTS `apartment_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Apartment_user_groups_user_id_group_id_b8ccb3f0_uniq` (`user_id`,`group_id`),
  KEY `Apartment_user_groups_group_id_9566e4ec_fk_auth_group_id` (`group_id`),
  CONSTRAINT `Apartment_user_groups_group_id_9566e4ec_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `Apartment_user_groups_user_id_5576a374_fk_Apartment_user_id` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_user_groups`
--

LOCK TABLES `apartment_user_groups` WRITE;
/*!40000 ALTER TABLE `apartment_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `apartment_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment_user_user_permissions`
--

DROP TABLE IF EXISTS `apartment_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Apartment_user_user_perm_user_id_permission_id_d4240f45_uniq` (`user_id`,`permission_id`),
  KEY `Apartment_user_user__permission_id_27406e0a_fk_auth_perm` (`permission_id`),
  CONSTRAINT `Apartment_user_user__permission_id_27406e0a_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `Apartment_user_user__user_id_9daa89c3_fk_Apartment` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_user_user_permissions`
--

LOCK TABLES `apartment_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `apartment_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `apartment_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add apartment',6,'add_apartment'),(22,'Can change apartment',6,'change_apartment'),(23,'Can delete apartment',6,'delete_apartment'),(24,'Can view apartment',6,'view_apartment'),(25,'Can add service',7,'add_service'),(26,'Can change service',7,'change_service'),(27,'Can delete service',7,'delete_service'),(28,'Can view service',7,'view_service'),(29,'Can add survey',8,'add_survey'),(30,'Can change survey',8,'change_survey'),(31,'Can delete survey',8,'delete_survey'),(32,'Can view survey',8,'view_survey'),(33,'Can add tu do',9,'add_tudo'),(34,'Can change tu do',9,'change_tudo'),(35,'Can delete tu do',9,'delete_tudo'),(36,'Can view tu do',9,'view_tudo'),(37,'Can add user',10,'add_user'),(38,'Can change user',10,'change_user'),(39,'Can delete user',10,'delete_user'),(40,'Can view user',10,'view_user'),(41,'Can add survey question',11,'add_surveyquestion'),(42,'Can change survey question',11,'change_surveyquestion'),(43,'Can delete survey question',11,'delete_surveyquestion'),(44,'Can view survey question',11,'view_surveyquestion'),(45,'Can add survey answer',12,'add_surveyanswer'),(46,'Can change survey answer',12,'change_surveyanswer'),(47,'Can delete survey answer',12,'delete_surveyanswer'),(48,'Can view survey answer',12,'view_surveyanswer'),(49,'Can add resident family',13,'add_residentfamily'),(50,'Can change resident family',13,'change_residentfamily'),(51,'Can delete resident family',13,'delete_residentfamily'),(52,'Can view resident family',13,'view_residentfamily'),(53,'Can add package',14,'add_package'),(54,'Can change package',14,'change_package'),(55,'Can delete package',14,'delete_package'),(56,'Can view package',14,'view_package'),(57,'Can add feedback',15,'add_feedback'),(58,'Can change feedback',15,'change_feedback'),(59,'Can delete feedback',15,'delete_feedback'),(60,'Can view feedback',15,'view_feedback'),(61,'Can add contract',16,'add_contract'),(62,'Can change contract',16,'change_contract'),(63,'Can delete contract',16,'delete_contract'),(64,'Can view contract',16,'view_contract'),(65,'Can add bill',17,'add_bill'),(66,'Can change bill',17,'change_bill'),(67,'Can delete bill',17,'delete_bill'),(68,'Can view bill',17,'view_bill'),(69,'Can add application',18,'add_application'),(70,'Can change application',18,'change_application'),(71,'Can delete application',18,'delete_application'),(72,'Can view application',18,'view_application'),(73,'Can add access token',19,'add_accesstoken'),(74,'Can change access token',19,'change_accesstoken'),(75,'Can delete access token',19,'delete_accesstoken'),(76,'Can view access token',19,'view_accesstoken'),(77,'Can add grant',20,'add_grant'),(78,'Can change grant',20,'change_grant'),(79,'Can delete grant',20,'delete_grant'),(80,'Can view grant',20,'view_grant'),(81,'Can add refresh token',21,'add_refreshtoken'),(82,'Can change refresh token',21,'change_refreshtoken'),(83,'Can delete refresh token',21,'delete_refreshtoken'),(84,'Can view refresh token',21,'view_refreshtoken'),(85,'Can add id token',22,'add_idtoken'),(86,'Can change id token',22,'change_idtoken'),(87,'Can delete id token',22,'delete_idtoken'),(88,'Can view id token',22,'view_idtoken'),(89,'Can add notification',23,'add_notification'),(90,'Can change notification',23,'change_notification'),(91,'Can delete notification',23,'delete_notification'),(92,'Can view notification',23,'view_notification');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_Apartment_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_Apartment_user_id` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-07-25 10:59:53.437927','1','Tủ đồ 1',1,'[{\"added\": {}}]',9,1),(2,'2024-07-25 11:00:00.097310','2','Tủ đồ 2',1,'[{\"added\": {}}]',9,1),(3,'2024-07-25 11:00:08.410791','3','Tủ đồ 3',1,'[{\"added\": {}}]',9,1),(4,'2024-07-25 11:00:14.923739','4','Tủ đồ 4',1,'[{\"added\": {}}]',9,1),(5,'2024-07-25 11:00:20.041928','5','Tủ đồ 5',1,'[{\"added\": {}}]',9,1),(6,'2024-07-25 11:00:24.994946','6','Tủ đồ 6',1,'[{\"added\": {}}]',9,1),(7,'2024-07-25 11:00:31.596462','7','Tủ đồ 7',1,'[{\"added\": {}}]',9,1),(8,'2024-07-25 11:00:36.876084','8','Tủ đồ 8',1,'[{\"added\": {}}]',9,1),(9,'2024-07-25 11:00:42.497101','9','Tủ đồ 9',1,'[{\"added\": {}}]',9,1),(10,'2024-07-25 11:00:48.148982','10','Tủ đồ 10',1,'[{\"added\": {}}]',9,1),(11,'2024-07-25 13:32:53.618154','1','Dịch vụ cơ bản',1,'[{\"added\": {}}]',7,1),(12,'2024-07-25 13:33:15.347678','2','Dịch vụ tiện ích',1,'[{\"added\": {}}]',7,1),(13,'2024-07-25 13:33:35.588142','3','Dịch vụ khác',1,'[{\"added\": {}}]',7,1),(14,'2024-07-25 13:35:28.022939','2','huytan',1,'[{\"added\": {}}]',10,1),(15,'2024-09-27 18:02:19.750181','3','trinh',1,'[{\"added\": {}}]',10,1),(16,'2024-10-11 09:53:29.996166','4','Phi sua xe',2,'[{\"changed\": {\"fields\": [\"Service\", \"Payment method\", \"Bill image\", \"Status\"]}}]',17,1),(17,'2024-10-11 09:53:45.487876','3','Phi trong tre em',2,'[{\"changed\": {\"fields\": [\"Service\", \"Payment method\", \"Bill image\", \"Status\"]}}]',17,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(6,'Apartment','apartment'),(17,'Apartment','bill'),(16,'Apartment','contract'),(15,'Apartment','feedback'),(23,'Apartment','notification'),(14,'Apartment','package'),(13,'Apartment','residentfamily'),(7,'Apartment','service'),(8,'Apartment','survey'),(12,'Apartment','surveyanswer'),(11,'Apartment','surveyquestion'),(9,'Apartment','tudo'),(10,'Apartment','user'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(19,'oauth2_provider','accesstoken'),(18,'oauth2_provider','application'),(20,'oauth2_provider','grant'),(22,'oauth2_provider','idtoken'),(21,'oauth2_provider','refreshtoken'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-07-25 10:29:42.975746'),(2,'contenttypes','0002_remove_content_type_name','2024-07-25 10:29:43.030745'),(3,'auth','0001_initial','2024-07-25 10:29:43.222753'),(4,'auth','0002_alter_permission_name_max_length','2024-07-25 10:29:43.271757'),(5,'auth','0003_alter_user_email_max_length','2024-07-25 10:29:43.279752'),(6,'auth','0004_alter_user_username_opts','2024-07-25 10:29:43.284756'),(7,'auth','0005_alter_user_last_login_null','2024-07-25 10:29:43.290752'),(8,'auth','0006_require_contenttypes_0002','2024-07-25 10:29:43.292753'),(9,'auth','0007_alter_validators_add_error_messages','2024-07-25 10:29:43.300751'),(10,'auth','0008_alter_user_username_max_length','2024-07-25 10:29:43.307751'),(11,'auth','0009_alter_user_last_name_max_length','2024-07-25 10:29:43.312755'),(12,'auth','0010_alter_group_name_max_length','2024-07-25 10:29:43.323751'),(13,'auth','0011_update_proxy_permissions','2024-07-25 10:29:43.330755'),(14,'auth','0012_alter_user_first_name_max_length','2024-07-25 10:29:43.339752'),(15,'Apartment','0001_initial','2024-07-25 10:29:44.321094'),(16,'admin','0001_initial','2024-07-25 10:29:44.424259'),(17,'admin','0002_logentry_remove_auto_add','2024-07-25 10:29:44.434263'),(18,'admin','0003_logentry_add_action_flag_choices','2024-07-25 10:29:44.447262'),(19,'oauth2_provider','0001_initial','2024-07-25 10:29:45.039529'),(20,'oauth2_provider','0002_auto_20190406_1805','2024-07-25 10:29:45.093556'),(21,'oauth2_provider','0003_auto_20201211_1314','2024-07-25 10:29:45.152555'),(22,'oauth2_provider','0004_auto_20200902_2022','2024-07-25 10:29:45.473678'),(23,'oauth2_provider','0005_auto_20211222_2352','2024-07-25 10:29:45.533679'),(24,'oauth2_provider','0006_alter_application_client_secret','2024-07-25 10:29:45.560717'),(25,'oauth2_provider','0007_application_post_logout_redirect_uris','2024-07-25 10:29:45.631713'),(26,'oauth2_provider','0008_alter_accesstoken_token','2024-07-25 10:29:45.644714'),(27,'oauth2_provider','0009_add_hash_client_secret','2024-07-25 10:29:45.710747'),(28,'oauth2_provider','0010_application_allowed_origins','2024-07-25 10:29:45.782750'),(29,'sessions','0001_initial','2024-07-25 10:29:45.818748'),(30,'Apartment','0002_alter_user_role','2024-07-25 10:51:56.460808'),(31,'Apartment','0003_alter_user_role','2024-07-25 10:54:40.531452'),(32,'Apartment','0004_remove_contract_apartment_remove_contract_user_and_more','2024-08-08 01:17:36.443349'),(33,'Apartment','0005_notification_remove_user_tudo_alter_user_role','2024-10-08 09:08:22.981139');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('4t2btmljq84yi2he1vj4q0vhgeh173ct','.eJxVjEEOwiAQRe_C2hCGwrS4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIsQJx-NwrxkeoO-B7qrcnY6rrMJHdFHrTLa-P0vBzu30EJvXzriIOaWKMFk5UekybMyXECh0ZhGCZCsNGxVRlVZh6N0xkINZJzgCDeH8s0Nx4:1sqroc:AdphDQlzL9Bipulae1zWpCTjHrNehRh_gMT89FnGqEE','2024-10-02 10:21:42.774016'),('bhgo2stxsl5w88r97ah7c6gd38iyhfsk','.eJxVjEEOwiAQRe_C2hCGwrS4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIsQJx-NwrxkeoO-B7qrcnY6rrMJHdFHrTLa-P0vBzu30EJvXzriIOaWKMFk5UekybMyXECh0ZhGCZCsNGxVRlVZh6N0xkINZJzgCDeH8s0Nx4:1seWDz:l57UeuvFc2BElEuicFVEIZgy6t1meVPDBXXaMclQPAk','2024-08-29 08:52:51.113112'),('l0yzlkbfi4trzjn4n13pp9lwlheq3fi3','.eJxVjEEOwiAQRe_C2hCGwrS4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIsQJx-NwrxkeoO-B7qrcnY6rrMJHdFHrTLa-P0vBzu30EJvXzriIOaWKMFk5UekybMyXECh0ZhGCZCsNGxVRlVZh6N0xkINZJzgCDeH8s0Nx4:1sWw8B:iJs-VVQRFo8GiR7xqIDg3FYJhiVM_J8lbfxgvzhrY1A','2024-08-08 10:55:31.509257'),('lhcmhjva0004zg71oqnxnbgojw0arrc7','.eJxVjEEOwiAQRe_C2hCGwrS4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIsQJx-NwrxkeoO-B7qrcnY6rrMJHdFHrTLa-P0vBzu30EJvXzriIOaWKMFk5UekybMyXECh0ZhGCZCsNGxVRlVZh6N0xkINZJzgCDeH8s0Nx4:1syWO2:YUioEtni0gHqJf6mjjgWYkGT8ATqdreeU0gXPTVRYcQ','2024-10-23 13:05:54.511550'),('ojsbot26ozv3pqp3io1xogffaljkwz95','.eJxVjEEOwiAQRe_C2hCGwrS4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIsQJx-NwrxkeoO-B7qrcnY6rrMJHdFHrTLa-P0vBzu30EJvXzriIOaWKMFk5UekybMyXECh0ZhGCZCsNGxVRlVZh6N0xkINZJzgCDeH8s0Nx4:1sy6eM:rPeIwhwE7nE1Nq1CAznzCnCNZqx4jbHaCxZSe3ufbnw','2024-10-22 09:37:02.913534'),('rcjjqc1zzosz42p49zrcasva2a60e6fz','.eJxVjEEOwiAQRe_C2hCGwrS4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIsQJx-NwrxkeoO-B7qrcnY6rrMJHdFHrTLa-P0vBzu30EJvXzriIOaWKMFk5UekybMyXECh0ZhGCZCsNGxVRlVZh6N0xkINZJzgCDeH8s0Nx4:1sy6Q4:OVTWVRzekIH1kD7eA4c0NyKtzs0ye7s9m9eKKIa-PMQ','2024-10-22 09:22:16.068064');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_accesstoken`
--

DROP TABLE IF EXISTS `oauth2_provider_accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_accesstoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `source_refresh_token_id` bigint DEFAULT NULL,
  `id_token_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `source_refresh_token_id` (`source_refresh_token_id`),
  UNIQUE KEY `id_token_id` (`id_token_id`),
  KEY `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_acce_user_id_6e4c9a65_fk_Apartment` (`user_id`),
  CONSTRAINT `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_acce_id_token_id_85db651b_fk_oauth2_pr` FOREIGN KEY (`id_token_id`) REFERENCES `oauth2_provider_idtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_source_refresh_token_e66fbc72_fk_oauth2_pr` FOREIGN KEY (`source_refresh_token_id`) REFERENCES `oauth2_provider_refreshtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_user_id_6e4c9a65_fk_Apartment` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_accesstoken`
--

LOCK TABLES `oauth2_provider_accesstoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_accesstoken` VALUES (1,'h1gMo0DYlm8yddX1FA0Dp46vWcxUSU','2024-07-25 23:56:03.295034','read write',1,1,'2024-07-25 13:56:03.297033','2024-07-25 13:56:03.297033',NULL,NULL),(2,'i69zeUKhimfIwXN2tLSLry3V2QImDw','2024-07-25 23:59:01.959389','read write',1,1,'2024-07-25 13:59:01.959389','2024-07-25 13:59:01.959389',NULL,NULL),(3,'0yR7ha9Tp6IPC4YZoBNCg2VCZTRGnN','2024-08-15 18:54:41.230654','read write',1,1,'2024-08-15 08:54:41.230654','2024-08-15 08:54:41.230654',NULL,NULL),(4,'kmWrrE69xcIHAGXqBz2jMNgJD3beOs','2024-08-15 20:58:15.197234','read write',1,1,'2024-08-15 10:58:15.199231','2024-08-15 10:58:15.199231',NULL,NULL),(5,'sJgm6ib3BLEv004AkWYKIeUMntlsIb','2024-08-15 21:20:25.291235','read write',1,1,'2024-08-15 11:20:25.292465','2024-08-15 11:20:25.292733',NULL,NULL),(6,'ApDrLqEQs3AsX8IreejfqrwtFR91Ky','2024-08-15 21:23:23.310670','read write',1,1,'2024-08-15 11:23:23.311440','2024-08-15 11:23:23.311440',NULL,NULL),(7,'G8z0HLZKwP5swuVKgAANlYVbciowCg','2024-08-21 20:24:59.436513','read write',1,1,'2024-08-21 10:24:59.436513','2024-08-21 10:24:59.436513',NULL,NULL),(8,'1dXK9HvVjMvZMnry17oXw0n7Imu8T1','2024-10-08 19:34:31.855213','read write',1,1,'2024-10-08 09:34:31.855213','2024-10-08 09:34:31.855213',NULL,NULL),(9,'H7gbN4o0l6Dkk57KnhjwytxjhkNvXE','2024-10-08 19:39:37.104288','read write',1,4,'2024-10-08 09:39:37.104288','2024-10-08 09:39:37.104288',NULL,NULL),(10,'2YI50T2mQgn5PPnhr99t8lX1InJvjT','2024-10-08 19:41:53.743143','read write',1,1,'2024-10-08 09:41:53.744068','2024-10-08 09:41:53.744068',NULL,NULL),(11,'t9Q1Rc4B8dbiOyxKOMQzGdYJBKDtnk','2024-10-08 19:45:02.977005','read write',1,1,'2024-10-08 09:45:02.977005','2024-10-08 09:45:02.977005',NULL,NULL),(12,'93A7qLPX3RXXgMBcve5AR0rVrmyPLq','2024-10-08 19:51:57.573389','read write',1,1,'2024-10-08 09:51:57.574383','2024-10-08 09:51:57.574383',NULL,NULL),(13,'UlUmgckSBfdkY0XJvL3FGgosyIukjv','2024-10-08 19:56:28.956570','read write',1,4,'2024-10-08 09:56:28.956570','2024-10-08 09:56:28.956570',NULL,NULL),(14,'TQCNqylGNt3xoqMTKzBrN0nIT1wvP7','2024-10-08 19:57:56.242699','read write',1,1,'2024-10-08 09:57:56.242699','2024-10-08 09:57:56.242699',NULL,NULL),(15,'xQZdCJCxpTHfLJTJW196u4ftGUKVVw','2024-10-08 20:31:10.721340','read write',1,4,'2024-10-08 10:31:10.722337','2024-10-08 10:31:10.722337',NULL,NULL),(16,'PlOOtORGZM6hwWHOIvvjB8ZzAdiEeN','2024-10-08 20:48:38.034728','read write',1,4,'2024-10-08 10:48:38.034728','2024-10-08 10:48:38.034728',NULL,NULL),(17,'AyUWOBElYwywQxJcwQ5pxAELRPSkZr','2024-10-08 21:05:32.784006','read write',1,4,'2024-10-08 11:05:32.785002','2024-10-08 11:05:32.785002',NULL,NULL),(18,'NivBpAZxextyR4DHOAjv0e1eeiD5lB','2024-10-08 21:16:39.336770','read write',1,4,'2024-10-08 11:16:39.336770','2024-10-08 11:16:39.336770',NULL,NULL),(19,'3KlQWst1t5C2FomOtARnFBM8hnqRIf','2024-10-08 22:05:16.528341','read write',1,1,'2024-10-08 12:05:16.529334','2024-10-08 12:05:16.529334',NULL,NULL),(20,'3sxQQn02jEeSpOwvCXizJ5wodaQFqF','2024-10-08 22:17:09.619426','read write',1,4,'2024-10-08 12:17:09.619426','2024-10-08 12:17:09.619426',NULL,NULL),(21,'aPMFFpbM7QeII7torsJjcDWh1Kdn2x','2024-10-08 22:17:34.431128','read write',1,1,'2024-10-08 12:17:34.431827','2024-10-08 12:17:34.431827',NULL,NULL),(22,'wCRhzoyD2heJu6tBhyi5SthethZsAl','2024-10-08 22:18:35.205915','read write',1,4,'2024-10-08 12:18:35.206910','2024-10-08 12:18:35.206910',NULL,NULL),(23,'2ojgcETly1DrGiR9uKYRCFOQPpAx7l','2024-10-08 22:19:01.140890','read write',1,1,'2024-10-08 12:19:01.140890','2024-10-08 12:19:01.140890',NULL,NULL),(24,'5s4YgesYnnY6UdJ12dDV9sHSx5w3fw','2024-10-08 22:19:37.263398','read write',1,4,'2024-10-08 12:19:37.264388','2024-10-08 12:19:37.264388',NULL,NULL),(25,'HIt4CzXb4cspVVIfTPrwSePwyxpRj0','2024-10-08 22:20:50.523829','read write',1,1,'2024-10-08 12:20:50.523829','2024-10-08 12:20:50.523829',NULL,NULL),(26,'VOMzTGBaD0xQb1i1hoda6Fp1ECmXoW','2024-10-09 22:45:09.766768','read write',1,1,'2024-10-09 12:45:09.767275','2024-10-09 12:45:09.767275',NULL,NULL),(27,'hEGbaeMwBI4eV0d3SaLvvYS1w12oQo','2024-10-10 00:13:47.981194','read write',1,4,'2024-10-09 14:13:47.982194','2024-10-09 14:13:47.982194',NULL,NULL),(28,'r2uJqjhswebWtLRbgIaC794zdjvQpz','2024-10-10 00:14:08.727866','read write',1,1,'2024-10-09 14:14:08.728866','2024-10-09 14:14:08.728866',NULL,NULL),(29,'90NCQdeaGl5KEeEI52FLwM1lLzZmg0','2024-10-10 00:25:43.413111','read write',1,4,'2024-10-09 14:25:43.414111','2024-10-09 14:25:43.414111',NULL,NULL),(30,'XylZgRzYSnaNgwg3sfESaRcAkPcOSN','2024-10-10 00:26:14.049699','read write',1,1,'2024-10-09 14:26:14.049699','2024-10-09 14:26:14.049699',NULL,NULL),(31,'2gXPhhNfrJM6O0zLTw5FsC1OxHMLbe','2024-10-10 00:26:58.786166','read write',1,1,'2024-10-09 14:26:58.786166','2024-10-09 14:26:58.786166',NULL,NULL),(32,'4Cxc3JVMP0kCSO5tkvtOhQgFMT8NJ2','2024-10-10 00:30:40.052632','read write',1,1,'2024-10-09 14:30:40.052632','2024-10-09 14:30:40.052632',NULL,NULL),(33,'68Lur3XEL487oA9qR58dDNKigwh33s','2024-10-10 00:57:08.003284','read write',1,4,'2024-10-09 14:57:08.003284','2024-10-09 14:57:08.003284',NULL,NULL),(34,'JeBNFi5yyyRkjhMkHY4GZPwG0y59Ub','2024-10-11 13:28:04.531337','read write',1,1,'2024-10-11 03:28:04.532337','2024-10-11 03:28:04.532337',NULL,NULL),(35,'fb3tUEzrIB4YGa8uMWlQdtVPb0H5dd','2024-10-11 13:37:35.984236','read write',1,4,'2024-10-11 03:37:35.985236','2024-10-11 03:37:35.985236',NULL,NULL),(36,'kk07j0Bvg1YoPG9wEnyB0puUYmJkFD','2024-10-11 14:22:56.462009','read write',1,1,'2024-10-11 04:22:56.463008','2024-10-11 04:22:56.463008',NULL,NULL),(37,'udlpovKgicPZeXm1AGklF8gR7cnn83','2024-10-11 14:24:34.421392','read write',1,1,'2024-10-11 04:24:34.421392','2024-10-11 04:24:34.421392',NULL,NULL),(38,'xwSfQclcFVPeQAi66W0VrCapIs7NeM','2024-10-11 14:28:43.133998','read write',1,4,'2024-10-11 04:28:43.133998','2024-10-11 04:28:43.133998',NULL,NULL),(39,'l1oTnMrE10nlLIIsmCeIlQxVYIyJGr','2024-10-11 19:34:16.492906','read write',1,1,'2024-10-11 09:34:16.493906','2024-10-11 09:34:16.493906',NULL,NULL),(40,'VYJyHk2jaCQ17kEZF8KGcGozWgsIqC','2024-10-11 19:38:38.984740','read write',1,5,'2024-10-11 09:38:38.985739','2024-10-11 09:38:38.985739',NULL,NULL),(41,'A4s6sYIcZm0P9N8eeVB8ZkbZ7SvrcQ','2024-10-11 19:38:56.927889','read write',1,4,'2024-10-11 09:38:56.928399','2024-10-11 09:38:56.928399',NULL,NULL),(42,'A68IQJCES38MPYSkYhZ30kcei3olLX','2024-10-11 19:40:32.749546','read write',1,1,'2024-10-11 09:40:32.749546','2024-10-11 09:40:32.749546',NULL,NULL),(43,'vjh5G5UfBK7iuE0QVCkwMF64uTuztj','2024-10-11 20:04:22.560282','read write',1,4,'2024-10-11 10:04:22.560282','2024-10-11 10:04:22.560282',NULL,NULL);
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_application`
--

DROP TABLE IF EXISTS `oauth2_provider_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_application` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `client_id` varchar(100) NOT NULL,
  `redirect_uris` longtext NOT NULL,
  `client_type` varchar(32) NOT NULL,
  `authorization_grant_type` varchar(32) NOT NULL,
  `client_secret` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `skip_authorization` tinyint(1) NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `algorithm` varchar(5) NOT NULL,
  `post_logout_redirect_uris` longtext NOT NULL DEFAULT (_utf8mb3''),
  `hash_client_secret` tinyint(1) NOT NULL,
  `allowed_origins` longtext NOT NULL DEFAULT (_utf8mb3''),
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id` (`client_id`),
  KEY `oauth2_provider_appl_user_id_79829054_fk_Apartment` (`user_id`),
  KEY `oauth2_provider_application_client_secret_53133678` (`client_secret`),
  CONSTRAINT `oauth2_provider_appl_user_id_79829054_fk_Apartment` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_application`
--

LOCK TABLES `oauth2_provider_application` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_application` DISABLE KEYS */;
INSERT INTO `oauth2_provider_application` VALUES (1,'Z92Y8cE5VcpSQx6J2CXoh8CLpS6xvtjjPptotmOC','','confidential','password','pbkdf2_sha256$600000$5dKeTahSkr5EpEKhmRd3PX$aAmAt7EYyUBLuL711SBABPr+mK5jXqQK/6J0lhHpGpw=','ApartmentManager',1,0,'2024-07-25 13:53:12.643707','2024-07-25 13:53:12.643707','','',1,'');
/*!40000 ALTER TABLE `oauth2_provider_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_grant`
--

DROP TABLE IF EXISTS `oauth2_provider_grant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_grant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `expires` datetime(6) NOT NULL,
  `redirect_uri` longtext NOT NULL,
  `scope` longtext NOT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `code_challenge` varchar(128) NOT NULL,
  `code_challenge_method` varchar(10) NOT NULL,
  `nonce` varchar(255) NOT NULL,
  `claims` longtext NOT NULL DEFAULT (_utf8mb3''),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_grant_user_id_e8f62af8_fk_Apartment_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_grant_user_id_e8f62af8_fk_Apartment_user_id` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_grant`
--

LOCK TABLES `oauth2_provider_grant` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_grant` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_grant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_idtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_idtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_idtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `jti` char(32) NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jti` (`jti`),
  KEY `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_idtoken_user_id_dd512b59_fk_Apartment_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_idtoken_user_id_dd512b59_fk_Apartment_user_id` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_idtoken`
--

LOCK TABLES `oauth2_provider_idtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_refreshtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_refreshtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `access_token_id` bigint DEFAULT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `revoked` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_token_id` (`access_token_id`),
  UNIQUE KEY `oauth2_provider_refreshtoken_token_revoked_af8a5134_uniq` (`token`,`revoked`),
  KEY `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_refr_user_id_da837fce_fk_Apartment` (`user_id`),
  CONSTRAINT `oauth2_provider_refr_access_token_id_775e84e8_fk_oauth2_pr` FOREIGN KEY (`access_token_id`) REFERENCES `oauth2_provider_accesstoken` (`id`),
  CONSTRAINT `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_refr_user_id_da837fce_fk_Apartment` FOREIGN KEY (`user_id`) REFERENCES `apartment_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_refreshtoken`
--

LOCK TABLES `oauth2_provider_refreshtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_refreshtoken` VALUES (1,'HIkjSA6Jflj8JCL2jmhHIqix0eTJZy',1,1,1,'2024-07-25 13:56:03.301034','2024-07-25 13:56:03.301034',NULL),(2,'4FqgoBVfhSl7JaqZug7khOBVFJrAtQ',2,1,1,'2024-07-25 13:59:01.960393','2024-07-25 13:59:01.960393',NULL),(3,'3Y7ATrDh2OmKbGEo20rrQBtpxMEWYq',3,1,1,'2024-08-15 08:54:41.243650','2024-08-15 08:54:41.243650',NULL),(4,'Eu5KcQIH3AIEFp22TJuz4CWTSLTR3Z',4,1,1,'2024-08-15 10:58:15.202939','2024-08-15 10:58:15.202939',NULL),(5,'CeywJmeponOt0Ep07F5ynr8d4IiUkj',5,1,1,'2024-08-15 11:20:25.294954','2024-08-15 11:20:25.294954',NULL),(6,'gS2FbuJ8YnYk9Ui2Knv2bizJCpz378',6,1,1,'2024-08-15 11:23:23.315290','2024-08-15 11:23:23.315434',NULL),(7,'7qFuCl49Ktyib7wKMJ3RhaoGVVu0AN',7,1,1,'2024-08-21 10:24:59.457154','2024-08-21 10:24:59.457154',NULL),(8,'LyvkqY8nKuKIzOwSki6DsCO85yu7M1',8,1,1,'2024-10-08 09:34:31.858199','2024-10-08 09:34:31.858199',NULL),(9,'BwHs7AESar4AqzFFu6l8TDSMXbVE6Q',9,1,4,'2024-10-08 09:39:37.105341','2024-10-08 09:39:37.105341',NULL),(10,'aCP7FBwco2iJb4C1GKUGo4VTGEsq8y',10,1,1,'2024-10-08 09:41:53.745114','2024-10-08 09:41:53.745114',NULL),(11,'TsXHjGMVT2tvRflnaw520poEfkQC1s',11,1,1,'2024-10-08 09:45:02.978003','2024-10-08 09:45:02.978003',NULL),(12,'WTgJvdL18FjTIa06RsEzoZ2nSech6Z',12,1,1,'2024-10-08 09:51:57.575380','2024-10-08 09:51:57.575380',NULL),(13,'QXFLVWHPRXYDf7gD6XUabpTD7EbkTT',13,1,4,'2024-10-08 09:56:28.958581','2024-10-08 09:56:28.958581',NULL),(14,'un6XjqKVpvhJf0aZ6ucBhKPg4uCbE6',14,1,1,'2024-10-08 09:57:56.243689','2024-10-08 09:57:56.243689',NULL),(15,'kF2f2SAHZASwRkcIGEy9sHHwQZvUVo',15,1,4,'2024-10-08 10:31:10.723333','2024-10-08 10:31:10.723333',NULL),(16,'GWoYUDajltjjpcQFAoof87vAbttLQT',16,1,4,'2024-10-08 10:48:38.035725','2024-10-08 10:48:38.035725',NULL),(17,'PYsPdkHVVHTRNHCotpAVihrqNpXpiF',17,1,4,'2024-10-08 11:05:32.785812','2024-10-08 11:05:32.785812',NULL),(18,'JW9ThKlbxXf8GG5P0nZ74tpFcU7poL',18,1,4,'2024-10-08 11:16:39.337766','2024-10-08 11:16:39.337766',NULL),(19,'rpHTlygQ3udOd8ZPp1PCbpexeV6SG1',19,1,1,'2024-10-08 12:05:16.530331','2024-10-08 12:05:16.530331',NULL),(20,'FwKNQdu2VAYfUSwzJuFbsaV6SACGYN',20,1,4,'2024-10-08 12:17:09.620423','2024-10-08 12:17:09.620423',NULL),(21,'XGwAbyHtpuxw1oZkHyvxiAJfBpwg2I',21,1,1,'2024-10-08 12:17:34.432809','2024-10-08 12:17:34.432809',NULL),(22,'jD8sMvQ1IFO6g8Rgxy4tyOXHxodSap',22,1,4,'2024-10-08 12:18:35.207907','2024-10-08 12:18:35.207907',NULL),(23,'4q4NkrAGveiJKejxtByNkpdAybPM88',23,1,1,'2024-10-08 12:19:01.141887','2024-10-08 12:19:01.141887',NULL),(24,'yieL7XgUmwJ2tmKhMd7xHy5tPzNVVd',24,1,4,'2024-10-08 12:19:37.264388','2024-10-08 12:19:37.264388',NULL),(25,'0EaJV3OO8Na2QKIs9YyIQviGjqHXnE',25,1,1,'2024-10-08 12:20:50.524823','2024-10-08 12:20:50.524823',NULL),(26,'jpFFIjzmIZ1I9EbFirXEYwpp7jGvtw',26,1,1,'2024-10-09 12:45:09.784522','2024-10-09 12:45:09.784522',NULL),(27,'Jed4GvPXYq7ZDaCyfKb7a6Gr23f29S',27,1,4,'2024-10-09 14:13:47.984200','2024-10-09 14:13:47.984200',NULL),(28,'ApGfeWnykVB2fHbrRnBTx7miRzXG0I',28,1,1,'2024-10-09 14:14:08.729866','2024-10-09 14:14:08.729866',NULL),(29,'lpqulP8IxzCU7b4eHS7OwvXVOSwIVy',29,1,4,'2024-10-09 14:25:43.415111','2024-10-09 14:25:43.415111',NULL),(30,'H8XuT7RACo9htU64OTfsUBpiFhKTkT',30,1,1,'2024-10-09 14:26:14.050667','2024-10-09 14:26:14.050667',NULL),(31,'JgFaEJ3WsHpqpNk64EUgVJdyQkWrqs',31,1,1,'2024-10-09 14:26:58.787166','2024-10-09 14:26:58.787166',NULL),(32,'n6W0ITx6a7gDaAJ2XvKqYpasor6Fe2',32,1,1,'2024-10-09 14:30:40.054632','2024-10-09 14:30:40.054632',NULL),(33,'Khc82i6WQXwTP5QCn8mtBGOgcSS24j',33,1,4,'2024-10-09 14:57:08.005284','2024-10-09 14:57:08.005284',NULL),(34,'7NqoTXtJHxvCQQlGeqdVNtcEwF0s94',34,1,1,'2024-10-11 03:28:04.535842','2024-10-11 03:28:04.535842',NULL),(35,'TUSzjczAH3YGQDAByKIBqZUxi8q3PQ',35,1,4,'2024-10-11 03:37:35.986236','2024-10-11 03:37:35.986236',NULL),(36,'U9DErBEDJHqzQaQWxHsZBRJmsXGpK6',36,1,1,'2024-10-11 04:22:56.465012','2024-10-11 04:22:56.465012',NULL),(37,'RnNr1m0lisoh2JUIZXQVK1CDApNEu8',37,1,1,'2024-10-11 04:24:34.423393','2024-10-11 04:24:34.423393',NULL),(38,'r8SRYoRILO9ZVzlW3pnK6HWiNGCFKU',38,1,4,'2024-10-11 04:28:43.134998','2024-10-11 04:28:43.134998',NULL),(39,'5e7EPdmJihkNIR1D7aRjv89GJY8MJX',39,1,1,'2024-10-11 09:34:16.497906','2024-10-11 09:34:16.497906',NULL),(40,'FYeiHjlBK4b01a2qhm27oBCc6uq96R',40,1,5,'2024-10-11 09:38:38.986821','2024-10-11 09:38:38.986821',NULL),(41,'pg5O339NUVmZxcTX6DAXDxA6PMACRM',41,1,4,'2024-10-11 09:38:56.930156','2024-10-11 09:38:56.930156',NULL),(42,'v6op6fg1yC3hXRHtrmX1lMSSTFeCsI',42,1,1,'2024-10-11 09:40:32.750545','2024-10-11 09:40:32.750545',NULL),(43,'PlB5OIBIwdGAlDUB1Xg87RCu1Xn8bH',43,1,4,'2024-10-11 10:04:22.561282','2024-10-11 10:04:22.561282',NULL);
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-12 21:53:54
