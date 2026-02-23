import LOGO from "../../assets/logo.svg";
import TEXT_GREY from "../../assets/text-grey.svg";
import TEXT_COLOR from "../../assets/text-color.svg";
import FILES_GREY from "../../assets/files-grey.svg";
import FILES_COLOR from "../../assets/files-color.svg";

import TextArea from "../../components/TextArea.jsx";
import "./css/style.scss";
import { use, useState } from "react";
import ThemeButton from "../../components/Button.jsx";

const HomePage = () => {
    const [type, setType] = useState("text");
    const [textValue, setTextValue] = useState("");
    return (
        <div className="container">
            <div className="header-bar">
                <div className="logo">
                    <img src={LOGO} alt="Logo" />
                </div>
                <div className="menu-bar">
                    <ul>
                        <li>How it works</li>
                        <li>Download</li>
                        <li>Upgrade</li>
                        <li>Feedback</li>
                        <li className="menu-btn">Login / Register</li>
                    </ul>
                </div>
            </div>
            <div className="main-card">
                <div className="card-sidebar">
                    <div onClick={() => setType("text")}>
                        <img src={type === "text" ? TEXT_COLOR : TEXT_GREY} alt="Text Icon" />
                    </div>
                    <div onClick={() => setType("files")}>
                        <img src={type === "files" ? FILES_COLOR : FILES_GREY} alt="Files Icon" />
                    </div>
                </div>
                <div className="card-container">
                    {type === "text" ?
                    <div className="text-section">
                        <h1>Text</h1>
                        <div className="resize-section">
                            <TextArea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                        </div>
                        <div className="save-btn-section">
                            <span>Clear</span>
                            <ThemeButton title={"Save"} disabled={textValue ? false : true}/>
                        </div>
                    </div> :
                    <div className="file-section">
                        <h1>Files</h1>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;