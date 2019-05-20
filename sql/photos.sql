-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: photoportal
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hashtag`
--

DROP TABLE IF EXISTS `hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hashtag` (
  `TAG_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TEXT` varchar(20) NOT NULL,
  `POST_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`TAG_ID`),
  KEY `POST_ID_TAG_idx` (`POST_ID`),
  CONSTRAINT `POST_ID_TAG` FOREIGN KEY (`POST_ID`) REFERENCES `photo_post` (`POST_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (1,'me',2),(2,'you',2),(3,'we',2),(4,'too',4),(5,'much',4),(7,'cool',2),(8,'fun',3),(9,'no',6),(10,'hohoho',9),(11,'trim',5),(12,'help',2),(13,'friend',2),(14,'me',2),(15,'hi',4),(16,'go',4),(20,'sdjkcx',8),(21,'er',21),(23,'blue',24),(24,'sky',24);
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `likes` (
  `LIKE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `POST_ID` bigint(20) NOT NULL,
  `DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`LIKE_ID`),
  KEY `POST_ID_idx` (`POST_ID`),
  KEY `USER_ID_idx` (`USER_ID`),
  KEY `USER_ID_LIKE_idx` (`USER_ID`),
  KEY `POST_ID_LIKE_idx` (`POST_ID`),
  CONSTRAINT `POST_ID_LIKE` FOREIGN KEY (`POST_ID`) REFERENCES `photo_post` (`POST_ID`),
  CONSTRAINT `USER_ID_LIKE` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,1,1,'2017-12-31 21:00:00'),(10,3,3,'2017-12-31 21:00:00'),(12,4,4,'2017-12-31 21:00:00'),(13,5,4,'2017-12-31 21:00:00'),(14,6,4,'2017-12-31 21:00:00'),(15,2,7,'2017-12-31 21:00:00'),(16,3,8,'2017-12-31 21:00:00'),(17,8,8,'2017-12-31 21:00:00'),(19,2,24,'2019-05-20 17:11:07'),(20,1,24,'2019-05-20 17:16:26'),(21,1,23,'2019-05-20 17:16:35'),(22,1,26,'2019-05-20 17:19:05'),(23,1,11,'2019-05-20 17:19:48');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_post`
--

DROP TABLE IF EXISTS `photo_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `photo_post` (
  `POST_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(200) NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PHOTO_LINK` varchar(150) NOT NULL,
  `USER_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`POST_ID`),
  KEY `USER_ID_idx` (`USER_ID`),
  CONSTRAINT `USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_post`
--

LOCK TABLES `photo_post` WRITE;
/*!40000 ALTER TABLE `photo_post` DISABLE KEYS */;
INSERT INTO `photo_post` VALUES (1,'57','2006-12-30 09:00:00','2',2),(2,'Now i choose you Pikachu','2016-12-29 21:00:00','http://pic',1),(3,'Just try to live without love','2018-12-29 21:00:00','http://pic2',1),(4,'I can do when you are near','2018-11-11 11:20:00','http://pic3',1),(5,'What do you think about it?','2018-12-31 21:00:00','http://pic4',1),(6,'My home is your home','2019-01-31 21:00:00','http://pic5',1),(7,'Do you like traveling?','2019-02-01 16:10:00','http://pic6',2),(8,'North or west home is best','2019-03-01 07:18:00','http://pic7',2),(9,'What about dance?','2019-03-02 20:23:00','http://pic8',1),(10,'I need some help today','2019-03-02 21:00:00','http://pic10',1),(11,'I will be even better','2013-09-08 05:01:00','http://pic20',7),(12,'Hello Its me','2019-04-30 21:00:00','http://pic20',5),(13,'The real Heroes!','2019-05-08 21:00:00','http://pic20',6),(14,'We are proud of you','2019-05-09 07:00:00','http://pic21',6),(15,'We must remember','2017-05-09 09:12:00','http://pic22',4),(16,'Today is a good day','2019-05-05 20:59:33','http://pic23',3),(18,'it\'s so bad day','2018-12-31 21:00:00','ghekf',1),(20,'djfnvkjsfgnskjgnkjsr','2019-05-20 16:11:56','http://localhost:8080/photo?filename=pic-8286093913667778742.jpeg',2),(21,'rtlgksrtjg srfddf','2019-05-20 16:13:44','http://localhost:8080/photo?filename=pic-2637169136331599664.jpeg',2),(22,'reuqfwieurnfiernveirtsgfjbjkfg','2019-05-20 16:17:22','http://localhost:8080/photo?filename=pic-315254599996004205.jpeg',2),(23,'dfjlenfkjaenrfkjafd','2019-05-20 16:27:53','http://localhost:8080/photo?filename=pic-6054480278812688773.png',2),(24,'blue sky blue people','2019-05-20 16:44:31','http://localhost:8080/photo?filename=pic-5583165611560228174.jpeg',2),(26,'go with me and ))','2019-05-20 17:18:56','http://localhost:8080/photo?filename=pic-254535893518728168.jpeg',1);
/*!40000 ALTER TABLE `photo_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'AndyVoid'),(2,'Admin'),(3,'Valera'),(4,'Goga'),(5,'Lora'),(6,'Vova'),(7,'Nona'),(8,'OldMan'),(9,'CoolMan'),(10,'GetMan'),(11,'AndyVoid'),(12,'AndyVoid');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'photoportal'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-20 21:37:49
