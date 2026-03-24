// DEMON ORBIT - Website Content
// Edit this file to change all text content on your landing page

const CONTENT = {
    // Header Section
    gameTitle: "DEMON ORBIT",
    subtitle: "Master taps, holds, and angelic relics to stop Lucifer's archdemons!",
    
    // Navigation
    discordNavText: "Join Discord",
    
    // Hero Section
    heroPitch: "In Demon Orbit, defend the Solar System from escaping archdemons using rhythmic taps and precise holds. Manage your faith resource wisely or watch sins unleash chaos across the cosmos!",
    primaryCTA: "Get Early Access",

    // Email Signup Section
    emailSectionTitle: "Join the Warden's List",
    emailIncentive: "Get 500 FREE Souls on Launch Day!",
    emailFieldPlaceholder: "Your Email Address",
    emailSubmitButton: "Get Early Access + 500 Souls",
    
    // Footer
    copyright: "© 2025–2026 Demon Orbit. All rights reserved.",
    
    // Links
    discordInvite: "https://discord.gg/tTaZUpHDRq",
    twitterUrl: "https://x.com/demon_orbit",
    tiktokUrl: "https://www.tiktok.com/@demonorbitgame",
    
    // Success Messages
    emailSuccessMessage: "You're in! Check your email to confirm. 500 Souls await on launch day.",
    emailErrorMessage: "Please enter a valid email address."
};

// DEPLOYMENT CHECKLIST:
// 1. Update Discord invite link: CONTENT.discordInvite
// 2. MailerLite form is live - verify signups arrive in dashboard
// 3. Add Google Analytics tracking ID
// 4. Test on mobile devices
// 5. Optimize images (WebP format recommended)
// 6. Set up domain and SSL certificate

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = CONTENT;
}