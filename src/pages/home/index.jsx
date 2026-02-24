import { LOGO, TEXT_GREY, TEXT_COLOR, FILES_GREY, FILES_COLOR } from "../../assets/Imports.jsx"

import "./css/style.scss";
import { use, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ThemeButton, TextArea, DropZone, FilesList } from "../../components/Imports.jsx";

const HomePage = () => {
    const [type, setType] = useState("text");
    const [textValue, setTextValue] = useState("");
    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        console.log("acceptedFiles", acceptedFiles);
        setFiles([...files, ...acceptedFiles]);
    }
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
                                <ThemeButton title={"Save"} disabled={textValue ? false : true} />
                            </div>
                        </div> :
                        <div className="files-section">
                            <div className="files-header">
                                <h1>Files</h1>
                                <div className="files-btn">
                                    <div  className="download-btn">
                                        <FaDownload />
                                        Download All
                                    </div>
                                    <div onClick={() => setFiles([])} className="delete-btn">
                                        <MdDelete />
                                        Delete All
                                    </div>
                                </div>
                            </div>
                            {files.length ? <FilesList files={files} onDrop={onDrop}/> :
                            <DropZone
                                onDrop={onDrop}
                                textElement={
                                    <>
                                        Drag and drop any files up to 2 files, 5Mbs each or <span> Browse
                                            Upgrade </span> to get more space
                                    </>
                                } />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;