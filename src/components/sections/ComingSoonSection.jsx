import React, { useState, useEffect } from 'react';
import './ComingSoonSection.css';

// Google Apps Script Web App URL for email collection
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyCoCvC8t8tgmOWxtlk2qzp0-MQL4u8ZwcgfQFFy0FxwP1mwe1F3DF1LpKU0lmJnzdLbg/exec';

/**
 * Coming Soon Section Component
 * Premium launch page with email capture and micro-animations
 */
const ComingSoonSection = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            setStatus('success');
            setShowConfetti(true);
            setEmail('');

            // Hide confetti after animation
            setTimeout(() => setShowConfetti(false), 2000);
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    // Generate confetti particles
    const confettiParticles = Array.from({ length: 30 }, (_, i) => (
        <div
            key={i}
            className="confetti-particle"
            style={{
                '--delay': `${Math.random() * 0.5}s`,
                '--x': `${(Math.random() - 0.5) * 200}px`,
                '--rotation': `${Math.random() * 360}deg`,
                left: `${Math.random() * 100}%`,
            }}
        />
    ));

    return (
        <section className="coming-soon-section" id="coming-soon">
            <div className="coming-soon-gradient-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
            </div>

            <div className="coming-soon-card">
                {/* Confetti Container */}
                {showConfetti && (
                    <div className="confetti-container">{confettiParticles}</div>
                )}

                <header className="coming-soon-header">
                    <img src="/images/FlowSite.png" alt="FlowSite" className="coming-soon-logo" />
                    <div className="coming-soon-social-icons">
                        <a href="https://www.instagram.com/flowsiteai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                    </div>
                </header>

                <div className="coming-soon-content">
                    <div className="coming-soon-text">
                        <span className="coming-soon-badge">🚀 Launching Soon</span>
                        <h1 className="coming-soon-heading">
                            Something Big<br />Is Coming
                        </h1>
                        <p className="coming-soon-subtext">
                            Beautiful websites, smart AI tools, and powerful automations — all in one platform built for modern businesses.
                        </p>

                        {status === 'success' ? (
                            <div className="success-message">
                                <span className="success-icon">🎉</span>
                                <h3>You're in!</h3>
                                <p>We'll notify you at launch 🚀</p>
                            </div>
                        ) : (
                            <form className="coming-soon-form" onSubmit={handleSubmit}>
                                <div className="form-input-wrapper">
                                    <input
                                        type="email"
                                        placeholder="Enter your work email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={status === 'loading'}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={status === 'error' ? 'error' : ''}
                                    >
                                        {status === 'loading' ? (
                                            <span className="loading-spinner"></span>
                                        ) : status === 'error' ? 'Try Again' : 'Get Early Access'}
                                    </button>
                                </div>
                                <span className="coming-soon-trust">
                                    🔒 No spam. Unsubscribe anytime.
                                </span>
                            </form>
                        )}
                    </div>

                    <div className={`coming-soon-illustration ${status === 'success' ? 'rocket-boost' : ''}`}>
                        <div className="rocket-trail"></div>
                        <img src="/images/image.svg" alt="Launch illustration" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComingSoonSection;
