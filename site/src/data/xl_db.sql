-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: xl-distribuidora
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `asides`
--

DROP TABLE IF EXISTS `asides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `usuariosId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  CONSTRAINT `asides_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asides`
--

LOCK TABLES `asides` WRITE;
/*!40000 ALTER TABLE `asides` DISABLE KEYS */;
INSERT INTO `asides` VALUES (1,NULL,NULL,2,'2022-11-18 04:06:47','2022-11-18 04:06:47');
/*!40000 ALTER TABLE `asides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuariosId` int NOT NULL,
  `productosId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  KEY `productosId` (`productosId`),
  CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `carritos_ibfk_2` FOREIGN KEY (`productosId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Aromatizantes','2022-11-18 04:06:47','2022-11-18 04:06:47'),(2,'Detergentes','2022-11-18 04:06:47','2022-11-18 04:06:47'),(3,'Desinfectantes','2022-11-18 04:06:47','2022-11-18 04:06:47'),(4,'Fragancias','2022-11-18 04:06:47','2022-11-18 04:06:47'),(5,'Higiene dental','2022-11-18 04:06:47','2022-11-18 04:06:47'),(6,'Insecticida','2022-11-18 04:06:47','2022-11-18 04:06:47'),(7,'Limpieza','2022-11-18 04:06:47','2022-11-18 04:06:47'),(8,'Otros','2022-11-18 04:06:47','2022-11-18 04:06:47');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiales`
--

DROP TABLE IF EXISTS `historiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `descuento` int DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `categoriasId` int NOT NULL,
  `marcasId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoriasId` (`categoriasId`),
  KEY `marcasId` (`marcasId`),
  CONSTRAINT `historiales_ibfk_1` FOREIGN KEY (`categoriasId`) REFERENCES `categorias` (`id`),
  CONSTRAINT `historiales_ibfk_2` FOREIGN KEY (`marcasId`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiales`
--

LOCK TABLES `historiales` WRITE;
/*!40000 ALTER TABLE `historiales` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialimagenes`
--

DROP TABLE IF EXISTS `historialimagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialimagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `historialId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `historialId` (`historialId`),
  CONSTRAINT `historialimagenes_ibfk_1` FOREIGN KEY (`historialId`) REFERENCES `historiales` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialimagenes`
--

LOCK TABLES `historialimagenes` WRITE;
/*!40000 ALTER TABLE `historialimagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialimagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `productosId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productosId` (`productosId`),
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`productosId`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'XL1.jpeg',1,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(2,'imagen1.webp',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(3,'imagen2.webp',3,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(4,'imagen3.webp',4,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(5,'imagen4.webp',5,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(6,'imagen5.webp',6,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(7,'imagen6.webp',7,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(8,'imagen7.webp',8,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(9,'imagen8.webp',9,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(10,'imagen9.webp',10,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(11,'imagen10.webp',11,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(12,'imagen11.webp',12,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(13,'imagen12.jpg',13,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(14,'imagen13.webp',14,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(15,'imagen14.webp',15,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(16,'imagen15.webp',16,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(17,'imagen16.webp',17,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(18,'imagen17c.webp',18,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(19,'imagen18.webp',19,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(20,'imagen19.webp',20,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(21,'imagen20.webp',21,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(22,'imagen21.webp',22,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(23,'imagen22.webp',23,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(24,'imagen23.webp',24,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(25,'imagen25.webp',25,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(26,'imagen26.webp',26,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(27,'imagen27.webp',27,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(28,'imagen28.webp',28,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(29,'imagen29.png',29,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(30,'imagen30.webp',30,'2022-11-18 04:06:47','2022-11-18 04:06:47');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Axe','2022-11-18 04:06:47','2022-11-18 04:06:47'),(2,'Ala','2022-11-18 04:06:47','2022-11-18 04:06:47'),(3,'Asepxia','2022-11-18 04:06:47','2022-11-18 04:06:47'),(4,'Ariel','2022-11-18 04:06:47','2022-11-18 04:06:47'),(5,'Ayudin','2022-11-18 04:06:47','2022-11-18 04:06:47'),(6,'Cif','2022-11-18 04:06:47','2022-11-18 04:06:47'),(7,'Colgate','2022-11-18 04:06:47','2022-11-18 04:06:47'),(8,'Dove','2022-11-18 04:06:47','2022-11-18 04:06:47'),(9,'Gilette','2022-11-18 04:06:47','2022-11-18 04:06:47'),(10,'Higienol','2022-11-18 04:06:47','2022-11-18 04:06:47'),(11,'Inoxy','2022-11-18 04:06:47','2022-11-18 04:06:47'),(12,'Lisoform','2022-11-18 04:06:47','2022-11-18 04:06:47'),(13,'LisoformZiploc','2022-11-18 04:06:47','2022-11-18 04:06:47'),(14,'Listerine','2022-11-18 04:06:47','2022-11-18 04:06:47'),(15,'Raid','2022-11-18 04:06:47','2022-11-18 04:06:47'),(16,'Magistral','2022-11-18 04:06:47','2022-11-18 04:06:47'),(17,'MrMusculo','2022-11-18 04:06:47','2022-11-18 04:06:47'),(18,'Rexona','2022-11-18 04:06:47','2022-11-18 04:06:47'),(19,'Off','2022-11-18 04:06:47','2022-11-18 04:06:47'),(20,'Oral B','2022-11-18 04:06:47','2022-11-18 04:06:47'),(21,'Otros','2022-11-18 04:06:47','2022-11-18 04:06:47'),(22,'Virulana','2022-11-18 04:06:47','2022-11-18 04:06:47'),(23,'Zorro3D','2022-11-18 04:06:47','2022-11-18 04:06:47');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuariosId` int NOT NULL,
  `carritosId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  KEY `carritosId` (`carritosId`),
  CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `ordenes_ibfk_2` FOREIGN KEY (`carritosId`) REFERENCES `carritos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `descuento` int DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `categoriasId` int NOT NULL,
  `marcasId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoriasId` (`categoriasId`),
  KEY `marcasId` (`marcasId`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoriasId`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`marcasId`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Esencia de 50ml  ',10,1500,10,'Escencia de 50ml fabricada artesanalmente por la distribuidora XL contiene una dulce fragancia aroma a vainilla.',3,13,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(2,'Jabon liquido Ariel 3l',50,1200,10,'Jabon liquido para lavar la ropa.',5,1,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(3,'Detergente liquido magistral',50,450,10,'Detergente liquido para limpiar vajillas contiene fragancia limón.',6,9,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(4,'Detergente Cif BioActive',50,450,10,'Detergente liquido para limpiar vajillas.',6,14,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(5,'Cepillo de dientes para adultos 3x1',50,650,5,'Cepillo de dientes para el cuidado diario de la salud bucal.',8,6,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(6,'Papel higienico higienol por 80m 4 unidades.',50,250,NULL,'Papel higienico de hoja simple para uso diario.',1,7,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(7,'Virulana',50,70,NULL,'Virulana inoxidable de larga duración.',4,19,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(8,'Jabon compacto clasico de 150g',50,150,NULL,'Jabon compacto clasico de 150g.',5,21,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(9,'Insecticida en aerosol mata moscas y mosquitos',50,420,NULL,'Nueva formula mata moscas y mosquitos de doble acción',8,18,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(10,'Raid en tabletas',50,200,NULL,'Raid en tableta, mata y repele mosquitos, insecticida contiene 24 unidades.',3,3,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(11,'Toallitas desinfectantes Ayudin',50,230,NULL,'Toallitas desinfectantes de superficies Ayudin contiene 24 unidades.',2,7,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(12,'Raid en aerosol mata cucarachas',50,650,NULL,'Insecticida mata cucarachas y arañas en el acto.',6,17,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(13,'Repelente contra mosquitos Off',50,420,NULL,'Repelente contra mosquitos en aerosol marca off con duracion de hasta 12 horas.',1,16,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(14,'Raid en espiral 12 unidades',50,320,NULL,'Raid en espiral contiene 12 unidades repele mosquitos.',2,13,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(15,'Repuesto MrMusculo antigrasa 450ml',50,410,NULL,'MrMusculo antigrasa limpieza la suciedad de la cocina dejando un aroma agradable.',7,11,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(16,'Lisoform desinfectante multisuperficies 500cc',50,510,NULL,'Lisoform liquido desifectante multisuperficies contiene 500cc',1,11,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(17,'Limpiador desinfectante liquido',50,370,NULL,'Limpiador desinfectante multisuperficies con aroma floral.',2,17,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(18,'Mopa inteligente multiusos',10,5030,10,'Mopa marca Virulana rotomop sin esfuerzo y con centifugado automatico con mopa de respuesto incluida.',3,6,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(19,'Jabon liquido Alamatic 3l',50,1200,10,'Jabon liquido para lavar la ropa marca Ala para un lavado perfecto.',2,23,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(20,'Combo Lisoform desifectante más bolsas ziploc',50,670,NULL,'Lisoform en aerosol contiene 40g/55cm3 + bolsas ziploc con cierre deslizable 11 unidades.',3,22,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(21,'Colgate luminous white ',50,580,NULL,'Pasta de dientes para cuidado diario remueve manchas dificiles.',3,17,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(22,'Enjuage bucal Colgate zero alcohol 250ml ',50,430,NULL,'Enjuage bucal Colgate contiene zero alcohol con sensacion pro alivio contiene 250 ml.',8,15,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(23,'Cepillo de dientes 2x1 Oral B',50,410,10,'Cepillo de dientes para el cuidado diario de la salud bucal.',6,20,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(24,'Enjuage bucal Listerine Zero Alcohol',50,610,NULL,'Enjuage bucal Listerine contiene zero alcohol anticaries, sabor menta, contiene 500 ml.',6,6,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(25,'Desodorante en aerosol Dove men care',50,460,NULL,'Desodorante dove men care nueva formula mejorada duracion de hasta 48 horas.',7,9,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(26,'Rexona motion sense',50,470,10,'Desodorante antitranspirante de hasta 48 horas de duración.',1,4,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(27,'Espuma para piel sensible 322ml',50,625,NULL,'Espuma para pieles sensibles marca Gilette contiene 322ml.',2,20,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(28,'Desodorante en aerosol Axe ',50,400,10,'Desodorante en aerosol con una duración de hasta 48 horas con aroma canela & ambar.',5,2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(29,'Jabon carbon detox compacto Asepxia',50,310,10,'Jabon compacto con efecto purificante Asepxia contiene 100g.',4,12,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(30,'Maquina rasuradora prestobarba 3 sensitive   ',50,850,10,'Maquina rasuradora x2 confort gel sensitive para pieles sensibles.',4,20,'2022-11-18 04:06:47','2022-11-18 04:06:47');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','2022-11-18 04:06:47','2022-11-18 04:06:47'),(2,'Usuario','2022-11-18 04:06:47','2022-11-18 04:06:47');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220926122624-create-marcas.js'),('20220926122845-create-categorias.js'),('20220926123321-create-roles.js'),('20220926123359-create-usuarios.js'),('20220926124515-create-productos.js'),('20220926125051-create-historiales.js'),('20220926125216-create-asides.js'),('20220926125557-create-imagenes.js'),('20220926125644-create-carritos.js'),('20220926125661-create-imagenesHistorial.js'),('20220926125841-create-ordenes.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `género` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `estado_provincia` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `calle` varchar(255) DEFAULT NULL,
  `teléfono` varchar(255) DEFAULT NULL,
  `códigoPostal` int DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `rolId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'cbalk0','Carolan','Balk','Female','cbalk0@linkedin.com','kpWQs6','United States','California','Sacramento','Dwight','+1 (916) 963-4765',94207,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(2,'mrittmeier1','Morey','Rittmeier','Male','mrittmeier1@mapquest.com','9z1HD7fU','Argentina',NULL,'Arroyo Seco','School','+54 (711) 375-6238',5196,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(3,'cgierth2','Chiquita','Gierth','Non-binary','cgierth2@amazon.com','iVNRTJ5kvu','Mexico','Veracruz Llave','El Mirador','Northport','+52 (220) 732-4989',93429,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(4,'sjewers3','Staci','Jewers','Female','sjewers3@biglobe.ne.jp','VvHLHfLjbGH6','Colombia',NULL,'Salgar','Canary','+57 (588) 419-2632',56478,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(5,'cgrove4','Carver','Grove','Male','cgrove4@mozilla.org','7ybEtn','Colombia',NULL,'Ubaté','Westridge','+57 (625) 578-1940',250437,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(6,'jseston5','Jaclin','Seston','Female','jseston5@histats.com','qWxHUXh','United States','California','Richmond','Old Gate','+1 (510) 130-5585',94807,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(7,'dsavege6','Dayle','Savege','Female','dsavege6@t-online.de','KtMgqwuj7Nh','Mexico','Tamaulipas','Revolucion Verde','Vidon','+52 (224) 376-6566',87445,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(8,'cswinnerton7','Corbie','Swinnerton','Genderqueer','cswinnerton7@google.ru','M324HMGd','Mexico','Veracruz Llave','Adolfo Lopez Mateos','Farwell','+52 (385) 277-6766',94324,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(9,'bwilleson8','Bayard','Willeson','Male','bwilleson8@twitter.com','ZSZGbQnB','Chile',NULL,'Cabrero','Bayside','+56 (760) 976-3053',NULL,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(10,'rgarling9','Raffaello','Garling','Male','rgarling9@businesswire.com','E7KcUt94cU','United States','Mississippi','Jackson','Laurel','+1 (601) 308-8107',39204,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(11,'emalthousea','Evan','Malthouse','Male','emalthousea@si.edu','NxFQhzn','United States','Georgia','Albany','Norway Maple','+1 (229) 733-7263',31704,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(12,NULL,'Doe','Droghan',NULL,'ddroghanb@newyorker.com','P9d4WttSP50H','Chile',NULL,'Chonchi','Warbler','+56 (574) 450-5783',NULL,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(13,'cgreginec','Cindi','Gregine','Female','cgreginec@shinystat.com','6qRYd3px','United States','Colorado','Aurora','Straubel','+1 (303) 762-4491',80045,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(14,'ophippd','Orelia','Phipp','Female','ophippd@webnode.com','ybHyt6jJv','United States','Missouri','Saint Louis','Butterfield','+1 (314) 730-9304',63169,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(15,'aemmersone','Ariadne','Emmerson','Female','aemmersone@twitpic.com','4leifx1ZE','Argentina',NULL,'Bella Vista','Miller','+54 (372) 721-2870',9400,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(16,'khensf','Kylie','Hens','Male','khensf@sina.com.cn','LCulpz0','Colombia',NULL,'Buesaco','Farwell','+57 (406) 877-0461',520518,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(17,'aduddeng','Amalea','Dudden','Female','aduddeng@amazonaws.com','93iveqO2UHb','United States','District of Columbia','Washington','Lien','+1 (202) 405-2706',56944,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(18,'fmcnuffh','Fabe','McNuff','Genderfluid','fmcnuffh@soundcloud.com','AXkcBYuLyNP0','United States','Utah','Salt Lake City','Melvin','+1 (801) 816-2514',84125,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(19,NULL,'Meredith','MacDonagh',NULL,'mmacdonaghi@cdbaby.com','KALpJWPjcb4L','United States','Missouri','Saint Louis','Everett','+1 (314) 685-3940',63143,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(20,'aranniganj','Aggie','Rannigan','Female','aranniganj@dyndns.org','bXUjgTigy','Mexico','Oaxaca','Emiliano Zapata','Bayside','+52 (703) 815-6098',71836,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(21,'bpaddellk','Bidget','Paddell','Female','bpaddellk@amazon.com','c3Qww3ddTEV','Colombia',NULL,'Garagoa','Vermont','+57 (124) 505-0876',152867,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(22,'mkirmanl','Marvin','Kirman','Male','mkirmanl@nps.gov','MwzwpBFFub8j','Mexico','Jalisco','San Isidro','East','+52 (144) 564-0825',45147,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(23,'ksyvretm','Kele','Syvret','Male','ksyvretm@amazonaws.com','AlkdjDU','United States','Pennsylvania','Pittsburgh','Brickson Park','+1 (412) 110-4203',15240,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(24,'groycroftn','Giorgio','Roycroft','Male','groycroftn@jiathis.com','KWANdrrjp','Argentina',NULL,'Allen','Hazelcrest','+54 (891) 614-4180',8328,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(25,'erubinchiko','Esdras','Rubinchik','Male','erubinchiko@mashable.com','rAQcpNKn','Colombia',NULL,'Candelaria','Roxbury','+57 (295) 279-2902',111711,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(26,NULL,'Cobby','Ethelston',NULL,'cethelstonp@edublogs.org','IGjw2nBTXgbt','Chile',NULL,'San Javier','Eastwood','+56 (819) 906-5542',NULL,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(27,'rdiehnq','Rebekah','Diehn','Female','rdiehnq@indiatimes.com','TZ3LtyAMqHrP','Argentina',NULL,'Huerta Grande','Beilfuss','+54 (278) 120-1719',5174,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(28,'cstoterr','Currey','Stoter','Male','cstoterr@multiply.com','XQz43s2x','Colombia',NULL,'El Espino','Reinke','+57 (836) 349-0370',151247,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(29,'emennears','Ericha','Mennear','Female','emennears@livejournal.com','JpjgO7','Argentina',NULL,'General Ramírez','Gina','+54 (426) 749-4794',3165,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(30,'dfeechant','Donovan','Feechan','Male','dfeechant@altervista.org','1WVLnEEnEn9C','Mexico','Mexico','El Tejocote','Warbler','+52 (676) 955-6207',50625,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(31,'cespinoyu','Clotilda','Espinoy','Female','cespinoyu@newyorker.com','fTrrpZnnh','Colombia',NULL,'Maceo','Buhler','+57 (138) 215-1544',53467,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(32,'nlismorev','Nikola','Lismore','Male','nlismorev@wordpress.org','ocLsUB','United States','Colorado','Denver','Garrison','+1 (303) 903-1228',80279,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(33,'rwakleyw','Rosalind','Wakley','Female','rwakleyw@sitemeter.com','HCHWFhibKr','Bolivia',NULL,'Puerto Quijarro','Hoard','+591 (968) 383-8928',NULL,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(34,'lbettaneyx','Launce','Bettaney','Male','lbettaneyx@omniture.com','pMUjicHffeqY','Paraguay',NULL,'San Cosme y Damián','Susan','+595 (708) 577-6567',NULL,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(35,'mbownassy','Marlyn','Bownass','Agender','mbownassy@fc2.com','dspWQKO','United States','Virginia','Springfield','Vermont','+1 (571) 788-2132',22156,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(36,'ggarrattyz','Giovanna','Garratty','Female','ggarrattyz@mozilla.org','huiMYYAibSPr','Colombia',NULL,'Salamina','Lighthouse Bay','+57 (894) 324-3692',477047,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(37,'fbonn10','Forbes','Bonn','Male','fbonn10@artisteer.com','q13bVLS9','Chile',NULL,'Las Animas','Logan','+56 (411) 370-2812',NULL,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(38,'wquipp11','Wayne','Quipp','Male','wquipp11@pbs.org','rAJpA3t','Colombia',NULL,'Pijao','Tomscot','+57 (176) 439-3607',632067,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(39,'mdurkin12','Maribelle','Durkin','Female','mdurkin12@shareasale.com','n9cajPjcxe','Argentina',NULL,'Retiro','Crescent Oaks','+54 (920) 533-3398',4162,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(40,'nkrol13','Nessie','Krol','Female','nkrol13@wp.com','iwf0NityLu1','United States','California','Santa Rosa','Caliangt','+1 (707) 283-2966',95405,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(41,'mleversuch14','Merrilee','Leversuch','Female','mleversuch14@aol.com','LGwoLMz3BJ','United States','Rhode Island','Providence','Tennessee','+1 (401) 496-8160',2912,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(42,'lcarverhill15','Lorri','Carverhill','Female','lcarverhill15@boston.com','m6dCxTmHUYLP','United States','Texas','Houston','Merry','+1 (713) 428-4801',77260,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(43,'bwastell16','Baron','Wastell','Male','bwastell16@telegraph.co.uk','qIgt9oKpEjA','Chile',NULL,'Penco','Texas','+56 (401) 153-6292',NULL,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(44,'dkyberd17','Dewey','Kyberd','Male','dkyberd17@altervista.org','yoq6dfHVwLur','Colombia',NULL,'Calimita','Rigney','+57 (443) 317-7150',520006,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(45,NULL,'Mortimer','Bradbrook',NULL,'mbradbrook18@istockphoto.com','DZ7NHJZ','United States','Washington','Seattle','David','+1 (206) 240-2924',98148,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(46,'aarnoult19','Arnoldo','Arnoult','Male','aarnoult19@rediff.com','IXLPk91QY','Mexico','Tamaulipas','Buenavista','Wayridge','+52 (115) 399-0340',88815,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(47,'eilbert1a','Ethelda','Ilbert','Female','eilbert1a@oakley.com','z0glOzyZO','Colombia',NULL,'Íquira','Barby','+57 (215) 672-5684',412068,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(48,'cdebruijn1b','Corri','De Bruijn','Female','cdebruijn1b@ted.com','lKbEzOilrET','United States','Nevada','Carson City','American Ash','+1 (775) 966-1216',89714,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(49,'bmcjury1c','Bernhard','McJury','Male','bmcjury1c@alibaba.com','VTzrTsHpo','Colombia',NULL,'El Águila','Brickson Park','+57 (901) 595-2322',762008,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(50,'hclover1d','Hewe','Clover','Male','hclover1d@geocities.jp','y83QEPGbfH','United States','Texas','Beaumont','Shelley','+1 (936) 688-8897',77713,'default-avatar.png',2,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(51,NULL,'Facuu','Olave',NULL,'facuolave98@gmail.com','$2a$10$Akvdpni6QFYuHB9Q5u5IDeYgW4pU0UbuvZXN5Mcq.IBSZ.ppfiHm.',NULL,NULL,NULL,NULL,'+5492994219044',NULL,'default-avatar.png',1,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(52,NULL,'Franco','Sanchez',NULL,'fraannsanchez40@gmail.com','minumes44518709',NULL,NULL,NULL,NULL,'01125706839',NULL,'default-avatar.png',1,'2022-11-18 04:06:47','2022-11-18 04:06:47'),(53,NULL,'mauricio','romero',NULL,'martinexquis@gmail.com','$2a$12$wruj7yE4UW4M8X2FhOYrWeFjG7jAb6XvatEyWmzXCRI3O3pzWSafe',NULL,NULL,NULL,NULL,'1125679888',NULL,'default-avatar.png',1,'2022-11-18 04:11:22','2022-11-18 04:11:22');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18  1:18:17
