import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: `Hello World from process ${process.pid}` });
});

app.get('/api/:n', (req, res) => {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 0; i < n; i++) {
        count += i;
    }

    res.send(`Final count is ${count} from process ${process.pid}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// code for dockerFile
// # Use Node.js LTS as the base image
// FROM node:18

// # Set the working directory
// WORKDIR /app

// # Copy package files
// COPY package.json package-lock.json ./

// # Install dependencies
// RUN npm install

// # Copy the app files
// COPY . .

// # Expose the app's port
// EXPOSE 3000

// # Start the application
// CMD ["node", "server.js"]

// version: '3.9'

// services:
//   app:
//     build:
//       context: .
//     ports:
//       - "3000" # Optional for debugging individual containers
//     environment:
//       - PORT=3000
//     deploy:
//       replicas: 3 # Number of app instances
//     networks:
//       - app-network

//   load-balancer:
//     image: nginx:alpine
//     volumes:
//       - ./nginx.conf:/etc/nginx/nginx.conf
//     ports:
//       - "8080:80"
//     networks:
//       - app-network

// networks:
//   app-network:

// events {}

// http {
//     upstream app_cluster {
//         server app:3000;
//     }

//     server {
//         listen 80;

//         location / {
//             proxy_pass http://app_cluster;
//             proxy_http_version 1.1;
//             proxy_set_header Upgrade $http_upgrade;
//             proxy_set_header Connection 'upgrade';
//             proxy_set_header Host $host;
//             proxy_cache_bypass $http_upgrade;
//         }
//     }
// }


// use
// docker-compose build
// docker-compose up

// docker-compose up --scale app=5
