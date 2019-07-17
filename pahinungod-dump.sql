-- MySQL dump 10.14  Distrib 5.5.64-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: pahinungod
-- ------------------------------------------------------
-- Server version	5.5.64-MariaDB-1ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `activityId` int(5) NOT NULL AUTO_INCREMENT,
  `activityname` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `noOfVolunteers` int(11) DEFAULT NULL,
  `participants` varchar(50) DEFAULT NULL,
  `coordinatorincharge` varchar(50) DEFAULT NULL,
  `userId` int(5) NOT NULL,
  PRIMARY KEY (`activityId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'NSTP TBA','Team building activity for NSTP classes','2019-03-03','2019-05-03',12,'NSTP Students','Alamo, Melissa',1),(2,'Pahinungod Portal','Online portal made by interns ','2019-06-16','2019-07-12',4,'ICS Students','Lanaca, Aileen',2);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `civil_status` varchar(255) DEFAULT NULL,
  `classification` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `year_level` varchar(255) DEFAULT NULL,
  `citizenship` varchar(255) DEFAULT NULL,
  `birth_place` varchar(255) DEFAULT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `blood_type` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `organizations` varchar(255) DEFAULT NULL,
  `illness` varchar(255) DEFAULT NULL,
  `beneficiary_name` varchar(255) DEFAULT NULL,
  `beneficiary_relationship` varchar(255) DEFAULT NULL,
  `beneficiary_contact_number` varchar(255) DEFAULT NULL,
  `beneficiary_address` varchar(255) DEFAULT NULL,
  `contact_person_name` varchar(255) DEFAULT NULL,
  `contact_person_relationship` varchar(255) DEFAULT NULL,
  `contact_person_contact_number` varchar(255) DEFAULT NULL,
  `contact_person_address` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user','useruser','UserFirstName','UserLastName',0,'null','Middle',0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null'),(2,'admin','adminadmin','AdminFirstName','AdminLastName',1,'admin@admin','Admin Middlename',0,'null','null','null','null','null','null','null','1/1/1990','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null'),(35,'user1','password','jay','',0,'em@ae','',0,'','','','','','','','','','','','','','','','','','','','','','','','','',''),(39,'cjldadios','password','Charles Jayson','Dadios',0,'cjldadios@up.edu.ph','Lucas',0,'single','junior','Musician','BSCS','4','Filipino','Rizal, N.E.','4/1/1997','163.5','58.5','A+','Maahas, Los Baños, Laguna','09077881330','Musical','English, Filipino','CCC','N/A','Joy','Sister','null','null','Grace','mother','N/A','Maahas, Los Baños, Laguna','I came here for the food.'),(40,'cjldadios2','password','undefined','',0,'cjldadios2@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_activity`
--

DROP TABLE IF EXISTS `user_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_activity` (
  `useractivityid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) DEFAULT NULL,
  `activityid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`useractivityid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_activity`
--

LOCK TABLES `user_activity` WRITE;
/*!40000 ALTER TABLE `user_activity` DISABLE KEYS */;
INSERT INTO `user_activity` VALUES (1,'35','1'),(2,'39','1'),(3,'39','2');
/*!40000 ALTER TABLE `user_activity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-17 11:26:02
