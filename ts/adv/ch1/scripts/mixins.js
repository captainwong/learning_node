"use strict";
function RecordStatus(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.deleted = false;
        }
        get Deleted() {
            return this.deleted;
        }
        Delete() {
            this.deleted = true;
            console.log(`The record has been marked as deleted`);
        }
    };
}
function Timestamp(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.Updated = new Date();
        }
    };
}
class Person {
    constructor(firstName, lastName) {
        this.FirstName = firstName;
        this.LastName = lastName;
    }
}
const ActivePerson = RecordStatus(Timestamp(Person));
let activePerson = new ActivePerson("Peter", "O'Hanlon");
console.log(`${activePerson.Updated}`);
console.log(`${activePerson.Deleted}`);
activePerson.Delete();
console.log(`${activePerson.Updated}`);
console.log(`${activePerson.Deleted}`);
