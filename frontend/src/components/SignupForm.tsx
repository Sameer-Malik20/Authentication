import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../utisl/ZodSchema';  // Assuming you've already set up this schema
import axios from 'axios';

type SignupFormData = {
    email: string;
    password: string;
};

const SignupForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setError(null);  // Reset previous errors
        setSuccessMessage(null); // Reset success message

        try {
            // Make API request to signup endpoint
            const response = await axios.post('http://localhost:5000/api/signup', data);
            setSuccessMessage("Signup successful!");  // Show success message
        } catch (err: any) {
            setError(err.response?.data?.message || 'Unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Create Your Account</h3>

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
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <p className="text-center mt-4">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
