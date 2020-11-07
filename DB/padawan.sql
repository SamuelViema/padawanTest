-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2020 a las 00:42:21
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.26

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `padawan`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `id` int(255) NOT NULL,
  `title` varchar(500) NOT NULL,
  `author` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `release_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'Este valor no se para que lo ponian en el diagrama ER',
  `users_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `isbn`, `release_date`, `user_id`, `users_id`) VALUES
(1, 'Maze Runner - Virus Letal', 'James Dashner', 'A-0010-Z', '2009-10-06 00:00:00', 1, 5),
(2, 'Sangre Azteca', 'Simon Levack', 'A-0022-Z', '2004-01-01 00:00:00', 1, 6),
(3, 'La conjura del faraón', 'Antonio Cabanas', 'A-0034-Z', '2006-01-01 00:00:00', 1, 5),
(4, 'El Señor de los Anillos', 'J. R. R. Tolkien', 'A-0046-Z', '1954-06-29 00:00:00', 1, 5),
(5, 'Un Monstruo viene a verme', 'Patrick Ness', 'A-0058-Z', '2011-05-05 00:00:00', 1, 5),
(6, 'La biblioteca de Almas', 'Ransom Riggs', 'A-0070-Z', '2015-09-22 00:00:00', 1, 5),
(7, 'La torre Oscura: El pistolero', 'Stephen King', 'A-0082-Z', '1982-06-10 00:00:00', 1, 5),
(8, 'Hollow City', 'Ransom Riggs', 'A-00094-Z', '2014-06-14 00:00:00', 1, 6),
(9, 'The Girl on the Train', 'Paula Hawkins', 'A-00106-Z', '2015-01-13 00:00:00', 1, 6),
(10, 'Exhalación', 'Ted Chiang', 'A-00118-Z', '2008-11-15 00:00:00', 1, 6),
(11, 'Animales invisibles', 'Gabi Martínez', 'A-00130-Z', '2019-03-11 00:00:00', 1, 6),
(12, 'Mermaid Project', 'Leo, Corine Jamar y Fred Simon', 'A-00142-Z', '2017-01-01 00:00:00', 1, 6),
(18, 'La noche de prueba', 'Prueba Prueba', 'A-00154-Z', '2020-11-07 00:00:00', 1, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`) VALUES
(5, 'samuel.viema@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'Samuel Vieyra'),
(6, 'prueba@gmail.com', '8cb2237d0679ca88db6464eac60da96345513964', 'Prueba'),
(7, 'ana@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'Ana Morales'),
(8, 'eva@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'Eva');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `fk_user` (`users_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
