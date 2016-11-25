-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.12-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
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
	(1, 60.00, 2),
	(2, 50.00, 1);
/*!40000 ALTER TABLE `diesel_configuration` ENABLE KEYS */;

-- Dumping structure for table testdb.diesel_dealer
DROP TABLE IF EXISTS `diesel_dealer`;
CREATE TABLE IF NOT EXISTS `diesel_dealer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.diesel_dealer: ~3 rows (approximately)
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
  `quantity` bigint(20) NOT NULL DEFAULT '0',
  `deal_type` bigint(20) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `diesel_dealer` bigint(20) DEFAULT NULL,
  `firm` bigint(20) DEFAULT NULL,
  `transport` bigint(20) DEFAULT NULL,
  `user` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5nrvspict7cnhub51tlpp0v2b` (`deal_type`),
  KEY `FK_2qbrpv0s09xibipmmhr1vtq2u` (`price`),
  KEY `FK_t6eri01jx0799qsqdbc1q5psf` (`diesel_dealer`),
  KEY `FK_rbcf00dij0paggill1xwdnexg` (`firm`),
  KEY `FK_h8c2h4r2w4lcon45yqrgn5nuj` (`transport`),
  KEY `FK_cru0bpmlatsjfuh9ne70e5r1u` (`user`),
  CONSTRAINT `FK_5nrvspict7cnhub51tlpp0v2b` FOREIGN KEY (`deal_type`) REFERENCES `deal_type` (`id`),
  CONSTRAINT `FK_cru0bpmlatsjfuh9ne70e5r1u` FOREIGN KEY (`user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_h8c2h4r2w4lcon45yqrgn5nuj` FOREIGN KEY (`transport`) REFERENCES `transport` (`id`),
  CONSTRAINT `FK_rbcf00dij0paggill1xwdnexg` FOREIGN KEY (`firm`) REFERENCES `firm` (`id`),
  CONSTRAINT `FK_t6eri01jx0799qsqdbc1q5psf` FOREIGN KEY (`diesel_dealer`) REFERENCES `diesel_dealer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.diesel_transaction: ~21 rows (approximately)
DELETE FROM `diesel_transaction`;
/*!40000 ALTER TABLE `diesel_transaction` DISABLE KEYS */;
INSERT INTO `diesel_transaction` (`id`, `date`, `quantity`, `deal_type`, `price`, `diesel_dealer`, `firm`, `transport`, `user`) VALUES
	(119, '2016-10-19', 300, 1, 45.00, 1, NULL, NULL, 1),
	(120, '2016-10-19', 100, 2, 0.10, NULL, 1, 1, 1),
	(122, '2016-10-20', 55, 1, 70.00, 1, NULL, NULL, 1),
	(124, '2016-10-22', 99, 2, 0.10, NULL, 1, 1, 1),
	(125, '2016-10-25', 300, 1, 31.00, 1, NULL, NULL, 1),
	(126, '2016-10-25', 300, 2, 90.00, NULL, 2, 2, 1),
	(127, '2016-10-19', 100, 2, 0.10, NULL, 1, 1, 1),
	(128, '2016-10-26', 200, 1, 10.00, 1, NULL, NULL, 1),
	(129, '2016-10-27', 100, 1, 43.00, 2, NULL, NULL, 1),
	(130, '2016-10-29', 100, 1, 40.00, 1, NULL, NULL, 1),
	(131, '2016-10-29', 60, 2, 43.00, NULL, 4, 4, 1),
	(132, '2016-10-29', 100, 2, 0.10, NULL, 1, 5, 1),
	(134, '2016-10-29', 200, 2, 40.00, NULL, 3, 3, 1),
	(135, '2016-10-31', 100, 1, 55.10, 1, NULL, NULL, 1),
	(138, '2016-10-30', 45, 1, 43.00, 1, NULL, NULL, 1),
	(139, '2016-11-01', 40, 2, 0.10, NULL, 1, 1, 1),
	(143, '2016-11-09', 200, 1, 23.00, 1, NULL, NULL, 1),
	(153, '2016-11-12', 344, 2, 35.00, NULL, 3, 3, 1),
	(164, '2016-11-15', 100, 1, 10.00, 1, NULL, NULL, 1),
	(165, '2016-11-16', 100, 1, 10.00, 1, NULL, NULL, 1),
	(166, '2016-11-16', 30, 2, 40.00, NULL, 4, 4, 1);
/*!40000 ALTER TABLE `diesel_transaction` ENABLE KEYS */;

-- Dumping structure for table testdb.firm
DROP TABLE IF EXISTS `firm`;
CREATE TABLE IF NOT EXISTS `firm` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `owner` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.firm: ~4 rows (approximately)
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

-- Dumping data for table testdb.transport: ~5 rows (approximately)
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table testdb.user: ~2 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`, `user_role`, `username`) VALUES
	(1, 'a@b.com', 'Deepak', 'Sabhrawal', 'deepak', 'admin', 'dsabhrawal'),
	(2, 'b@c.om', 'Adi', 'Raju', 'raju', 'office', 'adi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
