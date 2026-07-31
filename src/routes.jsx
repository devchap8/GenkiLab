import { createBrowserRouter } from 'react-router';
import VocabList from './components/VocabList';
import Test from './Test';

const router = createBrowserRouter([
    {
        path: "/vocab/:chapter",
        element: <VocabList />
    },
    {
        path: "/test",
        element: <Test />
    }
]);

export default router;