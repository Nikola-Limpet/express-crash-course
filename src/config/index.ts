import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // default to development

const stage = process.env.STAGE || 'local'; // default to local

let envConfig;

if (stage === 'local') {
  envConfig = require('./local').default; 
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}


export default merge( {
  stage,
  env : process.env.NODE_ENV,
  port :  process.env.PORT,
  secret :{
    jwt : process.env.JWT_SECRET,
    bcrypt : process.env.BCRYPT_SECRET
  }
} , envConfig);