-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.12 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for testdb
DROP DATABASE IF EXISTS `testdb`;
CREATE DATABASE IF NOT EXISTS `testdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `testdb`;


-- Dumping structure for table testdb.deal_type
DROP TABLE IF EXISTS `deal_type`;
CREATE TABLE IF NOT EXISTS `deal_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.deal_type: ~2 rows (approximately)
DELETE FROM `deal_type`;
/*!40000 ALTER TABLE `deal_type` DISABLE KEYS */;
INSERT INTO `deal_type` (`id`, `type`) VALUES
	(1, 'PURCHASE'),
	(2, 'SALE');
/*!40000 ALTER TABLE `deal_type` ENABLE KEYS */;


-- Dumping structure for table testdb.diesel_configuration
DROP TABLE IF EXISTS `diesel_configuration`;
CREATE TABLE IF NOT EXISTS `diesel_configuration` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL,
  `deal_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8osgmtmqywwe01h2xxyg0dkhq` (`deal_type`),
  CONSTRAINT `FK_8osgmtmqywwe01h2xxyg0dkhq` FOREIGN KEY (`deal_type`) REFERENCES `deal_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.diesel_configuration: ~2 rows (approximately)
DELETE FROM `diesel_configuration`;
/*!40000 ALTER TABLE `diesel_configuration` DISABLE KEYS */;
INSERT INTO `diesel_configuration` (`id`, `price`, `deal_type`) VALUES
	(1, 53.00, 2),
	(2, 49.00, 1);
/*!40000 ALTER TABLE `diesel_configuration` ENABLE KEYS */;


-- Dumping structure for table testdb.diesel_dealer
DROP TABLE IF EXISTS `diesel_dealer`;
CREATE TABLE IF NOT EXISTS `diesel_dealer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.diesel_dealer: ~2 rows (approximately)
DELETE FROM `diesel_dealer`;
/*!40000 ALTER TABLE `diesel_dealer` DISABLE KEYS */;
INSERT INTO `diesel_dealer` (`id`, `name`) VALUES
	(1, 'BCP Ltd'),
	(2, 'HP Ltd'),
	(3, 'Indian Oil Ltd');
/*!40000 ALTER TABLE `diesel_dealer` ENABLE KEYS */;


-- Dumping structure for table testdb.diesel_transaction
DROP TABLE IF EXISTS `diesel_transaction`;
CREATE TABLE IF NOT EXISTS `diesel_transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `deal_type` bigint(20) NOT NULL,
  `diesel_configuration` bigint(20) NOT NULL,
  `diesel_dealer` bigint(20) DEFAULT NULL,
  `firm` bigint(20) DEFAULT NULL,
  `transport` bigint(20) DEFAULT NULL,
  `user` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5nrvspict7cnhub51tlpp0v2b` (`deal_type`),
  KEY `FK_2qbrpv0s09xibipmmhr1vtq2u` (`diesel_configuration`),
  KEY `FK_t6eri01jx0799qsqdbc1q5psf` (`diesel_dealer`),
  KEY `FK_rbcf00dij0paggill1xwdnexg` (`firm`),
  KEY `FK_h8c2h4r2w4lcon45yqrgn5nuj` (`transport`),
  KEY `FK_cru0bpmlatsjfuh9ne70e5r1u` (`user`),
  CONSTRAINT `FK_2qbrpv0s09xibipmmhr1vtq2u` FOREIGN KEY (`diesel_configuration`) REFERENCES `diesel_configuration` (`id`),
  CONSTRAINT `FK_5nrvspict7cnhub51tlpp0v2b` FOREIGN KEY (`deal_type`) REFERENCES `deal_type` (`id`),
  CONSTRAINT `FK_cru0bpmlatsjfuh9ne70e5r1u` FOREIGN KEY (`user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_h8c2h4r2w4lcon45yqrgn5nuj` FOREIGN KEY (`transport`) REFERENCES `transport` (`id`),
  CONSTRAINT `FK_rbcf00dij0paggill1xwdnexg` FOREIGN KEY (`firm`) REFERENCES `firm` (`id`),
  CONSTRAINT `FK_t6eri01jx0799qsqdbc1q5psf` FOREIGN KEY (`diesel_dealer`) REFERENCES `diesel_dealer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.diesel_transaction: ~18 rows (approximately)
DELETE FROM `diesel_transaction`;
/*!40000 ALTER TABLE `diesel_transaction` DISABLE KEYS */;
INSERT INTO `diesel_transaction` (`id`, `date`, `quantity`, `deal_type`, `diesel_configuration`, `diesel_dealer`, `firm`, `transport`, `user`) VALUES
	(1, '2016-08-20', 15, 1, 2, 2, NULL, NULL, 1),
	(2, '2016-08-25', 33, 1, 2, 1, NULL, NULL, 1),
	(3, '2016-08-27', 74, 2, 1, NULL, 4, 4, 1),
	(4, '2016-08-31', 1, 2, 1, NULL, 1, 1, 1),
	(5, '2016-08-31', 2, 1, 2, 1, NULL, NULL, 1),
	(6, '2016-08-31', 4, 2, 1, NULL, 2, 2, 1),
	(7, '2016-08-20', 11, 1, 2, 3, NULL, NULL, 1),
	(8, '2016-08-20', 11, 1, 2, 1, NULL, NULL, 1),
	(9, '2016-08-31', 11, 1, 2, 1, NULL, NULL, 1),
	(10, '2016-08-20', 11, 1, 2, 2, NULL, NULL, 1),
	(11, '2016-08-20', 1, 1, 2, 1, NULL, NULL, 1),
	(12, '2016-08-27', 11, 1, 2, 1, NULL, NULL, 1),
	(13, '2016-08-20', 11, 1, 2, 1, NULL, NULL, 1),
	(14, '2016-08-19', 11, 1, 2, 1, NULL, NULL, 1),
	(15, '2016-08-20', 1, 1, 2, 2, NULL, NULL, 1),
	(16, '2016-08-20', 1, 1, 2, 1, NULL, NULL, 1),
	(17, '2016-08-20', 11, 2, 1, NULL, 2, 2, 1),
	(18, '2016-08-26', 11, 1, 2, 2, NULL, NULL, 1),
	(19, '2016-08-22', 11, 1, 2, 1, NULL, NULL, 1),
	(20, '2016-08-24', 33, 2, 1, NULL, 1, 1, 1),
	(22, '2016-08-21', 22, 2, 1, NULL, 1, 1, 1),
	(23, '2016-08-21', 33, 2, 1, NULL, 1, 1, 1),
	(24, '2016-08-25', 33, 2, 1, NULL, 2, 2, 1),
	(25, '2016-08-24', 33, 2, 1, NULL, 1, 1, 1),
	(26, '2016-08-21', 333, 1, 2, 1, NULL, NULL, 1),
	(27, '2016-08-24', 33, 1, 2, 1, NULL, NULL, 1),
	(29, '2016-08-26', 33, 2, 1, NULL, 1, 1, 1),
	(30, '2016-08-22', 32, 1, 2, 1, NULL, NULL, 1),
	(31, '2016-08-24', 33, 2, 1, NULL, 2, 2, 1),
	(32, '2016-08-25', 33, 1, 2, 1, NULL, NULL, 1),
	(34, '2016-08-21', 2, 2, 1, NULL, 2, 2, 1),
	(35, '2016-08-21', 3, 2, 1, NULL, 1, 1, 1),
	(36, '2016-08-23', 33, 1, 2, 2, NULL, NULL, 1),
	(37, '2016-08-21', 100, 1, 2, 1, NULL, NULL, 1),
	(38, '2016-08-21', 200, 1, 2, 1, NULL, NULL, 1),
	(39, '2016-08-17', 33, 1, 2, 1, NULL, NULL, 1),
	(40, '2016-08-24', 344, 1, 2, 1, NULL, NULL, 1),
	(41, '2016-08-22', 100, 2, 1, NULL, 1, 1, 1),
	(42, '2016-08-21', 111, 2, 1, NULL, 1, 5, 1),
	(43, '2016-08-21', 1000, 1, 2, 1, NULL, NULL, 1),
	(44, '2016-08-21', 1000, 2, 1, NULL, 1, 1, 1),
	(45, '2016-08-21', 766, 2, 1, NULL, 1, 1, 1),
	(46, '2016-08-21', 122, 1, 2, 1, NULL, NULL, 1),
	(47, '2016-08-21', 100, 2, 1, NULL, 1, 1, 1),
	(48, '2016-08-24', 1000, 1, 2, 1, NULL, NULL, 1),
	(49, '2016-08-23', 100, 2, 1, NULL, 2, 2, 1),
	(50, '2016-08-20', 12, 1, 2, 1, NULL, NULL, 1),
	(51, '2016-08-22', 33, 1, 2, 2, NULL, NULL, 1);
/*!40000 ALTER TABLE `diesel_transaction` ENABLE KEYS */;


-- Dumping structure for table testdb.firm
DROP TABLE IF EXISTS `firm`;
CREATE TABLE IF NOT EXISTS `firm` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `owner` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.firm: ~3 rows (approximately)
DELETE FROM `firm`;
/*!40000 ALTER TABLE `firm` DISABLE KEYS */;
INSERT INTO `firm` (`id`, `name`, `owner`) VALUES
	(1, 'Tayani Minerals Pvt Ltd', b'1'),
	(2, 'Ajit Saria Mines And Minerals', b'1'),
	(3, 'Blasting Contractor', b'0'),
	(4, 'Transport Contractor', b'0');
/*!40000 ALTER TABLE `firm` ENABLE KEYS */;


-- Dumping structure for table testdb.transport
DROP TABLE IF EXISTS `transport`;
CREATE TABLE IF NOT EXISTS `transport` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `purchased` date NOT NULL,
  `vehicle_company` varchar(255) NOT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  `vehicle_number` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `firm` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8qhntuvqdtbx058k4rs0vacjh` (`firm`),
  CONSTRAINT `FK_8qhntuvqdtbx058k4rs0vacjh` FOREIGN KEY (`firm`) REFERENCES `firm` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.transport: ~4 rows (approximately)
DELETE FROM `transport`;
/*!40000 ALTER TABLE `transport` DISABLE KEYS */;
INSERT INTO `transport` (`id`, `purchased`, `vehicle_company`, `vehicle_model`, `vehicle_number`, `vehicle_type`, `firm`) VALUES
	(1, '2010-08-05', 'Tata', 'Truck', 'MH-29-VT-3029', 'Mini', 1),
	(2, '2008-05-01', 'L&T', 'Tipper', 'MH-29-VT-3223', 'MiniVan', 2),
	(3, '2015-07-05', 'Tata', 'Minivan', 'MH-29-XY-1001', 'Prima', 3),
	(4, '2015-08-05', 'Mahendra', 'Excavator', 'MH-29-VT-9328', 'Xyc', 4),
	(5, '2014-08-11', 'Mahendra', 'Truck', 'MH-29-VT-1002', 'Mini', 1);
/*!40000 ALTER TABLE `transport` ENABLE KEYS */;


-- Dumping structure for table testdb.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_f9dvvibvpfsldnu8wh3enop4i` (`username`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.user: ~0 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`, `user_role`, `username`) VALUES
	(1, 'a@b.com', 'Deepak', 'Sabhrawal', 'deepak', 'admin', 'dsabhrawal');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
