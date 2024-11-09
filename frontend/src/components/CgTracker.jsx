import React, { useState , useEffect } from 'react';
// import './CgTracker.css';
import CgpaBlock from './CgpaBlock'

function CgTracker() {
    const [formData, setFormData] = useState({
        totalSem: '',
        currentSem: '',
        currentCG: '',
        targetCG: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [showAnalysis, setShowAnalysis] = useState(false); // Show analysis state
    const [allCG, setAllCG] = useState([]); // Store calculated CG data

    useEffect(() => {
        const savedCGData = localStorage.getItem('calculatedCGs');
        if (savedCGData) {
            setAllCG(JSON.parse(savedCGData)); // Set from local storage
            setShowAnalysis(true); // Show analysis if data exists
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
            top: 200,  // Scroll by 200px vertically
            behavior: 'smooth'  // Smooth scrolling animation
        });

        let { totalSem, currentSem, currentCG, targetCG } = formData;

        totalSem = parseInt(totalSem);
        currentSem = parseInt(currentSem);
        currentCG = parseFloat(currentCG);
        targetCG = parseFloat(targetCG);


        // Validation
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

        // Clear error if validation passes
        setError('');

        let requiredSG = ((totalSem * targetCG) - (currentCG * (currentSem - 1))) / (totalSem - currentSem + 1);
        requiredSG = parseFloat(requiredSG.toFixed(2)); // Convert to 2 decimal places


        const calculatedCGs = [];

        // Function to determine the ordinal suffix for a number
        function getOrdinalSuffix(number) {
            if (number === 11 || number === 12 || number === 13) return 'th'; // Special case for 11th, 12th, and 13th
            const lastDigit = number % 10;
            if (lastDigit === 2) return 'st';
            if (lastDigit === 3) return 'nd';
            if (lastDigit === 4) return 'rd';
            return 'th';
        }

        for (let i = 1; i <= totalSem - currentSem + 1; i++) {
            let nextCG = (currentCG * (currentSem - 1) + (requiredSG * i)) / (currentSem + i - 1);
            nextCG = parseFloat(nextCG.toFixed(2)); // Convert to 2 decimal places

            const semesterNumber = currentSem + i;
            const ordinalSuffix = getOrdinalSuffix(semesterNumber);

            calculatedCGs.push({
                semester: `${semesterNumber - 1}${ordinalSuffix}`, // Name of the upcoming semester with the correct suffix
                currentSG: requiredSG, // SG is the same for each semester
                currentCG: nextCG // CG for the respective semester
            });
        }


        // Show loading spinner and simulate analysis
        setLoading(true);

        setTimeout(() => {
            // Simulate fetching or analyzing data (after 2 seconds)
            setLoading(false);
            setShowAnalysis(true);
            setAllCG(calculatedCGs); // Save the calculated CG data

            localStorage.setItem('calculatedCGs', JSON.stringify(calculatedCGs));
        }, 2000);
    };

    return (
        <>
            <div className='cgpa-tracker-container'>
                <div className="text-container">
                    <h1>Set Your Targets, <br />Achieve Your Dreams</h1>
                    <p>Setting goals is the first step toward achievement. With our intuitive input system, you can easily define your total semesters, current semester, and target CG.</p>
                </div>

                <div className='form-container'>
                    <h2>CGPA Calculator</h2>
                    <form onSubmit={handleSubmit} className='form'>
                        <label htmlFor="totalSem">Enter number of semesters : </label>
                        <br />
                        <input
                            type="number"
                            id='totalSem'
                            name='totalSem'
                            placeholder='e.g. 8'
                            required
                            value={formData.totalSem}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="currentSem">Enter your current semester : </label>
                        <br />
                        <input
                            type="number"
                            id='currentSem'
                            name='currentSem'
                            placeholder='e.g. 3'
                            required
                            value={formData.currentSem}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="currentCG">Enter your current CG <br />(if you are in 1st Semster then enter 0) : </label>
                        <br />
                        <input
                            type="number"
                            step={0.01}
                            id='currentCG'
                            name='currentCG'
                            placeholder='e.g. 6.5'
                            required
                            value={formData.currentCG}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="targetCG">Enter your target CG : </label>
                        <br />
                        <input
                            type="number"
                            step={0.01}
                            id='targetCG'
                            name='targetCG'
                            placeholder='e.g. 8.0'
                            required
                            value={formData.targetCG}
                            onChange={handleChange}
                        />
                        <br />
                        <div>
                            <button type="submit" disabled={loading}>Analyze Now</button>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            </div>

            <div className="analysis">

                <h1 className='flex flex-sb flex-c'>Academic Performance Dashboard</h1>
                {/* Display loading spinner */}
                {loading && <p>Analysis in progress...</p>}

                {/* Display analysis blocks once loading is complete */}
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