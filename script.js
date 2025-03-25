
document.addEventListener('DOMContentLoaded', function() {
    
    const dots = document.querySelectorAll('.dot');
    
    
    const sections = document.querySelectorAll('.section');
    
    
    const infoBtn = document.querySelector('.info-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const backBtn = document.querySelector('.back-btn');
    const cancelButton = document.getElementById('cancelButton');
    
    
    const sectionIds = Array.from(sections).map(section => section.id);
    
   
    let currentSectionIndex = 0;
    
    
    let lastScrollTime = 0;
    const scrollCooldown = 800; 
    
    
    function showSection(sectionId) {
        
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            
            currentSectionIndex = sectionIds.indexOf(sectionId);
        }
        
        
        const targetDot = document.querySelector(`.dot[data-section="${sectionId}"]`);
        if (targetDot) {
            targetDot.classList.add('active');
        }
    }
    
   
    function nextSection() {
        if (currentSectionIndex < sectionIds.length - 1) {
            currentSectionIndex++;
            showSection(sectionIds[currentSectionIndex]);
        }
    }
    
    
    function prevSection() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            showSection(sectionIds[currentSectionIndex]);
        }
    }
    
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    
    if (infoBtn) {
        infoBtn.addEventListener('click', function() {
            showSection('about');
        });
    }
    
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            showSection('pause-form');
        });
    }
    
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            showSection('home');
        });
    }
    
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            showSection('home');
        });
    }
    
    
    const pauseForm = document.getElementById('spielPauseForm');
    if (pauseForm) {
        pauseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const fullName = document.getElementById('fullName').value;
            const personalNumber = document.getElementById('personalNumber').value;
            const email = document.getElementById('email').value;
            
            if (!fullName || !personalNumber || !email) {
                alert('Vänligen fyll i alla obligatoriska fält.');
                return;
            }
            
            
            const pausePeriod = document.querySelector('input[name="pausePeriod"]:checked');
            if (!pausePeriod) {
                alert('Vänligen välj en pausperiod.');
                return;
            }
            
            
            const confirmTerms = document.getElementById('confirmTerms');
            if (!confirmTerms.checked) {
                alert('Du måste bekräfta att du vill pausa ditt spelande.');
                return;
            }
            
            
            alert('Tack för din anmälan. Din spelpaus kommer att börja gälla inom 24 timmar.');
            
            
            pauseForm.reset();
            showSection('home');
        });
    }
    
    
    const menuOptions = document.querySelectorAll('.menu-option');
    
    if (menuOptions.length > 0) {
        menuOptions.forEach(option => {
            option.addEventListener('click', function() {
                const optionId = this.id;
                
                
                menuOptions.forEach(opt => opt.classList.remove('active-menu'));
                this.classList.add('active-menu');
                
                
                alert(`Du klickade på ${optionId}. Denna funktion kommer att implementeras senare.`);
            });
        });
    }
    
    
    window.addEventListener('wheel', function(event) {
        const currentTime = new Date().getTime();
        
        
        if (currentTime - lastScrollTime < scrollCooldown) {
            return;
        }
        
      
        event.preventDefault();
        
        
        if (event.deltaY > 0) {
            
            nextSection();
        } else {
            
            prevSection();
        }
        
        
        lastScrollTime = currentTime;
    }, { passive: false });
    
    
    document.addEventListener('keydown', function(event) {
        const currentTime = new Date().getTime();
        
        
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
    
    
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;
    
    document.addEventListener('touchstart', function(event) {
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(event) {
        const currentTime = new Date().getTime();
        
        
        if (currentTime - lastScrollTime < scrollCooldown) {
            return;
        }
        
        touchEndY = event.changedTouches[0].screenY;
        
        
        const swipeDistance = touchStartY - touchEndY;
        
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                
                nextSection();
            } else {
                
                prevSection();
            }
            
            lastScrollTime = currentTime;
        }
    }, { passive: true });
    

    showSection('home');
});