import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import Navbar from './NavbarEditor';
import Axios from 'axios';
import spinner from './spinner.svg';
import { useOutput } from '../contexts/OutputContext';
import './CodeEditor.css';

function CodeEditor({ initialInput }) {
    const [userCode, setUserCode] = useState(``);
    const [userLang, setUserLang] = useState("python");
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState(initialInput || "");
    const [userOutput, setUserOutput] = useState("");
    const { output, setOutput } = useOutput();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUserInput(initialInput);
    }, [initialInput]);

    const options = {
        fontSize: fontSize
    };

    function compile() {
        setLoading(true);
        if (userCode === ``) return;

        Axios.post(`http://localhost:4000/api/v1/compile`, {
            code: userCode,
            language: userLang,
            input: userInput
        }).then((res) => {
            setUserOutput(res.data.stdout || res.data.stderr);
            setOutput(res.data.stdout || res.data.stderr);
        }).then(() => {
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setUserOutput("Error: " + (err.response ? err.response.data.error : err.message));
            setOutput("Error: " + (err.response ? err.response.data.error : err.message));
            setLoading(false);
        });
    }

    function clearOutput() {
        setUserOutput("");
    }

    return (
        <div id="code-editor-container23" className="code-editor-container23">
            <Navbar
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
            />
            <div id="editor-wrapper23" className="editor-wrapper23">
                <Editor
                    options={options}
                    height="80vh"
                    width="100%"
                    theme={userTheme}
                    language={userLang}
                    defaultLanguage="python"
                    defaultValue="# Enter your code here"
                    onChange={(value) => { setUserCode(value) }}
                    className="editor23"
                />
                <button
                    id="run-button23"
                    className="run-button23"
                    onClick={() => compile()}
                >
                    Run
                </button>
            </div>

            <div id="input-output-wrapper23" className="input-output-wrapper23">
                <h4 id="input-label23" className="label23">Input:</h4>
                <textarea
                    id="input-box23"
                    className="input-box23"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <h4 id="output-label23" className="label23">Output:</h4>
                {loading ? (
                    <div id="loading-spinner23" className="loading-spinner23">
                        <img src={spinner} alt="Loading..." className="spinner-image23" />
                    </div>
                ) : (
                    <div id="output-box23" className="output-box23">
                        <pre>{userOutput}</pre>
                    </div>
                )}
                <button
                    id="clear-button23"
                    onClick={() => clearOutput()}
                    className="clear-button23"
                >
                    Clear Output
                </button>
            </div>
        </div>
    );
}

export default CodeEditor;
