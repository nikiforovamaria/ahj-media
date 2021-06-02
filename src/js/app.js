import Controller from './Controller';
import Layout from './Layout';
import CoordsHandler from './CoordsHandler';

const app = new Controller(new Layout(), new CoordsHandler());
app.init();
