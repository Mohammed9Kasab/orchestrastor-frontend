cd /root/travel-to-desk-frontend
git fetch
git checkout $1
git pull origin $1

npm install

ng build

cp -r /root/travel-to-desk-frontend/dist/frontend/  /var/www/ttd.devista.ro/html/
echo "Copied Successfully"

sudo systemctl restart nginx
echo "Nginx Restarted successfully"
