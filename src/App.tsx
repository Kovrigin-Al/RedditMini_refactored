import './App.css';
import FeedLayout from './components/FeedLayout';
import Posts from './components/Posts';
import TopSubreddits from './components/TopSubreddits';

function App() {
  return (
    <FeedLayout>
      <Posts />
      <TopSubreddits />
    </FeedLayout>
  );
}

export default App;
