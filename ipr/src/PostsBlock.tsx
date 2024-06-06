import { useEffect, useState } from "react";
import "./PostsBlock.css"
interface PostBlockProps{
    author: string;
    emotion: number;
    date: string;
    message: string;
}
const PostsBlock: React.FC<PostBlockProps> = ({author, emotion, date, message}) => {
    let emoSpanText, emoSpanSmile, emoSpanClassName;
    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        setFadeIn(true);
      }, []);
    if(emotion === 0) {emoSpanText = 'Нейтральный '; emoSpanSmile = '\u{1F610}'; emoSpanClassName='emotion-span emo-neutral'}
    else if(emotion === 1){emoSpanText = 'Позитивный '; emoSpanSmile = '\u{1F604}'; emoSpanClassName='emotion-span emo-positive'}
    else if(emotion === 2){emoSpanText = 'Негативный '; emoSpanSmile = '\u{1F620}'; emoSpanClassName='emotion-span emo-negative'}
  return (
    <div className={`postsblock-outerbox ${fadeIn ? 'fade-in' : ''}`}>
      <div className="username-and-date-header">
            <span className="username-span">{author}</span>
            <span className={emoSpanClassName}>{emoSpanText}{emoSpanSmile}</span>
            <span className="date-span">{date}</span>
      </div>
      <div className="post-message">
      {message}
      </div>
    </div>
  );
}

export default PostsBlock;
/*

*/