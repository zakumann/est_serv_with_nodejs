const { sequelize } = require('./models/index');

const driver = () => {
    sequelize.sync().then(() => {
        console.log('Reset Complete')
    }).catch((err) => {
        console.error('Reset Failed');
        console.error(err);
    });
};
driver();