import mongoose from "mongoose";

// Que la estructura sea más flexible en lo que a campos se refiere. Que el usuario pueda meter campos extra sin que la API le eche atrás.
const bookSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    title: String,
    color: String,
    pageNumbers: Number,
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
});

const Books = mongoose.model("Books", bookSchema);
