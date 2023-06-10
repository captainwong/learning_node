const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, maxLength: 100 },
        family_name: { type: String, required: true, maxLength: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);

AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

AuthorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

AuthorSchema
    .virtual('lifespan')
    .get(function () {
        let str = '';
        if (this.date_of_birth) {
            str += DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
        }
        str += ' - ';
        if (this.date_of_death) {
            str += DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
        }
        return str;
    });

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function () {
    return DateTime.fromJSDate(this.date_of_death).toISODate();
});

module.exports = mongoose.model('Author', AuthorSchema);
