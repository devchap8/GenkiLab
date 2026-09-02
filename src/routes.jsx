import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import VocabList from './components/VocabList';
import VocabQuiz from './components/VocabQuiz';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
 {
    path: '/',
    element: <Layout/>,
    children: [
        {
            index: true, 
            element: <Homepage/>
        },
        {
            path: "vocab/:chapter", 
            element: <VocabList/>
        },
        {
            path: "vocabQuiz/:chapter/:subsect/:quizType", 
            element: <VocabQuiz />
        },
        {
            path: "*",
            element: <NotFound />
        } 
    ]
 }
]);

export default router;