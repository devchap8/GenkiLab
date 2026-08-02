import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import VocabList from './components/VocabList';
import Homepage from './components/Homepage';

const router = createBrowserRouter([
 {
    path: '/',
    element: <Layout/>,
    children: [
        {index: true, element: <Homepage/>},
        {path: "vocab/:chapter", element: <VocabList/>}
    ]
 }
]);

export default router;