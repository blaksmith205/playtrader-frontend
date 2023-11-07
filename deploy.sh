echo "Building the server files..."
npm run build
echo "Replacing files..."
rm -r /var/www/playtrader.org/html
mkdir -p /var/www/playtrader.org/html && cp -r ./build/* /var/www/playtrader.org/html/
echo "Server deployed!"

