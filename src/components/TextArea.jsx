import "./style.scss";
import { useEffect, useRef } from "react";
const TextArea = ({value, onChange}) => {
    const textareaRef = useRef();
    const resizeTextArea = (e) => {
        textareaRef.current.style.height = "24px";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 12 + "px";
    }
    
    useEffect(() => {
        resizeTextArea();
    }, [value])
    return (
        <textarea ref={textareaRef} onInput={resizeTextArea} value={value} onChange={onChange} placeholder="Type something..." className="text-area"></textarea>
    );
}

export default TextArea;