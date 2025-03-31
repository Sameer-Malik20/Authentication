import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utisl/ZodSchema';  // Assumiing you've set up this schema for login
import axios from 'axios';

type LoginFormData = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);  // Reset previous errors
        setSuccessMessage(null); // Reset success message

        try {
            // Make API request to login endpoint
            const response = await axios.post('http://localhost:5000/api/login', data);
            setSuccessMessage("Login successful! Redirecting...");  // Show success message
            // Redirect or store login data (e.g., token)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Login to Your Account</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            {...register('email')}
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            {...register('password')}
                            id="password"
                            placeholder="Enter your password"
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <p className="text-center mt-4">
                        Don't have an account? <a href="/">Sign up here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
