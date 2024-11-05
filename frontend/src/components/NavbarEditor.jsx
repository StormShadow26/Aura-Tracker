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
        <div className="bg-gray-800 text-white px-6 py-2 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                    <label className="text-sm font-medium">Language:</label>
                    <Select
                        options={languages}
                        value={languages.find(lang => lang.value === userLang)}
                        onChange={(e) => setUserLang(e.value)}
                        className="w-28 text-gray-800"
                        placeholder="Select Language"
                    />
                </div>

                <div className="flex items-center space-x-1">
                    <label className="text-sm font-medium">Theme:</label>
                    <Select
                        options={themes}
                        value={themes.find(theme => theme.value === userTheme)}
                        onChange={(e) => setUserTheme(e.value)}
                        className="w-28 text-gray-800"
                        placeholder="Select Theme"
                    />
                </div>

                <div className="flex items-center space-x-1">
                    <label className="text-sm font-medium">Font Size:</label>
                    <input
                        type="range"
                        min="18"
                        max="30"
                        value={fontSize}
                        step="2"
                        onChange={(e) => setFontSize(e.target.value)}
                        className="w-16 h-2"
                    />
                    <span className="text-sm">{fontSize}px</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
