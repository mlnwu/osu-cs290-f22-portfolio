import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise with name, reps, weight, unit and date.
 */
 const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    if (!name) { 
        throw "Invalid Request" 
    };
    if (reps <= 0 || (weight <= 0)) { 
        throw "Invalid Request"
    };
    if (isNaN(reps)){  
        throw "Invalid Request"
    };
    if (isNaN(weight)){
        throw "Invalid Request"
    };
    if (typeof(unit) != "string" || (unit != "lbs" && unit != "kgs")) {
        throw "Invalid Request"
    };
    const format = /^\d\d-\d\d-\d\d$/;
    if (!(format.test(date))) {
        throw "Invalid Request"
    };
    return exercise.save();
};

/**
 * Retrive exercises based on the filter, projection and limit parameters
 */
const getExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Find the exercise with the given ID
 */
const getExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

/**
 * Replace the parameters of the exercise with the ID
 */
const updateExercise = async (_id, Obj) => {
    const {name, reps, weight, unit, date} = Obj.body
    if (!name) { 
        throw "Invalid Request" 
    };
    if (isNaN(reps)){
        throw "Invalid Request"
    };
    if (isNaN(weight)){
        throw "Invalid Request"
    };
    if (unit !== "lbs" && unit !== "kgs") {
        throw "Invalid Request"
    };
    const format = /^\d\d-\d\d-\d\d$/;
    if (!(format.test(date))) {
        throw "Invalid Request"
    };
    const updateExercise = await Exercise.findByIdAndUpdate(_id, Obj.body)
    if (updateExercise === null) {
        throw "Not Found"
    };
    return updateExercise;
};

/**
 * Delete exercise with given ID
 */
const deleteExercise = async (_id) => {
    const deleteExercise = await Exercise.findByIdAndDelete({ _id: _id });
    return deleteExercise;
}

export { createExercise, getExercises, getExerciseById, updateExercise, deleteExercise };