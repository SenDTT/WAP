
DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `Policies`;
CREATE TABLE `Policies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` bigint NOT NULL,
  `owner_id` bigint NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `Upvotes`;
CREATE TABLE `Upvotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('policy','reply') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `associate_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Categories` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'General', 'General category for all policies', '2024-11-20 05:37:16', '2024-11-20 05:37:16'),
(2, 'Technology', 'Policies related to technology', '2024-11-20 05:37:16', '2024-11-20 05:37:16'),
(3, 'Health', 'Policies regarding health and wellness', '2024-11-20 05:37:16', '2024-11-20 05:37:16'),
(4, 'Education', 'Educational policies and topics', '2024-11-20 05:37:16', '2024-11-20 05:37:16');

INSERT INTO `Policies` (`id`, `title`, `body`, `category_id`, `owner_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Policy 1', 'This is the body of policy 1.', 1, 1, '2024-11-20 05:38:26', '2024-11-20 05:38:26'),
(2, 'Policy 2', 'This is the body of policy 2.', 2, 2, '2024-11-20 05:38:26', '2024-11-20 05:38:26'),
(3, 'Policy 3', 'This is the body of policy 3.', 3, 3, '2024-11-20 05:38:26', '2024-11-20 05:38:26'),
(4, 'Policy 4', 'This is the body of policy 4.', 1, 2, '2024-11-20 05:38:26', '2024-11-20 05:38:26'),
(5, 'Policy 5', 'This is the body of policy 5.', 4, 1, '2024-11-20 05:38:26', '2024-11-20 05:38:26');

INSERT INTO `Upvotes` (`id`, `type`, `associate_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 'policy', 1, 2, '2024-11-20 05:38:43', '2024-11-20 05:38:43'),
(2, 'policy', 2, 3, '2024-11-20 05:38:43', '2024-11-20 05:38:43'),
(3, 'policy', 3, 1, '2024-11-20 05:38:43', '2024-11-20 05:38:43'),
(4, 'policy', 1, 3, '2024-11-20 05:38:43', '2024-11-20 05:38:43'),
(5, 'policy', 4, 2, '2024-11-20 05:38:43', '2024-11-20 05:38:43');

INSERT INTO `Users` (`id`, `username`, `email`, `fullname`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'senn.123', 'senn.123@example.com', 'sen doan 5', '$2a$10$.heOuZRO.8OBnE.oIafgY.BWRs/fLbeJuqYzcOYMTiVUFMrU2pW3u', '2024-11-20 05:30:39', '2024-11-20 05:30:39'),
(2, 'admin', 'admin@example.com', 'admin', '$2a$10$N7wTwq6jO4iISX33nHmqM.HWIvgOcksee3vXWXNP9rI3n7VlGNyaC', '2024-11-20 05:31:34', '2024-11-20 05:31:34');

