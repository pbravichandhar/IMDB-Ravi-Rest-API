const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    votedBy  : Schema.Types.ObjectId,
    isUpVote : Boolean,
});

const reviewSchema = new Schema({
    reviewBy  : Schema.Types.ObjectId,
    rating : Number,
    comments : { 
        type: String, 
        default: '' 
    }
});

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    votes: [ voteSchema ],
    reviews: [ reviewSchema ],
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
    }
});

movieSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Movie', movieSchema);