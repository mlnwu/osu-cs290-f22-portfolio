import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new user with the name, reps, weight, unit and date in the body.
 */
app.post("/exercises", (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' });
        });
});

/**
 * Retrieve exercises. 
 */
 app.get("/exercises", (req, res) => {
    exercises.getExercises()
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' });
        });
});

/**
 * Retrive the exercise corresponding to the ID.
 */
app.get('/exercises/:_id', (req, res) => {
    console.log(req.body);
    const exerciseId = req.params._id;
    exercises.getExerciseById(exerciseId)
        .then(exercises => {
            if (exercises !== null) {
                res.status(200).json(exercises);
            } else {
                res.status(404).json({ Error: 'Invalid Request' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(404).json({ Error: 'Invalid Request' });
        });
 });

/**
 * Update the exercise whose ID is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
app.put("/exercises/:_id", (req, res) => {
    const exerciseId = req.params._id;
    exercises.updateExercise(exerciseId, req)
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            if (error === "Invalid Request") {
                res.status(400).json({Error: 'Invalid Request'});
            }
            else if (error === "Not Found") {
                res.status(404).json({Error: 'Not Found'});
            }
            else {
                res.status(400).json({Error: "Invalid Request"})
            };
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete("/exercises/:_id", (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then((deletedCount) => {
            if (deletedCount === null) {
                res.status(404).json({Error: "Not found"})
            }
            else {
                res.status(204).send()
            }
        })
        .catch((error) => {
            console.log(error);
            res.send({Error: "Invalid Request"})
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});