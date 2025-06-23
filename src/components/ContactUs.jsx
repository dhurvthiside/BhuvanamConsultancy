import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        interest: '',
        message: ''
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/xzzgjypj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    First_Name: formData.firstName,
                    Last_Name: formData.lastName,
                    Email: formData.email,
                    Interest: formData.interest,
                    Message: formData.message
                })
            });

            if (response.ok) {
                alert('Thank you! Your message has been sent successfully.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    interest: '',
                    message: ''
                });
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-[#0f1f33] text-white py-20 px-6 md:px-20 flex flex-col md:flex-row gap-14">
            {/* Left Text Block */}
            <div className="w-full md:w-1/2">
                <h2 className="uppercase tracking-widest text-lg mb-6">Find Your <br /> Next Home</h2>
                <p className="text-gray-300 leading-relaxed max-w-sm">
                    Whether you're looking to buy your dream home or rent a cozy space, we’re here to help you every step of the way. Reach out to us with your preferences, and let’s find a place that feels like home.
                </p>
            </div>

            {/* Right Form Block */}
            <div className="w-full md:w-1/2">
                <h2 className="uppercase tracking-widest text-lg mb-6">Contact Us</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block mb-1">First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full bg-transparent border-b border-gray-300 focus:outline-none py-1"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1">Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full bg-transparent border-b border-gray-300 focus:outline-none py-1"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1">Email *</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-transparent border-b border-gray-300 focus:outline-none py-1"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Interested in</label>
                        <div className="flex gap-6 mt-1">
                            {['Buy', 'Rent', 'Property Management'].map(option => (
                                <label key={option} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="interest"
                                        value={option}
                                        checked={formData.interest === option}
                                        onChange={handleChange}
                                        className="accent-white"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1">Message</label>
                        <textarea
                            name="message"
                            rows="3"
                            className="w-full bg-transparent border-b border-gray-300 focus:outline-none py-1"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`px-6 py-2 font-bold mt-2 transition ${submitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white`}
                        >
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ContactUs;
