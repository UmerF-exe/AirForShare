import { CiFileOn } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FaHtml5, FaCss3Alt, FaFilePdf } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";

import DropZone from "./DropZone.jsx";

const FilesList = ({ files, onDrop }) => {
    return (
        <div className="files-list">
            {files.map((v, i) => {
                let icon;
                switch (v.type) {
                    case "text/html":
                        icon = <FaHtml5 />
                        break;
                    case "text/css":
                        icon = <FaCss3Alt />
                        break;
                    case "text/javascript":
                        icon = <IoLogoJavascript />
                        break;
                    case "application/pdf":
                        icon = <FaFilePdf />
                        break;
                    default:
                        icon = <CiFileOn />
                }
                return (
                    <div key={i}>
                        {v.type.indexOf("image") !== -1 ? (
                            <img
                                style={{ objectFit: "cover" }}
                                width={100}
                                height={100}
                                src={URL.createObjectURL(v)}
                                alt={v.name}
                            />
                        ) : (
                            <>
                                {icon}
                                <span className="files-name">
                                    {(() => {
                                        const dotIndex = v.name.lastIndexOf(".");
                                        const namePart =
                                            dotIndex !== -1 ? v.name.slice(0, dotIndex) : v.name;
                                        const extPart =
                                            dotIndex !== -1 ? v.name.slice(dotIndex) : "";

                                        const shortName =
                                            namePart.length > 20 ? namePart.slice(0, 20) : namePart;

                                        return (
                                            <>
                                                {shortName}
                                                <b>{extPart}</b>
                                            </>
                                        );
                                    })()}
                                </span>
                            </>
                        )}
                    </div>
                );
            }
            )}
            <div >
                <DropZone onDrop={onDrop} textElement={
                    <span className="add-more-files">
                        <GoPlus />
                        <br />
                        <p>Add File</p>
                        <span>(Upto 5 MB)</span>
                    </span>
                } />
            </div>
        </div>
    )
}

export default FilesList;