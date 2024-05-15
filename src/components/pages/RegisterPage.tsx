// src/components/RegisterPage.tsx
import React, { useState } from 'react';
import styles from '../../styles/LoginForm.module.css';
import countiesData from '../../assets/citiesData/_judete.json';

// Interfaces for the data structures
interface ICounty {
    abr: string;
    nume: string;
}

interface IFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    county: string;
    city: string;
}

interface IErrors {
    [key: string]: string;
}


const RegisterPage: React.FC = () => {
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState<IFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        county: '',
        city: ''
    });
    const [errors, setErrors] = useState<IFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        county: '',
        city: ''
    });

    const handleCountyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCounty = e.target.value;
        setFormData({ ...formData, county: selectedCounty, city: '' }); // Reset city when county changes

        if (selectedCounty) {
            try {
                // Dynamically import the cities data based on the selected county
                const citiesData = await import(`../../assets/citiesData/${selectedCounty}.json`);
                setCities(citiesData.default);
            } catch (error) {
                console.error('Failed to load city data:', error);
                setCities([]);
            }
        }
    };


    const validateForm = () => {
        let isValid = true;
        let errors: IFormData = { username: '', email: '', password: '', confirmPassword: '', county: '', city: '' };

        if (!formData.username.trim()) {
            errors.username = 'Username is required';
            isValid = false;
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
            isValid = false;
        }
        if (!formData.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }
        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }
        if (!formData.county) {
            errors.county = 'County is required';
            isValid = false;
        }
        if (!formData.city) {
            errors.city = 'City is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost/ConnectFest-api/users/create.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
    
                if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
                    alert('Registration successful!');
                } else {
                    const errorMessage = await response.text(); 
                    throw new Error(errorMessage || 'Non-JSON error from server');
                }
            } catch (error: any) {
                console.error('Registration failed:', error);
                alert('Registration failed: ' + error.message);
            }
        }
    };
    

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
                </div>
                <div className={styles.dropdownContainer}>
                <div>
                    <label className={styles.label}>County:</label>
                    <select name="county" value={formData.county} onChange={handleCountyChange} className={styles.dropdown}>
                        <option value="">Select a county</option>
                        {countiesData.map((county) => (
                            <option key={county.abr} value={county.abr}>{county.nume}</option>
                        ))}
                    </select>
                    {errors.county && <div style={{ color: 'red' }}>{errors.county}</div>}
                </div>
                <div>
                    <label className={styles.label}>City:</label>
                    <select name="city" value={formData.city} onChange={handleCityChange} className={styles.dropdown} disabled={!formData.county}>
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
                </div>
            </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
