import { createBrowserRouter } from 'react-router';
import VocabList from './components/VocabList';
import Homepage from './components/Homepage';
import Test from './components/Test';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/vocab/:chapter",
        element: <VocabList />
    },
]);

export default router;