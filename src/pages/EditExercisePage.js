import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const EditPage = async () => {
        const updateExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: "PUT",
            body: JSON.stringify(updateExercise),
            headers: {
                "Content-Type": "application/JSON",
            },
        });
        if (response.status === 200) {
            alert("Successfully updated the exercise")
        }
        else {
            alert("Failed to update the exercise")
        }
        navigate("/");
    };
    return (
        <div>
            <p>Edit Exercise Routine</p>
            <form>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="number"
                    min="1"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                <input
                    type="number"
                    min="1"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <select 
                    name="unit"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
                <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
            </form>
            <button
                    onClick={EditPage}>Save</button>
        </div>
    );
}

export default EditExercisePage;