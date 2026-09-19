import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import VocabList from './components/VocabList';
import VocabQuiz from './components/VocabQuiz';
import KanaSheet from './components/KanaSheet';
import KanaQuizSelect from './components/KanaQuizSelect';
import KanaQuiz from './components/KanaQuiz';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
 {
    path: '/',
    element: <Layout/>,
    errorElement: <NotFound/>,
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
            path: "kana/:kanaType",
            element: <KanaSheet />
        },
        {
            path: "kanaQuiz/:kanaType",
            element: <KanaQuizSelect />
        },
        {
            path: "kanaQuiz/:kanaType/:quizType",
            element: <KanaQuiz />
        },
        {
            path: "*",
            element: <NotFound />
        } 
    ]
 }
]);

export default router;