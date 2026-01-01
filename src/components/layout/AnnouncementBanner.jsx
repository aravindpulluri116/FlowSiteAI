import React from 'react';
import './AnnouncementBanner.css';

/**
 * Scrolling Announcement Banner Component
 * Displays promotional offers in a horizontally scrolling marquee
 * Clicks redirect to WhatsApp
 */
const AnnouncementBanner = () => {
    // WhatsApp number - update this with your actual number
    const whatsappNumber = "918886113839"; // Format: country code + number (no + or spaces)
    const whatsappMessage = "Hi! I'm interested in your launching offers.";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const announcements = [
        "🚀 LAUNCHING OFFER: Get 30% OFF on all services!",
        "⚡ Limited Time: Free consultation with every project",
        "🎉 New Year Special: Premium features at no extra cost",
        "💼 Enterprise Plans: Custom solutions for your business",
        "🌟 First 10 Clients: Exclusive discounts",
        "📱 Click here to chat with us on WhatsApp!"
    ];

    // Duplicate for seamless loop
    const scrollContent = [...announcements, ...announcements];

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="announcement-banner"
        >
            <div className="announcement-track">
                {scrollContent.map((text, index) => (
                    <span key={index} className="announcement-item">
                        {text}
                        <span className="announcement-separator">✦</span>
                    </span>
                ))}
            </div>
        </a>
    );
};

export default AnnouncementBanner;
