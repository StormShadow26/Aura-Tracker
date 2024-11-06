

const Axios = require("axios");

exports.compileCode = (req, res) => {
    
    const { code, language, input } = req.body;

    // Supported languages and their respective versions
    const languageMap = {
        "c": { language: "c", version: "10.2.0" },
        "cpp": { language: "c++", version: "10.2.0" },
        "python": { language: "python", version: "3.10.0" },
        "java": { language: "java", version: "15.0.2" }
    };

    // Check if the language is supported
    if (!languageMap[language]) {
        return res.status(400).send({ error: "Unsupported language" });
    }

    // Data to be sent to the compilation API
    const data = {
        language: languageMap[language].language,
        version: languageMap[language].version,
        files: [
            {
                name: "main",
                content: code
            }
        ],
        stdin: input
    };

    // API configuration
    const config = {
        method: 'post',
        url: 'https://emkc.org/api/v2/piston/execute',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    
    Axios(config)
        .then(response => {
            res.json(response.data.run);  // Send the run object directly
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: "Something went wrong" });
        });
};
