import LOGO from "../../assets/logo.svg";
import "./css/style.scss";
const HomePage = () => {
    return (
        <div className="container">
            <div className="header-bar">
                <div className="logo">
                    <img src={LOGO} alt="Logo" />
                </div>
                <div>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HomePage;