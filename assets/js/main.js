// Contact Form Handler (Simple version)
        class ContactHandler {
            constructor() {
                this.init();
            }
            
            init() {
                this.setupEventListeners();
            }
            
            // Setup event listeners
            setupEventListeners() {
                // Simple contact form submission
                const contactForm = document.getElementById('simpleContactForm');
                if (contactForm) {
                    contactForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        
                        const name = document.getElementById('contactName').value;
                        const email = document.getElementById('contactEmail').value;
                        const phone = document.getElementById('contactPhone').value;
                        const subject = document.getElementById('contactSubject').value;
                        const message = document.getElementById('contactMessage').value;
                        const formStatus = document.getElementById('formStatus');
                        
                        if (!name || !email || !subject || !message) {
                            this.showNotification('Please fill in all required fields.', 'error');
                            return;
                        }
                        
                        // Create mailto link
                        const mailtoLink = `mailto:teamwebforge@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                            `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`
                        )}`;
                        
                        // Open email client
                        window.location.href = mailtoLink;
                        
                        // Show success message
                        formStatus.innerHTML = '<span style="color: var(--success);">ԣ� Email client opened. Please send your message.</span>';
                        
                        // Reset form after a delay
                        setTimeout(() => {
                            contactForm.reset();
                            formStatus.innerHTML = '';
                        }, 5000);
                    });
                }
            }
            
            // Show notification
            showNotification(text, type = 'success') {
                // Create notification element
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background-color: ${type === 'error' ? 'var(--accent)' : 'var(--success)'};
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    z-index: 1001;
                `;
                
                notification.innerHTML = `
                    <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
                    ${text}
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 4000);
            }
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize contact handler
            const contactHandler = new ContactHandler();
            
            // Mobile menu toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');
            const navOverlay = document.getElementById('navOverlay');

            const closeMobileMenu = () => {
                navLinks.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            };
            
            mobileMenuBtn.addEventListener('click', () => {
                const isOpen = navLinks.classList.toggle('active');
                if (navOverlay) {
                    navOverlay.classList.toggle('active', isOpen);
                }
                document.body.style.overflow = isOpen ? 'hidden' : '';
                mobileMenuBtn.innerHTML = isOpen
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            if (navOverlay) {
                navOverlay.addEventListener('click', closeMobileMenu);
            }
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Add click tracking for contact buttons
            document.querySelectorAll('.contact-btn, .contact-link').forEach(button => {
                button.addEventListener('click', function() {
                    const platform = this.classList.contains('btn-whatsapp') ? 'WhatsApp' :
                                   this.classList.contains('btn-phone') ? 'Phone' :
                                   this.classList.contains('btn-email') ? 'Email' : 'Contact';
                    console.log(`Contact attempt via ${platform}`);
                });
            });
        });
