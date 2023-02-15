import './App.css';
import FeedLayout from './components/FeedLayout';
import Posts from './components/Posts';
import TopSubredditsContainer from './components/TopSubredditsContainer';

function App() {
  return (
    <FeedLayout>
      <Posts />
      <TopSubredditsContainer />
    </FeedLayout>
  );
}

export default App;
