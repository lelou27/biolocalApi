const conf = {
    host: 'mongodb+srv',
    username: 'biolocal',
    password: 'biolocal',
    cluster: 'cluster0.dhzkf.mongodb.net',
    dbname: 'biolocal',
    options: '?retryWrites=true&w=majority',
};

module.exports = {
    connectionString: `${conf.host}://${conf.username}:${conf.password}@${conf.cluster}/${conf.dbname}${conf.options}`
};
