db.auth('root', 'examplePassword');

db = db.getSiblingDB('newsletter');

db.createUser({
  user: 'newsletter',
  pwd: 'examplePassword',
  roles: [{ role: 'readWrite', db: 'newsletter' }],
  passwordDigestor: 'server',
});
