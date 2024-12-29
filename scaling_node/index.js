import express from 'express';
import cluster from 'cluster';
import os from 'os';

const totalCPUs = os.cpus().length;
const PORT = 3000;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log("Let's fork another worker");
        cluster.fork();
    });
} else {
    const app = express();
    console.log(`Worker ${process.pid} started`);

    app.get("/", (req, res) => {
        res.json({ message: "Hello World!" });
    });

    app.get("/api/:n", function (req, res) {
        let n = parseInt(req.params.n);
        let count = 0;

        if (n > 5000000000) n = 5000000000;

        for (let i = 0; i < n; i++) {
            count += i;
        }

        res.send(`Final count is ${count} from process ${process.pid}`);
    });

    app.listen(PORT, () => console.log(`Server is running on  port ${PORT}`));
}
