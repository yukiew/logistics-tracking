
sudo apt update

sudo apt install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install node

node --version
npm --version

sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker

cd ./logistics-tracking/docker

sudo docker-compose up -d

cd ..

sudo apt install nginx -y

sudo ln -s /home/ubuntu/logistics-tracking/nginxConfig /etc/nginx/sites-enabled
sudo nginx -t
sudo service nginx restart

sudo npm install 
