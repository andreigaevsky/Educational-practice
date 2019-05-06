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
  CONSTRAINT `POST_ID_TAG` FOREIGN KEY (`POST_ID`) REFERENCES `photo_post` (`POST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (1,'me',2),(2,'you',2),(3,'we',2),(4,'too',4),(5,'much',4),(6,'andy',1),(7,'cool',2),(8,'fun',3),(9,'no',6),(10,'hohoho',9),(11,'trim',5);
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `like` (
  `LIKE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `POST_ID` bigint(20) NOT NULL,
  `DATE` date NOT NULL,
  PRIMARY KEY (`LIKE_ID`),
  KEY `POST_ID_idx` (`POST_ID`),
  KEY `USER_ID_idx` (`USER_ID`),
  KEY `USER_ID_LIKE_idx` (`USER_ID`),
  KEY `POST_ID_LIKE_idx` (`POST_ID`),
  CONSTRAINT `POST_ID_LIKE` FOREIGN KEY (`POST_ID`) REFERENCES `photo_post` (`POST_ID`),
  CONSTRAINT `USER_ID_LIKE` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,2,1,'2018-01-01'),(2,1,1,'2018-01-01'),(10,3,3,'2018-01-01'),(11,2,1,'2018-01-01'),(12,4,4,'2018-01-01'),(13,5,4,'2018-01-01'),(14,6,4,'2018-01-01'),(15,2,7,'2018-01-01'),(16,3,8,'2018-01-01'),(17,8,8,'2018-01-01');
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
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
  CONSTRAINT `USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_post`
--

LOCK TABLES `photo_post` WRITE;
/*!40000 ALTER TABLE `photo_post` DISABLE KEYS */;
INSERT INTO `photo_post` VALUES (1,'I feel bad, and you?','2006-12-30 09:00:00','http://',2),(2,'Now i choose you Pikachu','2016-12-29 21:00:00','http://pic',1),(3,'Just try to live without love','2018-12-29 21:00:00','http://pic2',1),(4,'I can do when you are near','2018-11-11 11:20:00','http://pic3',1),(5,'What do you think about it?','2018-12-31 21:00:00','http://pic4',1),(6,'My home is your home','2019-01-31 21:00:00','http://pic5',1),(7,'Do you like traveling?','2019-02-01 16:10:00','http://pic6',2),(8,'North or west home is best','2019-03-01 07:18:00','http://pic7',2),(9,'What about dance?','2019-03-02 20:23:00','http://pic8',1),(10,'I need some help today','2019-03-02 21:00:00','http://pic10',1),(11,'I will be even better','2013-09-08 05:01:00','http://pic20',7);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'AndyVoid'),(2,'Admin'),(3,'Valera'),(4,'Goga'),(5,'Lora'),(6,'Vova'),(7,'Nona'),(8,'OldMan'),(9,'CoolMan'),(10,'GetMan');
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

-- Dump completed on 2019-05-05 17:23:53
