import React from 'react';
import Select from 'react-select';
import './NavbarEditor.css';

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
        <div id="navbar-container24" className="navbar-container24">
            <div id="navbar-items24" className="navbar-items24">
                <div id="language-select-container24" className="select-container24">
                    <label id="language-label24" className="label24">Language:</label>
                    <Select
                        options={languages}
                        value={languages.find(lang => lang.value === userLang)}
                        onChange={(e) => setUserLang(e.value)}
                        className="select24"
                        placeholder="Select Language"
                    />
                </div>

                <div id="theme-select-container24" className="select-container24">
                    <label id="theme-label24" className="label24">Theme:</label>
                    <Select
                        options={themes}
                        value={themes.find(theme => theme.value === userTheme)}
                        onChange={(e) => setUserTheme(e.value)}
                        className="select24"
                        placeholder="Select Theme"
                    />
                </div>

                <div id="font-size-container24" className="font-size-container24">
                    <label id="font-size-label24" className="label24">Font Size:</label>
                    <input
                        type="range"
                        min="18"
                        max="30"
                        value={fontSize}
                        step="2"
                        onChange={(e) => setFontSize(e.target.value)}
                        className="font-size-slider24"
                    />
                    <span id="font-size-value24" className="font-size-value24">{fontSize}px</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
