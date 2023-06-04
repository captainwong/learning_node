const model = require('./model');

let
    Pet = model.Pet,
    User = model.User;

(async () => {
    var user = await User.create({
        name: 'John',
        gender: false,
        email: 'john-' + Date.now() + '@hotmail.pet',
        password: '123456'
    });
    console.log('created: ' + JSON.stringify(user));

    var cat = await Pet.create({
        ownerId: user.id,
        name: 'Garfield',
        gender: false,
        birth: '1997-07-07',
    });
    console.log('created: ' + JSON.stringify(cat));

    var dog = await Pet.create({
        ownerId: user.id,
        name: 'Odie',
        gender: true,
        birth: '2008-08-08',
    });
    console.log('created: ' + JSON.stringify(dog));

})();

