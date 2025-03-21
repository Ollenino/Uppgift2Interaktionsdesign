// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get all the navigation dots
    const dots = document.querySelectorAll('.dot');
    
    // Get all the sections
    const sections = document.querySelectorAll('.section');
    
    // Get the navigation buttons
    const infoBtn = document.querySelector('.info-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const backBtn = document.querySelector('.back-btn');
    const cancelButton = document.getElementById('cancelButton');
    
    // Get all section IDs in order
    const sectionIds = Array.from(sections).map(section => section.id);
    
    // Current section index
    let currentSectionIndex = 0;
    
    // Scrolling variables
    let lastScrollTime = 0;
    const scrollCooldown = 800; // 0.8 second cooldown between scroll actions
    
    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections first
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Update current section index
            currentSectionIndex = sectionIds.indexOf(sectionId);
        }
        
        // Add active class to the corresponding dot
        const targetDot = document.querySelector(`.dot[data-section="${sectionId}"]`);
        if (targetDot) {
            targetDot.classList.add('active');
        }
    }
    
    // Function to navigate to the next section
    function nextSection() {
        if (currentSectionIndex < sectionIds.length - 1) {
            currentSectionIndex++;
            showSection(sectionIds[currentSectionIndex]);
        }
    }
    
    // Function to navigate to the previous section
    function prevSection() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            showSection(sectionIds[currentSectionIndex]);
        }
    }
    
    // Add click event listeners to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Info button click event (navigate to "about" section)
    if (infoBtn) {
        infoBtn.addEventListener('click', function() {
            showSection('about');
        });
    }
    
    // Pause button click event (navigate to "pause-form" section)
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            showSection('pause-form');
        });
    }
    
    // Back button click event (navigate to "home" section)
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            showSection('home');
        });
    }
    
    // Form cancel button event
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            showSection('home');
        });
    }
    
    // Form submit button event
    const pauseForm = document.getElementById('spielPauseForm');
    if (pauseForm) {
        pauseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const fullName = document.getElementById('fullName').value;
            const personalNumber = document.getElementById('personalNumber').value;
            const email = document.getElementById('email').value;
            
            if (!fullName || !personalNumber || !email) {
                alert('Vänligen fyll i alla obligatoriska fält.');
                return;
            }
            
            // Check that a pause period is selected
            const pausePeriod = document.querySelector('input[name="pausePeriod"]:checked');
            if (!pausePeriod) {
                alert('Vänligen välj en pausperiod.');
                return;
            }
            
            // Check confirmation checkbox
            const confirmTerms = document.getElementById('confirmTerms');
            if (!confirmTerms.checked) {
                alert('Du måste bekräfta att du vill pausa ditt spelande.');
                return;
            }
            
            // Form submission would normally happen here with AJAX
            // For demo purposes, we'll just show a confirmation message
            alert('Tack för din anmälan. Din spelpaus kommer att börja gälla inom 24 timmar.');
            
            // Reset form and return to home page
            pauseForm.reset();
            showSection('home');
        });
    }
    
    // Right sidebar menu options
    const menuOptions = document.querySelectorAll('.menu-option');
    
    if (menuOptions.length > 0) {
        menuOptions.forEach(option => {
            option.addEventListener('click', function() {
                const optionId = this.id;
                
                // Add active class to the clicked menu option
                menuOptions.forEach(opt => opt.classList.remove('active-menu'));
                this.classList.add('active-menu');
                
                // Simple alert for demonstration
                alert(`Du klickade på ${optionId}. Denna funktion kommer att implementeras senare.`);
            });
        });
    }
    
    // Handle mouse wheel scroll events
    window.addEventListener('wheel', function(event) {
        const currentTime = new Date().getTime();
        
        // Check if we're in cooldown period
        if (currentTime - lastScrollTime < scrollCooldown) {
            return;
        }
        
        // Prevent default scroll behavior
        event.preventDefault();
        
        // Detect scroll direction
        if (event.deltaY > 0) {
            // Scrolling down
            nextSection();
        } else {
            // Scrolling up
            prevSection();
        }
        
        // Update last scroll time
        lastScrollTime = currentTime;
    }, { passive: false });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(event) {
        const currentTime = new Date().getTime();
        
        // Check if we're in cooldown period
        if (currentTime - lastScrollTime < scrollCooldown) {
            return;
        }
        
        if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            nextSection();
            event.preventDefault();
            lastScrollTime = currentTime;
        } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            prevSection();
            event.preventDefault();
            lastScrollTime = currentTime;
        }
    });
    
    // Handle touch swipe events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;
    
    document.addEventListener('touchstart', function(event) {
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(event) {
        const currentTime = new Date().getTime();
        
        // Check if we're in cooldown period
        if (currentTime - lastScrollTime < scrollCooldown) {
            return;
        }
        
        touchEndY = event.changedTouches[0].screenY;
        
        // Calculate swipe distance
        const swipeDistance = touchStartY - touchEndY;
        
        // Check if swipe distance is significant
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe up (next section)
                nextSection();
            } else {
                // Swipe down (previous section)
                prevSection();
            }
            
            lastScrollTime = currentTime;
        }
    }, { passive: true });
    
    // Initialize with the first section active
    showSection('home');
});