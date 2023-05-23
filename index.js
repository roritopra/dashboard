import { http, express, cors, dotenv, SocketIOServer } from './dependencies.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRouters.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
//const httpServer = http.createServer(app);


const httpServer = app.listen(PORT, () => {
  console.table({
    "Dashboard app:": `http://localhost:${PORT}/dashboard-app`,
    "Mobile app:": `http://localhost:${PORT}/mobile-app`
  });
});

const io = new SocketIOServer(httpServer, { path: '/real-time' });

const STATIC_APP = express.static('./static/client-app');
const STATIC_DASHBOARD = express.static('./static/dashboard-app');

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use('/mobile-app', STATIC_APP);
app.use('/dashboard-app', STATIC_DASHBOARD);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected.`);

  // Custom event
  socket.on('customEvent', (data) => {
    console.log('Received custom event:', data);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnect.`);
  });
});



export { io };