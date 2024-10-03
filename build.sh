BUILD_TARGET_DIR="./get-ur-tickets"

if [ "$(pwd)" != "$BUILD_TARGET_DIR" ]; then
	echo "Not in correct build directory. Navigating to $BUILD_TARGET_DIR..."
	cd "$BUILD_TARGET_DIR" || { echo "Failed to traverse directory to $BUILD_TARGET_DIR. Please ensure that you are in the root dir of your git clone."; exit 1; }
else
	echo "Already in build directory. Installing package dependencies now!"
fi

echo "Aquiring package dependencies, please wait..."

npm install bootstrap react-bootstrap aws-amplify @aws-amplify/ui-react

sleep 1;

echo "Successfully installed package dependencies!"

sleep 1;

echo "Would you like to start the webserver now? (Y/N)"
read choice

if [[ "$choice" == "Y" || "$choice" == "y" ]]; then
	echo "Starting server!"
	npm start

elif [[ "$choice" == "N" || "$choice" == "n" ]]; then
	echo ""


else
	echo "Invalid option chosen, exiting script."
fi

