/**
 * A model for an user
 */
export class UserActivity {
    firstName: String;
    middleName: String;
    lastName: String;
    username: String;
    email: String;
    birthdate: String;
    address: {
        streetAddress: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        latitude: Number,
        longitude: Number
    };


    constructor(){}
}