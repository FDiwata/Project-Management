-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 06, 2022 at 05:24 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ProjectMaster`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_plans`
--

CREATE TABLE `t_plans` (
  `plan_id` varchar(20) NOT NULL,
  `project_id` varchar(20) NOT NULL,
  `assignee` varchar(30) NOT NULL,
  `plan_title` varchar(200) NOT NULL,
  `plan_desc` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_projects`
--

CREATE TABLE `t_projects` (
  `project_id` varchar(20) NOT NULL,
  `project_title` varchar(200) NOT NULL,
  `project_desc` varchar(500) NOT NULL,
  `project_type` varchar(20) NOT NULL,
  `in_charge` varchar(30) NOT NULL,
  `percentage` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_subtasks`
--

CREATE TABLE `t_subtasks` (
  `subtask_id` varchar(20) NOT NULL,
  `plan_id` varchar(20) NOT NULL,
  `subtask_title` varchar(100) NOT NULL,
  `subtask_desc` varchar(100) NOT NULL,
  `priority` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `due_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_task_logs`
--

CREATE TABLE `t_task_logs` (
  `task_logs_id` varchar(20) NOT NULL,
  `subtask_id` varchar(20) NOT NULL,
  `miscellaneous` tinyint(1) NOT NULL,
  `log_date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `task_desc` varchar(100) NOT NULL,
  `work_hours` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_plans`
--
ALTER TABLE `t_plans`
  ADD PRIMARY KEY (`plan_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `t_projects`
--
ALTER TABLE `t_projects`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `t_subtasks`
--
ALTER TABLE `t_subtasks`
  ADD PRIMARY KEY (`subtask_id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- Indexes for table `t_task_logs`
--
ALTER TABLE `t_task_logs`
  ADD PRIMARY KEY (`task_logs_id`),
  ADD KEY `subtask_id` (`subtask_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `t_plans`
--
ALTER TABLE `t_plans`
  ADD CONSTRAINT `t_plans_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `t_projects` (`project_id`);

--
-- Constraints for table `t_subtasks`
--
ALTER TABLE `t_subtasks`
  ADD CONSTRAINT `t_subtasks_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `t_plans` (`plan_id`);

--
-- Constraints for table `t_task_logs`
--
ALTER TABLE `t_task_logs`
  ADD CONSTRAINT `t_task_logs_ibfk_1` FOREIGN KEY (`subtask_id`) REFERENCES `t_subtasks` (`subtask_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
