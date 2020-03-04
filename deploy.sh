killall node;
git pull || git reset --hard && git pull;
npm install && npm run-script build && cp -R /var/projects/zaza-client-semantic/build /var/projects/zaza-server/client/ && cd /var/projects/zaza-server/ && ./deploy.sh