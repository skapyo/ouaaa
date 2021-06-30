import passwordValidator from 'password-validator';

const validatePasswordFormat = (password: string): string[] => {
  let passwordToValidate = !password ? ' ' : password;

  var schema = new passwordValidator();

  schema
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .symbols()
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']);

  const result = schema.validate(passwordToValidate, { list: true });

  if (typeof result === 'boolean') {
    throw new Error(
      'schema validate returned a boolean instead of a string array',
    );
  }

  return result;
};

export default validatePasswordFormat;

// const validatePasswordFormat = (password ) => {

//     let passwordToValidate =(!password) ? ' ' : password

//     var schema = new passwordValidator();

//     schema
//     .is().min(8)
//     .is().max(15)
//     .has().uppercase()
//     .has().lowercase()
//     .has().digits()
//     .has().symbols()
//     .has().not().spaces()
//     .is().not().oneOf(['Passw0rd', 'Password123']);

//     return schema.validate(passwordToValidate,{ list: true })
// }

// export default validatePasswordFormat
