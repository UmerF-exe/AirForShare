import "./style.scss";
const ThemeButton = ({disabled, title, onClick}) => {
    return (
        <button style={{borderColor: disabled && "#a1a3a1"}} className="theme-btn" onClick={onClick} disabled={disabled}>
            {title}
        </button>
    );
}

export default ThemeButton;