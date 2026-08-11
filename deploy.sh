rm -rf node_modules
rm -rf build

npm ci
npm run build

pm2 reload aylin-client --update-env

echo "----- build -----"
ls -la build | head
echo "DONE"
