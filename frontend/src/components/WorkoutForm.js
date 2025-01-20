import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const handleSumit = async (e) => {
        e.preventDefault();
        const workout = { title, load, reps };

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await res.json();
        if (!res.ok) {
            setError(json.error);
        }

        if (res.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('Workout added', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json})
        }
    };
    
    
    return (
        <form className='create' onSubmit={handleSumit}>
            <h3>Add Workout Exercise</h3>

            <label>Workout Title:</label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
            
            <label>Load (kg):</label>
            <input type='number' onChange={(e) => setLoad(e.target.value)} value={load} />
            
            <label>Reps:</label>
            <input type='number' onChange={(e) => setReps(e.target.value)} value={reps} />

            <button>Add To List</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default WorkoutForm;