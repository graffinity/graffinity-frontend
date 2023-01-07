aws ecr get-login-password | docker login --username AWS --password-stdin 445007777844.dkr.ecr.eu-central-1.amazonaws.com
docker build . -t 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-frontend
docker push 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-frontend