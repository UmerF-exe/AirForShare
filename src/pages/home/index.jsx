import "./css/style.scss";
import { useEffect, useState } from "react";
import JSZip from 'jszip';
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { LOGO, TEXT_GREY, TEXT_COLOR, FILES_GREY, FILES_COLOR } from "../../assets/Imports.jsx"
import { ThemeButton, TextArea, DropZone, FilesList } from "../../components/Imports.jsx";
import { database, ref, set, onValue, remove, storage, storageRef, uploadBytesResumable, getDownloadURL } from "../../db/index.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const HomePage = () => {
    const { isDark, toggleTheme } = useTheme();
    const [type, setType] = useState("text");
    const [textValue, setTextValue] = useState("");
    const [isText, setIsText] = useState(false);
    const [files, setFiles] = useState([]);
    const [tempFiles, setTempFiles] = useState([]);

    const onDrop = async (acceptedFiles) => {
        setTempFiles([...tempFiles, ...acceptedFiles]);
        let filesArr = [];
        for (var i = 0; i < acceptedFiles.length; i++) {
            filesArr.push(uploadFiles(acceptedFiles[i], files.length + i));
        }
        const allFiles = await Promise.all(filesArr)
        setFiles([...files, ...allFiles]);
        set(ref(database, 'files-sharing'), {
            files: [...files, ...allFiles]
        });
        setTempFiles([]);
    }

    const uploadFiles = (file, i) => {
        return new Promise((resolve, reject) => {
            const fileRef = storageRef(storage, `files/file-${i}`);
            const uploadTask = uploadBytesResumable(fileRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve({ url: downloadURL, type: file.type, name: file.name });
                    });
                }
            );
        })
    }

    const saveChanges = () => {
        console.log("Saving changes to the database...");
        set(ref(database, 'text-sharing'), {
            text: textValue,
        });
    }

    const clearText = async () => {
        await remove(ref(database, 'text-sharing'));
        setTextValue("");
        setIsText(false);
    }

    const deleteAllFiles = async () => {
        await remove(ref(database, 'files-sharing'));
        setFiles([]);
    }

    const downloadAll = () => {
        let filename = "AllFiles.zip";
        const zip = new JSZip()
        const folder = zip.folder('project')
        files.forEach((file) => {
            const blobPromise = fetch(file.url)
                .then(function (response) {
                    if (response.status === 200 || response.status === 0) {
                        return Promise.resolve(response.blob());
                    } else {
                        return Promise.reject(new Error(response.statusText));
                    }
                })
            const name = file.name;
            folder.file(name, blobPromise)
        })

        zip.generateAsync({ type: "blob" })
            .then(blob => saveAs(blob, filename))
            .catch(e => console.log(e));
    }

    useEffect(() => {
        const textRef = ref(database, 'text-sharing');
        onValue(textRef, (snapshot) => {
            const data = snapshot.val();
            if (data?.text) {
                setTextValue(data.text);
                setIsText(true);
            }
        });

        const filesRef = ref(database, 'files-sharing');
        onValue(filesRef, (snapshot) => {
            const data = snapshot.val();
            if (data?.files) {
                setFiles(data.files);
            }
        })
    }, [])

    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);
    const links = textValue.match(regex) || [];

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
                        <li onClick={toggleTheme} style={{ cursor: 'pointer' }}>
                            {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
                        </li>
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
                                <TextArea value={textValue} onChange={(e) => { setTextValue(e.target.value); setIsText(false) }} />
                            </div>
                            <div className="text-footer">
                                <div className="links">
                                    {links.map((v, i) => <div key={i}><span><a href={v} target="_blank" rel="noopener noreferrer">{v}</a></span></div>)}
                                </div>
                                <div className="save-btn-section">
                                    <span onClick={clearText}>Clear</span>
                                    {isText ? <ThemeButton onClick={() => { navigator.clipboard.writeText(textValue) }} title={"Copy"} /> : <ThemeButton onClick={saveChanges} title={"Save"} disabled={!textValue} />}
                                </div>
                            </div>
                        </div> :
                        <div className="files-section">
                            <div className="files-header">
                                <h1>Files</h1>
                                <div className="files-btn">
                                    <div onClick={downloadAll} className="download-btn">
                                        <FaDownload />
                                        Download All
                                    </div>
                                    <div onClick={deleteAllFiles} className="delete-btn">
                                        <MdDelete />
                                        Delete All
                                    </div>
                                </div>
                            </div>
                            {tempFiles.length || files.length ? <FilesList tempFiles={tempFiles} files={files} onDrop={onDrop} /> :
                                <DropZone onDrop={onDrop} textElement={<> Drag and drop any files up to 2 files, 5Mbs each or <span> Browse Upgrade </span> to get more space</>} />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;