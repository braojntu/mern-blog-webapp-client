import './header.css'

export default function Header() {
  return (
    <div className="header">
      <div className="titles">
        <span className="titleSm"> </span>
        <span className="titleLg">Mern Stack Blog</span>
      </div>
      <div className='img-container'>
        <img
          className="headerImg"
          src="https://nextbridgeinstitute.com/wp-content/uploads/2021/02/MERN-Stack-1.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
