import React, { useState, useEffect } from 'react';
import './CgTracker.css';
import CgpaBlock from './CgpaBlock';

function CgTracker() {
    const [formData, setFormData] = useState({
        totalSem: '',
        currentSem: '',
        currentCG: '',
        targetCG: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [allCG, setAllCG] = useState([]);

    useEffect(() => {
        const savedCGData = localStorage.getItem('calculatedCGs');
        if (savedCGData) {
            setAllCG(JSON.parse(savedCGData));
            setShowAnalysis(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        window.scrollBy({
            top: 200,
            behavior: 'smooth'
        });

        let { totalSem, currentSem, currentCG, targetCG } = formData;

        totalSem = parseInt(totalSem);
        currentSem = parseInt(currentSem);
        currentCG = parseFloat(currentCG);
        targetCG = parseFloat(targetCG);

        if (totalSem > 10) {
            setError('Total semesters cannot be more than 10.');
            return;
        }
        if (currentSem > 10 || currentSem > totalSem) {
            setError(`Current semester cannot be more than ${totalSem}.`);
            return;
        }
        if (currentCG > 10.00) {
            setError('CG cannot be more than 10.00.');
            return;
        }
        if (targetCG > 10.00) {
            setError('CG cannot be more than 10.00.');
            return;
        }

        setError('');

        let requiredSG = ((totalSem * targetCG) - (currentCG * (currentSem - 1))) / (totalSem - currentSem + 1);
        requiredSG = parseFloat(requiredSG.toFixed(2));

        const calculatedCGs = [];

        function getOrdinalSuffix(number) {
            if (number === 11 || number === 12 || number === 13) return 'th';
            const lastDigit = number % 10;
            if (lastDigit === 2) return 'st';
            if (lastDigit === 3) return 'nd';
            if (lastDigit === 4) return 'rd';
            return 'th';
        }

        for (let i = 1; i <= totalSem - currentSem + 1; i++) {
            let nextCG = (currentCG * (currentSem - 1) + (requiredSG * i)) / (currentSem + i - 1);
            nextCG = parseFloat(nextCG.toFixed(2));

            const semesterNumber = currentSem + i;
            const ordinalSuffix = getOrdinalSuffix(semesterNumber);

            calculatedCGs.push({
                semester: `${semesterNumber - 1}${ordinalSuffix}`,
                currentSG: requiredSG,
                currentCG: nextCG
            });
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setShowAnalysis(true);
            setAllCG(calculatedCGs);

            localStorage.setItem('calculatedCGs', JSON.stringify(calculatedCGs));
        }, 2000);
    };

    return (
        <>
            <div id='cgpa-tracker-container29'>
                <div id="text-container29">
                    <h1 id="text-title29">Set Your Targets, <br />Achieve Your Dreams</h1>
                    <p id="text-description29">Setting goals is the first step toward achievement. With our intuitive input system, you can easily define your total semesters, current semester, and target CG.</p>
                </div>

                <div id='form-container29'>
                    <h2 id="form-title29">CGPA Calculator</h2>
                    <form onSubmit={handleSubmit} id='form29'>
                        <label htmlFor="totalSem29">Enter number of semesters : </label>
                        <br />
                        <input
                            type="number"
                            id='totalSem29'
                            name='totalSem'
                            placeholder='e.g. 8'
                            required
                            value={formData.totalSem}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="currentSem29">Enter your current semester : </label>
                        <br />
                        <input
                            type="number"
                            id='currentSem29'
                            name='currentSem'
                            placeholder='e.g. 3'
                            required
                            value={formData.currentSem}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="currentCG29">Enter your current CG <br />(if you are in 1st Semester then enter 0) : </label>
                        <br />
                        <input
                            type="number"
                            step={0.01}
                            id='currentCG29'
                            name='currentCG'
                            placeholder='e.g. 6.5'
                            required
                            value={formData.currentCG}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="targetCG29">Enter your target CG : </label>
                        <br />
                        <input
                            type="number"
                            step={0.01}
                            id='targetCG29'
                            name='targetCG'
                            placeholder='e.g. 8.0'
                            required
                            value={formData.targetCG}
                            onChange={handleChange}
                        />
                        <br />
                        <div id="submit-container29">
                            <button type="submit" id="submit-btn29" disabled={loading}>Analyze Now</button>
                        </div>
                        {error && <p id="error-message29">{error}</p>}
                    </form>
                </div>
            </div>

            <div id="analysis29">
                <h1 id="dashboard-title29" className='flex flex-sb flex-c'>Academic Performance Dashboard</h1>
                {loading && <p id="loading-message29">Analysis in progress...</p>}
                {showAnalysis && (
                    <>
                        {allCG.map((sem, index) => (
                            <CgpaBlock
                                key={index}
                                semName={sem.semester}
                                cg={sem.currentCG}
                                sg={sem.currentSG}
                            />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}

export default CgTracker;
