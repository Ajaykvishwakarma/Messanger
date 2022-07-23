import style from './NotFound.module.css';
import { Link } from 'react-router-dom';
import NotFound1 from './NotFound1.gif';
export const NotFound = () => {

    
    return  (
      <>
        <div className={style.notfound}>
            <Link to="/">
                <img id={style.notfoundImage1} src={NotFound1} alt="" />
            </Link>
        </div>
    </>
    )
  };