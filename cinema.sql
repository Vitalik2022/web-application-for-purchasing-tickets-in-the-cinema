-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 23 2024 г., 20:34
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cinema`
--

-- --------------------------------------------------------

--
-- Структура таблицы `films`
--

CREATE TABLE `films` (
  `id` int(11) NOT NULL,
  `poster` varchar(100) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `producer` varchar(40) NOT NULL,
  `actors` varchar(255) NOT NULL,
  `company` varchar(50) NOT NULL,
  `country` varchar(30) NOT NULL,
  `year` smallint(6) NOT NULL,
  `time` smallint(4) NOT NULL,
  `lang` varchar(15) NOT NULL,
  `format` varchar(10) NOT NULL,
  `short` varchar(512) NOT NULL,
  `film` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `films`
--

INSERT INTO `films` (`id`, `poster`, `genre`, `producer`, `actors`, `company`, `country`, `year`, `time`, `lang`, `format`, `short`, `film`) VALUES
(1, '1.jpg', 'Фантастика / Екшн', 'Бенжамін Реннер', 'Дакота Джонсон, Сідні Свіні, Ізабела Мерсед, Селеста О’Коннор, Адам Скотт, Тахар Рахім, Емма Робертс, Заша Мемет, Майк Еппс', 'Universal Pictures, Illumination Entertainment', 'США', 2024, 90, 'Українська', '2D', 'Зустрічайте одну з найзагадковіших героїнь кіновсесвіту Marvel «Мадам Павутину»! Дакота Джонсон у ролі Кассандри Вебб – парамедикині з Мангеттену – виявляє в собі здібності до ясновидіння. Зіткнувшись з одкровеннями щодо минулого, вона знайомиться з трьома молодими жінками, яким судилося потужне майбутнє. Та чи вдасться їм пережити фатальне сьогодення?', 'Мадам Павутина'),
(2, '2.jpg', 'Драма / Фантастика / Пригоди', 'Дені Вільньов', 'Тімоті Шаламе, Ребекка Ферґюсон, Оскар Айзек, Джош Бролін, Джейсон Момоа, Зендая Коулман, Стеллан Скашґорд, Хав\\\'єр Бардем, Дейв Батіста, Шарлотта Ремплінґ', 'Warner Bros. Pictures, Legendary Pictures', 'США, Канада, Угорщина', 2021, 155, 'Українська', '3D', 'Міфічна і емоційно заряджена подорож головного героя, Пола Атріда. На цього блискучого і обдарованого хлопця чекають великі справи, які йому важко осягнути. Він вирушить на найнебезпечнішу планету у Всесвіті, щоб врятувати майбутнє своєї родини і свого народу. Адже ворожі сили вступають у конфлікт через найцінніший і найрідкісніший ресурс – речовину, здатну розкрити найбільший потенціал людства. Виживуть лише ті, кому вдасться перемогти власні страхи.', 'Дюна'),
(3, '3.jpg', 'Пригоди / Екшн', 'Метью Вон', 'Генрі Кавілл, Брайс Даллас Говард, Сем Роквелл, Браян Кренстон, Семюел Л. Джексон, Джон Сіна, Дуа Ліпа, Кетрін О’Гара, Роб Делані, Софія Бутелла', 'Universal Pictures, Marv Studios', 'США, Великобританія', 2024, 90, 'Українська', '2D', 'Популярна авторка шпигунських бестселерів Еллі Конвей обожнює проводити час вдома за комп’ютером і в компанії улюбленого кота Алфі. Проте коли сюжети вигаданих книг Еллі, в центрі яких — секретний агент Арґайл та його місія з розкриття глобального шпигунського синдикату, починають відображати таємні дії реальної шпигунської організації, тихі домашні вечори залишаються в минулому.', 'Арґайл'),
(4, '4.jpg', 'Бойовик', 'Девід Еєр', 'Джейсон Стейтем, Джеремі Айронс, Еммі Рейвер-Лемпман та Джош Гатчерсон', 'Amazon MGM, Metro-Goldwyn-Mayer Pictures', 'США', 2024, 90, 'Українська', '3D', 'Спокійне життя головного героя бойовика – ексоперативника суперсекретної організації \"Бджолярі\" Адама Клея – закінчується після того, як гине його давня знайома. Чоловік вирішує помститися за її смерть. Адам знову застосовує свої \"унікальні навички\", щоб розкрити корупцію всередині великої компанії.', 'Бджоляр'),
(5, '5.jpg', 'Комедія', 'Вілл Ґлак', 'Сідні Свіні, Ґлен Павелл, Александра Шіпп, Даррен Барнет, Браян Браун, Рейчел Ґріффітс, Дермот Малруні, Гедлі Робінсон', 'Sony Pictures Entertainment', 'США', 2024, 103, 'Українська', '2D', 'На ранок після ідеального першого побачення фатальна пристрасть закоханих перетворюється на холодну ненависть, доки доля не зводить їх разом на весіллі друзів в Австралії. Тож їм не залишається нічого іншого, окрім як вчинити по-дорослому і знову прикинутися парою.', 'Люблю тебе ненавидіти'),
(6, '5.jpg', 'Комедія', 'Вілл Ґлак', 'Сідні Свіні, Ґлен Павелл, Александра Шіпп, Даррен Барнет, Браян Браун, Рейчел Ґріффітс, Дермот Малруні, Гедлі Робінсон', 'Sony Pictures Entertainment', 'США', 2024, 103, 'Українська', '2D', 'На ранок після ідеального першого побачення фатальна пристрасть закоханих перетворюється на холодну ненависть, доки доля не зводить їх разом на весіллі друзів в Австралії. Тож їм не залишається нічого іншого, окрім як вчинити по-дорослому і знову прикинутися парою.', 'Люблю тебе ненавидіти_2'),
(7, '', '11', '11', '11', '11', '11', 2024, 98, 'Українська', '3D', '1111', 'новий фільм');

-- --------------------------------------------------------

--
-- Структура таблицы `halls`
--

CREATE TABLE `halls` (
  `id` int(11) NOT NULL,
  `hallname` varchar(20) NOT NULL,
  `color` varchar(15) NOT NULL,
  `countplaces` smallint(6) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `halls`
--

INSERT INTO `halls` (`id`, `hallname`, `color`, `countplaces`) VALUES
(1, 'Червона зала', 'red', 450),
(2, 'Синя зала', 'blue', 455),
(3, 'Зелена зала', 'green', 184);

-- --------------------------------------------------------

--
-- Структура таблицы `hall_parts`
--

CREATE TABLE `hall_parts` (
  `id` int(11) NOT NULL,
  `id_hall` int(11) NOT NULL,
  `partname` varchar(20) NOT NULL,
  `count_rows` tinyint(4) NOT NULL DEFAULT 1,
  `count_places` tinyint(4) NOT NULL DEFAULT 1,
  `price` decimal(9,0) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `hall_parts`
--

INSERT INTO `hall_parts` (`id`, `id_hall`, `partname`, `count_rows`, `count_places`, `price`) VALUES
(1, 1, '1', 2, 15, 150),
(2, 1, '2', 5, 20, 120),
(3, 1, '3', 8, 25, 100),
(4, 1, '4', 4, 30, 80),
(5, 2, '1', 3, 10, 140),
(6, 2, '2', 10, 20, 110),
(7, 2, '3', 5, 25, 90),
(8, 3, '1', 8, 18, 100),
(9, 3, '2', 2, 20, 80);

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `id_film` int(11) NOT NULL,
  `id_hall` int(11) NOT NULL,
  `dt` date NOT NULL,
  `tbegin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`id`, `id_film`, `id_hall`, `dt`, `tbegin`) VALUES
(1, 1, 1, '2024-05-22', '12:00:00'),
(2, 1, 3, '2024-05-22', '14:00:00'),
(3, 1, 1, '2024-05-22', '14:00:00'),
(4, 2, 3, '2024-05-22', '12:00:00'),
(5, 2, 2, '2024-05-22', '12:00:00'),
(6, 2, 2, '2024-05-23', '12:00:00'),
(7, 3, 3, '2024-05-24', '12:00:00'),
(8, 3, 1, '2024-05-23', '14:00:00'),
(9, 3, 1, '2024-05-24', '16:00:00'),
(10, 4, 2, '2024-05-24', '12:00:00'),
(11, 3, 1, '2024-05-26', '14:00:00'),
(12, 4, 3, '2024-05-26', '12:00:00'),
(13, 6, 2, '2024-05-25', '18:00:00'),
(14, 5, 1, '2024-05-25', '12:00:00'),
(15, 5, 2, '2024-05-25', '14:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `id_session` int(11) NOT NULL,
  `numrow` tinyint(4) NOT NULL,
  `numplace` tinyint(4) NOT NULL,
  `price` decimal(9,0) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(30) NOT NULL,
  `pass` char(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `hall_parts`
--
ALTER TABLE `hall_parts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hall` (`id_hall`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_film` (`id_film`),
  ADD KEY `id_hall` (`id_hall`);

--
-- Индексы таблицы `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_session` (`id_session`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `films`
--
ALTER TABLE `films`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `halls`
--
ALTER TABLE `halls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `hall_parts`
--
ALTER TABLE `hall_parts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `hall_parts`
--
ALTER TABLE `hall_parts`
  ADD CONSTRAINT `hall_parts_ibfk_1` FOREIGN KEY (`id_hall`) REFERENCES `halls` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`id_film`) REFERENCES `films` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`id_hall`) REFERENCES `halls` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`id_session`) REFERENCES `sessions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
