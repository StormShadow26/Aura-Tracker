import React from 'react';
import Select from 'react-select';


const Navbar = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize }) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];

    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];

    return (
        <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
            <h1 className="text-2xl font-bold">Geeks Code Compiler</h1>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Language:</label>
                    <Select
                        options={languages}
                        value={languages.find(lang => lang.value === userLang)}
                        onChange={(e) => setUserLang(e.value)}
                        className="w-32 text-gray-800"
                        placeholder="Select Language"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Theme:</label>
                    <Select
                        options={themes}
                        value={themes.find(theme => theme.value === userTheme)}
                        onChange={(e) => setUserTheme(e.value)}
                        className="w-32 text-gray-800"
                        placeholder="Select Theme"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Font Size:</label>
                    <input
                        type="range"
                        min="18"
                        max="30"
                        value={fontSize}
                        step="2"
                        onChange={(e) => setFontSize(e.target.value)}
                        className="w-24"
                    />
                    <span className="text-sm">{fontSize}px</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
