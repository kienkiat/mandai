import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signupUser } from '../../api/authApi';
import styles from './SignUp.module.css';
import { toast } from 'react-toastify';

const Signup = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await signupUser(form);
            login(res.data.token, res.data);
            toast.success('Signup successfully!', {className: 'toast-success-custom'});
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign Up</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Username</label>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
            <p className={styles.loginLink}>
                Already have an account? <Link to="/login">Login</Link>
            </p>

        </div>
    );
};

export default Signup;
