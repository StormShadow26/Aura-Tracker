import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import Navbar from './NavbarEditor';
import Axios from 'axios';
import spinner from './spinner.svg';
import { useOutput } from '../contexts/OutputContext';

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
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <Navbar
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
            />
            <div className="w-full p-4 space-y-4 bg-gray-800">
                <Editor
                    options={options}
                    height="80vh"
                    width="100%"
                    theme={userTheme}
                    language={userLang}
                    defaultLanguage="python"
                    defaultValue="# Enter your code here"
                    onChange={(value) => { setUserCode(value) }}
                    className="rounded-lg border border-gray-700 shadow-lg"
                />
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-lg transition duration-200"
                    onClick={() => compile()}
                >
                    Run
                </button>
            </div>

            <div className="w-full p-4 space-y-4 bg-gray-700">
                <h4 className="text-xl font-semibold mb-2">Input:</h4>
                <textarea
                    className="p-2 h-32 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <h4 className="text-xl font-semibold mb-2">Output:</h4>
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <img src={spinner} alt="Loading..." className="w-10 h-10 animate-spin" />
                    </div>
                ) : (
                    <div className="p-4 h-32 rounded-lg bg-gray-800 border border-gray-600 text-white overflow-y-auto">
                        <pre>{userOutput}</pre>
                    </div>
                )}
                <button
                    onClick={() => clearOutput()}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow-lg transition duration-200"
                >
                    Clear Output
                </button>
            </div>
        </div>
    );
}

export default CodeEditor;
