import {useState, useEffect} from 'react'

const initialFormValues = {
    username: '',
    email: '',
    password: ''
};

export default function Login() {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

useEffect(() => {
    console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
    }
}, [formErrors, formValues, isSubmit])

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is requires!";
        }
        if (!values.email) {
            errors.email = "Email is requires!";
        } else if(!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is requires!";
        } 
        return errors
    }

    return(
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <label>User
                    <input 
                        name = 'username'
                        type = 'text'
                        value = {formValues.username}
                        onChange = {handleChange}
                        placeholder = 'User'
                    />
                </label>
                <p>{formErrors.username}</p>
                <br />
                <label>Email 
                    <input
                        name = 'email'
                        type = 'email'
                        value = {formValues.email}
                        onChange = {handleChange}
                        placeholder = 'Email'
                    ></input>
                </label>
                <p>{formErrors.email}</p>
                <br />
                <label>Password
                    <input
                        name = 'password'
                        type = 'password'
                        value = {formValues.password}
                        onChange = {handleChange}
                        placeholder = 'password'
                    ></input>
                </label>
                <p>{formErrors.password}</p>
                <button>Submit</button>
            </form>
        </div>
    )

}