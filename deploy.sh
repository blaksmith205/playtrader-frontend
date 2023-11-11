echo "Building the server files..."
npm run build
echo "Replacing files..."
sudo rm -r /var/www/playtrader.org/html
sudo mkdir -p /var/www/playtrader.org/html && sudo cp -r ./build/* /var/www/playtrader.org/html/
echo "Server deployed!"
