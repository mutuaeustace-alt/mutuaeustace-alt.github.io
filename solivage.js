    // About Us toggle logic
    const aboutToggle = document.getElementById('aboutToggle');
    const aboutDetails = document.getElementById('aboutDetails');
    if (aboutToggle && aboutDetails) {
        aboutToggle.addEventListener('click', function() {
            if (aboutDetails.style.display === 'none' || aboutDetails.style.display === '') {
                aboutDetails.style.display = 'block';
                aboutToggle.textContent = 'Hide About Us';
                aboutDetails.scrollIntoView({behavior:'smooth'});
            } else {
                aboutDetails.style.display = 'none';
                aboutToggle.textContent = 'Learn More About Us';
            }
        });
    }
    // Slide panel and slide contact form logic removed as requested.
    // Rate and Charges Calculator Logic
    const chargesCalculatorForm = document.getElementById('chargesCalculatorForm');
    const calcResult = document.getElementById('calcResult');
    const calcPrice = document.getElementById('calcPrice');
    if (chargesCalculatorForm && calcResult && calcPrice) {
        chargesCalculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Get values
            const vehicle = document.getElementById('calcVehicle').value;
            const service = document.getElementById('calcService').value;
            const pickup = document.getElementById('calcPickup').value;
            const hours = parseInt(document.getElementById('calcHours').value, 10);
            const time = document.getElementById('calcTime').value;
            // Pricing base (Kenya market, sample values)
            let base = 0;
            if (vehicle === 'electric') base = 2500;
            else if (vehicle === 'vclass') base = 3500;
            else if (vehicle === 'bodaboda') base = 600;
            // Service multiplier
            let price = 0;
            if (service === 'hourly') price = base * hours;
            else if (service === 'oneway') price = base * 2.5;
            else if (service === 'premium') price = base * hours * 0.85; // 15% discount for 2+ days
            // Pickup/Dropoff adjustment
            if (pickup === 'jomo' || pickup === 'wilson') price += 800;
            if (pickup === 'serena' || pickup === 'villa' || pickup === 'sarova') price += 400;
            // Time adjustment
            if (time === 'night') price *= 1.18; // 18% night surcharge
            // Minimum price
            if (price < base) price = base;
            // Format
            calcPrice.textContent = 'KES ' + price.toLocaleString('en-KE', {maximumFractionDigits:0});
            calcResult.style.display = 'block';
            calcResult.scrollIntoView({behavior:'smooth'});
        });
    }
    // Vehicle selection and booking logic
    const selectButtons = document.querySelectorAll('.select-vehicle');
    const bookingFormContainer = document.getElementById('bookingFormContainer');
    const vehicleBookingForm = document.getElementById('vehicleBookingForm');
    const selectedVehicleTitle = document.getElementById('selectedVehicleTitle');
    const bookingSuccessAnimation = document.getElementById('bookingSuccessAnimation');
    let selectedVehicle = '';

    if (selectButtons && bookingFormContainer && vehicleBookingForm && selectedVehicleTitle && bookingSuccessAnimation) {
        selectButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                selectedVehicle = this.getAttribute('data-vehicle');
                selectedVehicleTitle.textContent = `Booking: ${selectedVehicle}`;
                bookingFormContainer.style.display = 'block';
                vehicleBookingForm.style.display = 'block';
                bookingSuccessAnimation.style.display = 'none';
                vehicleBookingForm.scrollIntoView({behavior:'smooth'});
            });
        });
        vehicleBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            vehicleBookingForm.style.display = 'none';
            bookingSuccessAnimation.style.display = 'block';
            setTimeout(() => {
                bookingSuccessAnimation.style.display = 'none';
                bookingFormContainer.style.display = 'none';
            }, 3500);
        });
    }

    // Lottie player polyfill for booking animation
    if (typeof window.LottiePlayer === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
        script.type = 'module';
        document.head.appendChild(script);
    }
// solivage.js
// All logic for Solivage Travellers website

// Smooth scroll for nav links
document.addEventListener('DOMContentLoaded', function() {
    // Animate sections on scroll (fade in)
    const sections = document.querySelectorAll('.section');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // Fallback: show all
        sections.forEach(section => section.classList.add('visible'));
    }
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact form validation and (placeholder) submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            // reCAPTCHA validation
            const recaptcha = window.grecaptcha && window.grecaptcha.getResponse ? window.grecaptcha.getResponse() : '';
            if (!recaptcha) {
                alert('Please complete the reCAPTCHA to prove you are not a robot.');
                return;
            }
            // Backend integration placeholder (e.g., EmailJS, fetch to API)
            // fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, message, recaptcha }) })
            //   .then(res => res.json()).then(data => { ... })
            alert('Thank you for contacting Solivage Travellers! We will get back to you soon.');
            contactForm.reset();
            if (window.grecaptcha && window.grecaptcha.reset) window.grecaptcha.reset();
        });
    }

    // Chatbot functionality
    const chatWidget = document.querySelector('.chat-widget');
    const chatBubble = document.getElementById('chatBubble');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const minimizeBtn = document.getElementById('minimizeChat');

    if (chatWidget && chatBubble && userInput && sendButton && chatMessages && minimizeBtn) {
        // Open chat
        chatBubble.addEventListener('click', () => {
            chatWidget.classList.remove('minimized');
            userInput.focus();
        });
        // Minimize chat
        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatWidget.classList.add('minimized');
        });

        // Chatbot responses
        const responses = {
            'hello': 'Hello! Welcome to Solivage Travellers. How can we assist you with your luxury journey today?',
            'hi': 'Hi there! How can we help you travel in style?',
            'book': 'To book a chauffeur or travel service, simply fill out our contact form or call us at +254718664273.',
            'contact': 'You can reach us at info@solivagetravellers.com or +254718664273.',
            'services': 'We offer on-demand chauffeurs, airport transfers, pre-booked rides, and hourly hire. Which are you interested in?',
            'price': 'For a personalized quote, please use our contact form or call us directly.',
            'thank': 'You are most welcome! If you have more questions, just ask.',
            'default': 'I am here to help with bookings, services, and any questions about Solivage Travellers. Would you like to speak with a human representative?'
        };

        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getResponse(input) {
            const lowercaseInput = input.toLowerCase();
            for (let key in responses) {
                if (lowercaseInput.includes(key)) {
                    return responses[key];
                }
            }
            return responses.default;
        }

        sendButton.addEventListener('click', () => {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                setTimeout(() => {
                    addMessage(getResponse(message));
                }, 700);
            }
        });

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
    }
});
