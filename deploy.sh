rm -rf node_modules
rm -rf build

npm install --force
npm run build

cp -r dist build

pm2 reload aylin-client --update-env

echo "----- build -----"
ls -la build | head
echo "DONE"
