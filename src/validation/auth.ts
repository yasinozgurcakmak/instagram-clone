import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a correct email adress").required("Email is required").trim(),
  password: Yup.string().required("Password is required").trim(),
});

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a correct email adress").required("Email is required").trim(),
  name: Yup.string().min(2, "Name must be at least 2 characters").max(20,"Name must be at most 2 characters").required("Name is required").trim(),
  username: Yup.string().min(2, "Username must be at least 2 characters" ).max(20,"Name must be at most 2 characters").required("Username is required").trim(),
  password: Yup.string().min(8, "Username must be at least 8 characters" ).required("Password is required").matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%*? ^:;+-._,]).{6,32}$/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character").trim(),
});

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a correct email adress").required("Email is required").trim(),
});

const resetPasswordScreenSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a correct email adress").required("Email is required").trim(),
  password: Yup.string().min(8, "Username must be at least 8 characters" ).required("Password is required").matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%*? ^:;+-._,]).{6,32}$/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character").trim(),
  rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required("Passwords do not match").trim(),
});


export { loginSchema, registerSchema, resetPasswordSchema, resetPasswordScreenSchema}