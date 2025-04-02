// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');

        if (question && answer) {
            question.addEventListener('click', () => {
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                question.classList.toggle('active');
            });
        }
    });

    // Booking modal functionality
    const modal = document.getElementById('booking-modal');
    const bookingButtons = document.querySelectorAll('.booking-btn');
    const closeBtn = document.querySelector('.close');
    const bookingForm = document.getElementById('booking-form');
    const dateInput = document.getElementById('date');

    console.log('Modal elements:', {
        modal: modal,
        buttons: bookingButtons,
        closeBtn: closeBtn,
        form: bookingForm,
        dateInput: dateInput
    });

    if (dateInput) {
        // Initialize Flatpickr calendar
        flatpickr(dateInput, {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            minDate: "today",
            maxDate: new Date().fp_incr(30),
            minTime: "09:00",
            maxTime: "17:00",
            time_24hr: true,
            disable: [
                function(date) {
                    return date.getDay() === 0; // Disable Sundays
                }
            ],
            locale: {
                firstDayOfWeek: 1,
                weekdays: {
                    shorthand: ['Нед', 'Пон', 'Вто', 'Сре', 'Чет', 'Пет', 'Саб'],
                    longhand: ['Недела', 'Понеделник', 'Вторник', 'Среда', 'Четврток', 'Петок', 'Сабота']
                },
                months: {
                    shorthand: ['Јан', 'Фев', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'],
                    longhand: ['Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
                }
            }
        });
    }

    // Add click event listeners to booking buttons
    if (bookingButtons.length > 0) {
        bookingButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Booking button clicked');
                if (modal) {
                    modal.style.display = 'block';
                }
            });
        });
    }

    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                date: dateInput.value,
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value
            };

            console.log('Booking details:', formData);
            
            // Show success message
            alert('Вашиот термин е успешно закажан! Ќе добиете СМС потврда наскоро.');
            
            // Reset form and close modal
            bookingForm.reset();
            modal.style.display = 'none';
        });
    }

    // Calculator functionality
    const calculatorButtons = document.querySelectorAll('.calculator-btn');
    const calculatorModal = document.getElementById('calculator-modal');
    const closeButtons = document.querySelectorAll('.close');
    
    // Get form elements
    const calculatorForm = document.getElementById('calculator-form');
    const installmentButtons = document.querySelectorAll('.installment-btn');
    const monthsSelect = document.getElementById('months');
    const installmentMonths = document.querySelector('.installment-months');
    const installmentResult = document.querySelector('.installment-result');
    
    // Add click event to all calculator buttons
    calculatorButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            calculatorModal.style.display = 'block';
        });
    });
    
    // Close modal when clicking the close button or outside the modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            button.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Handle installment button clicks
    installmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            installmentButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const showMonths = this.dataset.value === 'yes';
            installmentMonths.style.display = showMonths ? 'block' : 'none';
            installmentResult.style.display = 'none';
            
            if (showMonths) {
                // Reset months select to first option
                monthsSelect.value = '3';
                calculateMonthlyPayment();
            }
        });
    });
    
    // Handle months selection change
    monthsSelect.addEventListener('change', calculateMonthlyPayment);
    
    function calculateMonthlyPayment() {
        const totalText = document.getElementById('total-cost').textContent;
        const total = parseInt(totalText.replace(/[^0-9]/g, ''));
        const months = parseInt(monthsSelect.value);
        const monthlyPayment = Math.ceil(total / months);
        
        document.getElementById('monthly-installment').textContent = formatPrice(monthlyPayment);
        installmentResult.style.display = 'flex';
    }
    
    // Calculate total and monthly payments
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const vehicleType = document.getElementById('vehicle-type').value;
        const engineSize = parseInt(document.getElementById('engine-size').value);
        const vehicleAge = parseInt(document.getElementById('vehicle-age').value);
        const fuelType = document.getElementById('fuel-type').value;
        const insuranceType = document.getElementById('insurance').value;
        const greenCard = document.getElementById('green-card').value;
        
        // Calculate costs based on vehicle type and other factors
        let technicalCost = calculateTechnicalCost(vehicleType, engineSize);
        let insuranceCost = calculateInsuranceCost(vehicleType, vehicleAge, insuranceType);
        let ecoTax = calculateEcoTax(vehicleType, engineSize, fuelType);
        let roadTax = calculateRoadTax(vehicleType);
        let greenCardCost = greenCard === 'yes' ? calculateGreenCardCost(vehicleType) : 0;
        
        // Calculate total
        let total = technicalCost + insuranceCost + ecoTax + roadTax + greenCardCost;
        
        // Update result display
        document.getElementById('technical-cost').textContent = formatPrice(technicalCost);
        document.getElementById('insurance-cost').textContent = formatPrice(insuranceCost);
        document.getElementById('eco-tax').textContent = formatPrice(ecoTax);
        document.getElementById('road-tax').textContent = formatPrice(roadTax);
        document.getElementById('green-card-cost').textContent = formatPrice(greenCardCost);
        document.getElementById('total-cost').textContent = formatPrice(total);
        
        // Reset installment options
        installmentButtons.forEach(btn => btn.classList.remove('active'));
        installmentMonths.style.display = 'none';
        installmentResult.style.display = 'none';
        
        // Show results and installment options
        document.getElementById('calculation-result').style.display = 'block';
        document.querySelector('.installment-options').style.display = 'block';
    });
});

// Helper function to format price
function formatPrice(price) {
    return price.toLocaleString() + ' ден.';
}

// Base prices for calculations
const PRICES = {
    technical: {
        car: 1500,
        motorcycle: 800,
        truck: 2500
    },
    insurance: {
        basic: {
            car: 4000,
            motorcycle: 2000,
            truck: 8000
        },
        standard: {
            car: 6000,
            motorcycle: 3000,
            truck: 12000
        },
        full: {
            car: 8000,
            motorcycle: 4000,
            truck: 16000
        }
    },
    ecoTax: {
        petrol: 1000,
        diesel: 1500,
        lpg: 800,
        hybrid: 500,
        electric: 0
    },
    roadTax: {
        car: 2000,
        motorcycle: 1000,
        truck: 4000
    },
    greenCard: {
        car: 3000,
        motorcycle: 2000,
        truck: 4000
    }
};

// Calculate technical inspection cost
function calculateTechnicalCost(vehicleType, engineSize) {
    let cost = PRICES.technical[vehicleType];
    if (engineSize > 2000) {
        cost *= 1.2; // 20% more for engines larger than 2000cc
    }
    return Math.round(cost);
}

// Calculate insurance cost
function calculateInsuranceCost(vehicleType, vehicleAge, insuranceType) {
    let cost = PRICES.insurance[insuranceType][vehicleType];
    const currentYear = new Date().getFullYear();
    const ageYears = currentYear - vehicleAge;
    if (ageYears > 10) {
        cost *= 1.2; // 20% more for vehicles older than 10 years
    }
    return Math.round(cost);
}

// Calculate eco tax
function calculateEcoTax(vehicleType, engineSize, fuelType) {
    let cost = PRICES.ecoTax[fuelType];
    if (engineSize > 2000) {
        cost *= 1.5; // 50% more for engines larger than 2000cc
    }
    if (vehicleType === 'motorcycle' && engineSize > 1000) {
        cost *= 1.3; // 30% more for motorcycles over 1000cc
    }
    return Math.round(cost);
}

// Calculate road tax
function calculateRoadTax(vehicleType) {
    return PRICES.roadTax[vehicleType];
}

// Calculate green card cost
function calculateGreenCardCost(vehicleType) {
    return PRICES.greenCard[vehicleType];
}

// Scroll-based navigation hide/show
let lastScroll = 0;
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.style.display = 'none';
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to service items
document.querySelectorAll('.service-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    observer.observe(item);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Modal functionality
const bookingBtn = document.querySelector('.booking-btn');
const calculatorBtn = document.querySelector('.calculator-btn');
const bookingModal = document.getElementById('booking-modal');
const calculatorModal = document.getElementById('calculator-modal');
const closeBtns = document.querySelectorAll('.close');

function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

bookingBtn.addEventListener('click', () => openModal(bookingModal));
calculatorBtn.addEventListener('click', () => openModal(calculatorModal));

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Initialize date picker
if (typeof flatpickr !== 'undefined') {
    flatpickr("#date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        time_24hr: true
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
}); 