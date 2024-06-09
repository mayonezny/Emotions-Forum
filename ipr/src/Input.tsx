import { useState, useEffect } from 'react';
import './App.css';
import './Input.css';

interface InputProps {
  onPostSubmit: () => void;
  animateOut: boolean;
}

const Input: React.FC<InputProps> = ({ onPostSubmit, animateOut }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (animateOut) {
      setFadeOut(true);
    }
  }, [animateOut]);

  const handleSubmit = async () => {
    if((username.length < 2)||(message.length < 2)){ return; }
    const data = {
      username: username,
      text: message,
    };

    const response = await fetch('http://my-teamup.ru:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    console.log(jsonData);
    onPostSubmit(); // Вызываем callback для обновления состояния в App и скрытия Input
  };

  return (
    <div id='submit-outerbox' className={fadeOut ? 'fade-out' : ''}>
      <div className='usernamediv'>
        <span className='box-span'>Ваше имя:</span>
        <input className='box-input' id='username-input' minLength={2} maxLength={26} value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div className='messageboxdiv'>
        <span className='box-span'>Ваше сообщение:</span>
        <textarea className='box-input' id='msg-input' minLength={1} maxLength={10000} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      </div>
      <button type="button" className="submit-button" onClick={handleSubmit}>Опубликовать</button>
    </div>
  );
}

export default Input;
