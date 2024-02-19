-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 18 fév. 2024 à 21:03
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `aroundtech-v2`
--

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `city`
--

INSERT INTO `city` (`id`, `name`) VALUES
(1, 'Montpellier'),
(2, 'Lyon'),
(3, 'Bordeaux'),
(4, 'Paris'),
(5, 'Marseille'),
(6, 'Toulouse'),
(7, 'Nantes'),
(8, 'Saint-Paul'),
(9, 'Nouméa'),
(10, 'Tourcoing'),
(11, 'Marcy-sous-Marle'),
(12, 'Cormeilles-en-Parisis'),
(13, 'Marseilles-lès-Aubigny'),
(14, 'Vaulx-en-Velin'),
(15, 'Strasbourg'),
(16, 'Waltenheim-sur-Zorn'),
(17, 'Annecy'),
(18, 'Elne'),
(19, 'Zoza'),
(20, 'Èze'),
(21, 'Faaa'),
(22, 'Zuani'),
(23, 'Amiens'),
(24, 'Albi'),
(25, 'Saint-Denis'),
(26, 'Zonza'),
(27, 'Agde'),
(28, 'Jury'),
(29, 'Le Havre'),
(30, 'Roubaix'),
(31, 'Zilia');

-- --------------------------------------------------------

--
-- Structure de la table `expense_report`
--

DROP TABLE IF EXISTS `expense_report`;
CREATE TABLE IF NOT EXISTS `expense_report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `created_at` date NOT NULL,
  `valid_at` date DEFAULT NULL,
  `mission_id` int NOT NULL,
  `nature_expense_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `expense_report_ibfk_3` (`mission_id`),
  KEY `expense_report_ibfk_4` (`nature_expense_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `expense_report`
--

INSERT INTO `expense_report` (`id`, `amount`, `created_at`, `valid_at`, `mission_id`, `nature_expense_id`) VALUES
(2, 58.65, '2023-10-18', '2023-11-15', 2, 2),
(13, 101, '2023-02-23', '2023-11-15', 3, 1),
(16, 12222, '2023-04-06', '2024-01-20', 11, 2),
(17, 4.23, '2023-04-04', '2023-11-15', 2, 2),
(19, 8, '2023-04-04', '2023-11-15', 2, 1),
(20, 9, '2023-04-06', '2023-11-15', 2, 2),
(21, 9.99, '2023-04-07', '2023-11-15', 2, 3),
(23, 81, '2023-04-07', '2023-11-15', 2, 1),
(24, 1.9, '2023-02-21', '2023-11-15', 3, 1),
(25, 12121, '2024-01-16', NULL, 12, 1),
(26, 43, '2023-12-06', '2024-01-20', 11, 2),
(27, 444, '2024-02-15', '2024-01-20', 11, 2),
(31, 4343, '2024-01-02', NULL, 12, 2),
(32, 12, '2023-12-06', '2024-01-20', 11, 3);

-- --------------------------------------------------------

--
-- Structure de la table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nature_mission_id` int DEFAULT NULL,
  `departure_city_id` int DEFAULT NULL,
  `arrival_city_id` int DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `transport_id` int DEFAULT NULL,
  `init_nat_mis_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `transport_id` (`transport_id`),
  KEY `status_id` (`status_id`),
  KEY `arrival_city_id` (`arrival_city_id`),
  KEY `departure_city_id` (`departure_city_id`),
  KEY `mission_ibfk_6` (`nature_mission_id`),
  KEY `mission_ibfk_7` (`init_nat_mis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `mission`
--

INSERT INTO `mission` (`id`, `nature_mission_id`, `departure_city_id`, `arrival_city_id`, `start_date`, `end_date`, `status_id`, `user_id`, `transport_id`, `init_nat_mis_id`) VALUES
(2, 1, 2, 4, '2023-04-04', '2023-04-07', 3, 1, 2, 1),
(3, 3, 1, 5, '2023-02-17', '2024-02-23', 2, 2, 3, 3),
(4, 1, 2, 3, '2024-03-20', '2024-05-31', 6, 2, 2, 1),
(9, 12, 11, 12, '2024-06-04', '2024-06-06', 3, 1, 2, 12),
(10, 1, 10, 9, '2024-06-11', '2024-06-12', 3, 1, 3, 1),
(11, 3, 1, 4, '2023-12-06', '2024-02-29', 3, 1, 2, 3),
(12, 4, 6, 7, '2024-04-09', '2024-04-10', 3, 1, 1, 4),
(13, 2, 13, 14, '2023-11-07', '2023-11-14', 3, 2, 1, 2),
(14, 3, 15, 16, '2022-11-16', '2022-11-24', 6, 2, 4, 3),
(17, 2, 20, 21, '2023-11-17', '2023-11-30', 2, 3, 4, 2),
(23, 4, 31, 30, '2024-03-28', '2024-03-29', 5, 1, 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `nature_expense`
--

DROP TABLE IF EXISTS `nature_expense`;
CREATE TABLE IF NOT EXISTS `nature_expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_capped` tinyint(1) NOT NULL DEFAULT '0',
  `cap_value` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `nature_expense`
--

INSERT INTO `nature_expense` (`id`, `name`, `is_capped`, `cap_value`) VALUES
(1, 'Restaurant', 1, 20),
(2, 'Essence', 0, 0),
(3, 'Péage', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `nature_mission`
--

DROP TABLE IF EXISTS `nature_mission`;
CREATE TABLE IF NOT EXISTS `nature_mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_charge` tinyint(1) DEFAULT NULL,
  `is_bonus` tinyint(1) DEFAULT NULL,
  `tjm` float DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `nature_mission`
--

INSERT INTO `nature_mission` (`id`, `name`, `is_charge`, `is_bonus`, `tjm`, `percentage`, `start_date`, `end_date`) VALUES
(1, 'formation', 1, 1, 500, 1, '2023-01-01', '2023-12-31'),
(2, 'conseil', 1, 1, 300, 3, '2023-01-01', '2023-12-31'),
(3, 'expertise technique', 1, 1, 400, 4, '2023-01-01', '2023-12-31'),
(4, 'renseignement', 1, 1, 400, 4, '2023-11-15', NULL),
(12, 'treete', 1, 1, 12, 2, '2024-01-20', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'user'),
(2, 'manager'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(2, 'en attente'),
(3, 'validée'),
(5, 'initiale'),
(6, 'rejetée');

-- --------------------------------------------------------

--
-- Structure de la table `transport`
--

DROP TABLE IF EXISTS `transport`;
CREATE TABLE IF NOT EXISTS `transport` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `transport`
--

INSERT INTO `transport` (`id`, `name`) VALUES
(1, 'voiture de service'),
(2, 'avion'),
(3, 'train'),
(4, 'covoiturage');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `manager_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_key` (`email`),
  KEY `role_id` (`role_id`),
  KEY `user_ibfk_2` (`manager_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `role_id`, `manager_id`) VALUES
(1, 'John', 'Doe', 'johnd@aroundtech.com', '$2a$15$dLNgQL9rhWxtfbFEYbcj2.8SDd4Flzbpghu00kmNPsj0HDuIU7yOC', 3, 1),
(2, 'Gigi', 'Holdman', 'gigih@yopmail.com', '$2a$15$/OZ7WG4SFroXaWwdZRhfP.YSeDWqPa114ZbD7IlZmewct6sZugjR6', 2, 1),
(3, 'Manon', 'Paul', 'manonp@yopmail.com', '$2a$15$wZ3FkZ5us3FeuhWoZzeviujI3.G82FwxRxQjIa8cdplJxKQeljG5y', 3, 2),
(4, 'James', 'Holmes', 'jamesh@yopmail.com', '$2a$10$pkLRV0YtMGcNv4kmz4WKde8U0sTC/w.GUN1QPW4PwsYVEAJ8A8bu2', 2, 2),
(5, 'Anna', 'Jolie', 'annaj@yopmail.com', '$2a$10$VuJ6Mfku4G.DAWelue.yhekARKeA/Uv.HgXENdvZzw3eUBpyaRCpi', 2, 4),
(6, 'Pierre', 'Pipou', 'pierrep@yopmail.com', '$2a$10$gdyhUc.oIN7Hzuv7nxZKqu7Rf2cbdvspfTGliJ1OJM/hQZD9Bvzsy', 1, 2),
(7, 'Bella', 'Ava', 'bellea@yopmail.com', '$2a$10$j0y3wKSiFdaV0Sp8EqfvmeO/cWcWhNEottj7bGTbqQ0lENMipPJRG', 1, 5),
(8, 'Krist', 'Mass', 'kristm@yopmail.com', '$2a$10$pkLRV0YtMGcNv4kmz4WKde8U0sTC/w.GUN1QPW4PwsYVEAJ8A8bu2', 2, 2),
(25, 'lol', 'lalilo', 'lol@ex.lol', '$2a$10$LfwxE152NsGa1RTk5tkP9eNz6J8tZPPNLs1kKabf04QY9uPDF568m', 1, 4),
(27, 'test2', 'test', 'test@lkijuhy.lo', '$2a$10$MV0onYa0IoKkYQQ8TdPjKuP9zYKutOiTOt3UUaqkVxWM2x/MCaura', 1, 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `expense_report`
--
ALTER TABLE `expense_report`
  ADD CONSTRAINT `expense_report_ibfk_3` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `expense_report_ibfk_4` FOREIGN KEY (`nature_expense_id`) REFERENCES `nature_expense` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `mission`
--
ALTER TABLE `mission`
  ADD CONSTRAINT `mission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `mission_ibfk_2` FOREIGN KEY (`transport_id`) REFERENCES `transport` (`id`),
  ADD CONSTRAINT `mission_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `mission_ibfk_4` FOREIGN KEY (`arrival_city_id`) REFERENCES `city` (`id`),
  ADD CONSTRAINT `mission_ibfk_5` FOREIGN KEY (`departure_city_id`) REFERENCES `city` (`id`),
  ADD CONSTRAINT `mission_ibfk_6` FOREIGN KEY (`nature_mission_id`) REFERENCES `nature_mission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mission_ibfk_7` FOREIGN KEY (`init_nat_mis_id`) REFERENCES `nature_mission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
