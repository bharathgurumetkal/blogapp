import './App.css';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './RootLayout';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import AuthorProfile from './components/AuthorProfile/AuthorProfile';
import Article from './components/Article/Article';
import UserProfile from './components/UserProfile/UserProfile';
//import AddArticle from './components/AddArticle/AddArticle'
import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
import Articles from './components/Articles/Articles';
import Errorpage from './components/Errorpage';
import AdminProfile from './components/AdminProfile/AdminProfile'
import ArticlesForAdmin from './components/ArticlesForAdmin/ArticlesForAdmin';

const AddArticle=lazy(()=>import('./components/AddArticle/AddArticle'))
function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      errorElement:<Errorpage/>,
      children:[
        {
          path:'home',
          element:<Home/>
        },
        {
          path:'signin',
          element:<SignIn/>
        },
        {
          path:'signup',
          element:<SignUp/>
        },
        {
          path:'',
          element:<Navigate to='home'/>
        },
        {
          path:'/author-profile',
          element:<AuthorProfile/>,
          children:[
            {
              path:'new-article',
              element:<Suspense fallback="loading"><AddArticle/></Suspense>
            },
            {
              path:'articles-by-author/:author',
              element:<ArticlesByAuthor/>
            },
            {
              path:'article/:articleId',
              element:<Article/>
            },
            {
              path:'',
              element:<Navigate to='articles-by-author/:author'/>
            }
            
          ]
        },
        {
          path:'/user-profile',
          element:<UserProfile/>,
          children:[
            {
              path:'articles',
              element:<Articles/>
            },
            {
              path:'article/:articleId',
              element:<Article/>
            },
            {
              path:'',
              element:<Navigate to='articles'/>
            }
          ]
        },{
          path:'/admin-profile',
          element:<AdminProfile/>,
          children:[
            {
              path:'articles-for-admin',
              element:<ArticlesForAdmin/>
            },
            {
              path:'article/:articleId',
              element:<Article/>
            },
            {
              path:'',
              element:<Navigate to='articles-for-admin'/>
            }
          ]
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
