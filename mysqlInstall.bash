#!/usr/bin/expect
	echo "Please enter root user MySQL password!"
	echo "Note: password will be hidden when typing"
    
	echo "Enter database name!"
    
	echo "Creating new MySQL database..."
	/Applications/XAMPP/xamppfiles/bin/mysql -uroot -p -e "CREATE DATABASE ProjectMaster /*\!40100 DEFAULT CHARACTER SET utf8 */;"
	/Applications/XAMPP/xamppfiles/bin/mysql -uroot -p ProjectMaster < ProjectMasterSeed.sql
	echo "Database successfully created!"
    
	echo "Enter database user!"
    
	echo "Enter the PASSWORD for database user!"
	echo "Note: password will be hidden when typing"
    
	echo "Creating new user..."
	/Applications/XAMPP/xamppfiles/bin/mysql -uroot -p -e "CREATE USER root@localhost IDENTIFIED BY '';"
	echo "User successfully created!"
	
	echo "Granting ALL privileges on ProjectMaster to root!"
	/Applications/XAMPP/xamppfiles/bin/mysql -uroot -p -e "GRANT ALL PRIVILEGES ON ProjectMaster.* TO 'root'@'localhost';"
	/Applications/XAMPP/xamppfiles/bin/mysql -uroot -p -e "FLUSH PRIVILEGES;"
	echo "You're good now :)"
    npm install
    npm run dev
	exit