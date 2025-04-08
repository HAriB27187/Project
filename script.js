
document.addEventListener('DOMContentLoaded', function() {
   
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
         
            e.preventDefault();
            
            navLinks.forEach(item => item.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetSection = this.getAttribute('href');
            
           
            if (targetSection === '#') {
              
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                
                const section = document.querySelector(targetSection);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.log(`Section ${targetSection} not found.`);
                }
            }
        });
    });
    
 
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('href');
            if (targetSection === '#home') {
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                
                const section = document.querySelector(targetSection);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.log(`Section ${targetSection} not found.`);
                }
            }
        });
    });
    

    const allButtons = document.querySelectorAll('.btn');
    
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
         
            const buttonText = this.textContent.trim();
            
            
            if (buttonText === 'Request Demo') {
                showNotification('Demo request submitted! We will contact you soon.');
            } else if (buttonText === 'Learn More') {
      
                const benefitsSection = document.querySelector('.benefits-section');
                if (benefitsSection) {
                    benefitsSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText === 'Place Order') {
                showNotification('Thank you for your order! Our team will process it shortly.');
            } else if (buttonText === 'Feedback') {
                showFeedbackForm();
            }
        });
    });
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#00A8E8';
        notification.style.color = '#001529';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    function showFeedbackForm() {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.width = '100%';
        backdrop.style.height = '100%';
        backdrop.style.backgroundColor = 'rgba(0,0,0,0.7)';
        backdrop.style.zIndex = '999';
        backdrop.style.display = 'flex';
        backdrop.style.justifyContent = 'center';
        backdrop.style.alignItems = 'center';
        
        const modal = document.createElement('div');
        modal.className = 'feedback-modal';
        modal.style.backgroundColor = '#002240';
        modal.style.padding = '30px';
        modal.style.borderRadius = '8px';
        modal.style.maxWidth = '500px';
        modal.style.width = '90%';
        modal.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        
        modal.innerHTML = `
            <h2 style="color: #ffffff; margin-bottom: 20px;">Share Your Feedback</h2>
            <form id="feedback-form">
                <div style="margin-bottom: 15px;">
                    <label for="name" style="display: block; color: #ffffff; margin-bottom: 5px;">Name</label>
                    <input type="text" id="name" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #003b6f; background-color: #00305a; color: #ffffff;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label for="email" style="display: block; color: #ffffff; margin-bottom: 5px;">Email</label>
                    <input type="email" id="email" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #003b6f; background-color: #00305a; color: #ffffff;">
                </div>
                <div style="margin-bottom: 20px;">
                    <label for="message" style="display: block; color: #ffffff; margin-bottom: 5px;">Your Feedback</label>
                    <textarea id="message" rows="5" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #003b6f; background-color: #00305a; color: #ffffff;"></textarea>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <button type="button" id="cancel-feedback" style="padding: 10px 15px; border-radius: 4px; border: 2px solid #ffffff; background-color: transparent; color: #ffffff; cursor: pointer;">Cancel</button>
                    <button type="submit" style="padding: 10px 15px; border-radius: 4px; border: none; background-color: #00A8E8; color: #001529; cursor: pointer;">Submit Feedback</button>
                </div>
            </form>
        `;
        
        backdrop.appendChild(modal);
        
        document.body.appendChild(backdrop);
        
        document.getElementById('cancel-feedback').addEventListener('click', function() {
            document.body.removeChild(backdrop);
        });
        
        document.getElementById('feedback-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
             
                document.body.removeChild(backdrop);
            
                showNotification('Thank you for your feedback!');
            
                console.log('Feedback submitted:', { name, email, message });
            } else {
                alert('Please fill out all fields.');
            }
        });
        
        backdrop.addEventListener('click', function(e) {
            if (e.target === backdrop) {
                document.body.removeChild(backdrop);
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        

        if (scrollTop > 10) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
            header.style.backgroundColor = '#001220';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            header.style.backgroundColor = '#001e3c';
        }
        
        lastScrollTop = scrollTop;
    });
    
    const sections = [
        { selector: '.hero', id: 'home' },
        { selector: '.benefits-section', id: 'benefits' },
        { selector: '.drone-types-section', id: 'types' },
        { selector: '.applications-section', id: 'applications' },
        { selector: '.customer-section', id: 'contact' }
    ];
    
    sections.forEach(section => {
        const element = document.querySelector(section.selector);
        if (element && !element.hasAttribute('id')) {
            element.setAttribute('id', section.id);
        }
    });
    
    updateActiveNavLink();
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100; 
       
        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetBottom = offsetTop + element.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to corresponding nav link
                    const correspondingLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            }
        });
    }
    

    window.addEventListener('scroll', updateActiveNavLink);
    
  
    const cards = document.querySelectorAll('.benefit-card, .drone-card, .application-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('benefit-card') ? 'translateY(-10px)' : 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            if (this.classList.contains('drone-card')) {
                this.style.borderColor = '#00A8E8';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            if (this.classList.contains('drone-card')) {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
});