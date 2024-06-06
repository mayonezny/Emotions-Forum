import './App.css';
import Input from './Input';
import FilterMenu from './FilterMenu';
import PostsBlock from './PostsBlock';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [showMessageInputWindow, setShowMessageInputWindow] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [delayedData, setDelayedData] = useState([]);
  const [filter, setFilter] = useState(''); // Новый стейт для фильтра

  const fetchData = useCallback(async (filter: string) => {
    const response = await fetch(`http://my-teamup.ru:8080/${filter}`);
    const jsonData = await response.json();
    setData(jsonData);
  }, []);

  useEffect(() => {
    fetchData(filter); // Используем состояние фильтра
  }, [fetchData, filter]);

  useEffect(() => {
    if (data.length > 0) {
      setDelayedData([]);
      data.forEach((post, index) => {
        setTimeout(() => {
          setDelayedData(prevData => [...prevData, post]);
        }, index * 750); // Задержка перед появлением каждого поста
      });
    } else {
      setDelayedData([]); // Очистка delayedData если нет данных
    }
  }, [data]);

  const toggleMessageInputWindow = () => {
    if (showMessageInputWindow) {
      setAnimateOut(true);
      setTimeout(() => {
        setShowMessageInputWindow(false);
        setAnimateOut(false);
      }, 500); // Задержка должна совпадать с длительностью анимации
    } else {
      setShowMessageInputWindow(true);
    }
  }

  const handlePostSubmit = () => {
    fetchData(filter); // Используем состояние фильтра
    toggleMessageInputWindow(); // Скрыть Input после отправки сообщения
  }

  const handleFilterApply = (filterNumber: string) => {
    setFilter(filterNumber.toString());
  }
  const handleFeedUpdate = () => {
    fetchData(filter);
  }

  console.log(data);

  return (
    <div className="App">
      <div className="content">
        <div className='header'>
          <span className='headlinetext-span'>
            <h1 className='headlinetext jaini bold'>Emotions Forum &#129311;&#128526;</h1>
          </span>
        </div> 
        <button className={showMessageInputWindow === false ? 'create-post-button' : 'create-post-button CPBactive'} onClick={toggleMessageInputWindow}>Написать пост</button>
        {showMessageInputWindow && <Input onPostSubmit={handlePostSubmit} animateOut={animateOut} />}
        <div className='filter-and-update-div'>
        <FilterMenu onFilterApply={handleFilterApply}/>
        <button id='update-button' onClick={handleFeedUpdate}></button>
        </div>          
        {delayedData.length > 0 ? (
          delayedData.map((post: any) => (
            <PostsBlock
              key={post.id}
              author={post.username}
              emotion={post.label}
              date={post.date}
              message={post.text}
            />
          ))
        ) : (
          <div className='no-msg-div'><span>Посты не найдены &#128546;</span></div> //{filter === '' ? 'Посты не найдены' : filter === '0' ? 'Нейтральные посты не найдены' : filter === '1' ? 'Позитивные посты не найдены' : 'Негативные посты не найдены'}
        )}
      </div>
      <div className='footer'>&#169; Kinok0 & Mayonezny, 2024. Все права защищены.</div>
    </div>
  );
}

export default App;
