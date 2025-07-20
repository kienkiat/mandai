
import app from './app';
import { getOrm } from './orm';

const startServer = async () => {
  try {
    await getOrm(); // init db
    app.listen(3000, () => {
      console.log('Backend running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error initializing MikroORM:', error);
  }
};

startServer();
