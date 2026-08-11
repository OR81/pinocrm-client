rm -rf node_modules
rm -rf build

npm install --force
npm run build

pm2 reload 0

echo "----- build -----"
ls -la build | head
echo "DONE"
