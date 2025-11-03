/*
Healing Tails Website JavaScript
Handles form validation, user interactions, and dynamic behavior
*/

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Healing Tails website loaded successfully');
    
    // PROGRAM APPLICATION MODAL FUNCTIONALITY
    // Get modal elements
    const modal = document.getElementById('programModal');
    const programForm = document.getElementById('programApplicationForm');
    const modalProgramTitle = document.getElementById('modalProgramTitle');
    const selectedProgramInput = document.getElementById('selectedProgram');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelBtn');
    const joinNowButtons = document.querySelectorAll('.join-now-btn');
    
    // Function to open the modal with the selected program
    function openModal(programName) {
        // Set the program name in the modal title and hidden input
        modalProgramTitle.textContent = `Apply for: ${programName}`;
        selectedProgramInput.value = programName;
        
        // Reset form and error messages
        programForm.reset();
        clearErrorMessages();
        
        // Display the modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
    
    // Add click event listeners to all "Join Now" buttons
    if (joinNowButtons.length > 0) {
        joinNowButtons.forEach(button => {
            button.addEventListener('click', function() {
                const programName = this.getAttribute('data-program');
                openModal(programName);
            });
        });
    }
    
    // Close modal when clicking the X button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking the cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // PROGRAM APPLICATION FORM VALIDATION AND SUBMISSION
    if (programForm) {
        programForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Validate all form fields
            const isValid = validateProgramForm();
            
            if (isValid) {
                // Form is valid - process the application
                processProgramApplication();
            }
        });
    }
    
    // Function to validate the program application form
    function validateProgramForm() {
        let isValid = true;
        
        // Clear previous error messages
        clearErrorMessages();
        
        // Validate First Name
        const firstName = document.getElementById('firstName');
        if (!firstName.value.trim()) {
            showError('firstNameError', 'First name is required');
            markFieldError(firstName);
            isValid = false;
        } else if (firstName.value.trim().length < 2) {
            showError('firstNameError', 'First name must be at least 2 characters');
            markFieldError(firstName);
            isValid = false;
        } else {
            markFieldSuccess(firstName);
        }
        
        // Validate Surname
        const surname = document.getElementById('surname');
        if (!surname.value.trim()) {
            showError('surnameError', 'Surname is required');
            markFieldError(surname);
            isValid = false;
        } else if (surname.value.trim().length < 2) {
            showError('surnameError', 'Surname must be at least 2 characters');
            markFieldError(surname);
            isValid = false;
        } else {
            markFieldSuccess(surname);
        }
        
        // Validate Age
        const age = document.getElementById('age');
        if (!age.value) {
            showError('ageError', 'Age is required');
            markFieldError(age);
            isValid = false;
        } else if (age.value < 1 || age.value > 120) {
            showError('ageError', 'Please enter a valid age (1-120)');
            markFieldError(age);
            isValid = false;
        } else {
            markFieldSuccess(age);
        }
        
        // Validate ID Number (South African ID format)
        const idNumber = document.getElementById('idNumber');
        const idRegex = /^[0-9]{13}$/;
        if (!idNumber.value) {
            showError('idNumberError', 'ID number is required');
            markFieldError(idNumber);
            isValid = false;
        } else if (!idRegex.test(idNumber.value)) {
            showError('idNumberError', 'Please enter a valid 13-digit ID number');
            markFieldError(idNumber);
            isValid = false;
        } else {
            markFieldSuccess(idNumber);
        }
        
        // Validate Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value) {
            showError('emailError', 'Email address is required');
            markFieldError(email);
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            markFieldError(email);
            isValid = false;
        } else {
            markFieldSuccess(email);
        }
        
        // Validate Phone Number (South African format)
        const phone = document.getElementById('phone');
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone.value) {
            showError('phoneError', 'Contact number is required');
            markFieldError(phone);
            isValid = false;
        } else if (!phoneRegex.test(phone.value)) {
            showError('phoneError', 'Please enter a valid 10-digit phone number');
            markFieldError(phone);
            isValid = false;
        } else {
            markFieldSuccess(phone);
        }
        
        // Validate Reason for Joining
        const reason = document.getElementById('reason');
        if (!reason.value.trim()) {
            showError('reasonError', 'Please tell us why you want to join this program');
            markFieldError(reason);
            isValid = false;
        } else if (reason.value.trim().length < 20) {
            showError('reasonError', 'Please provide more detail (at least 20 characters)');
            markFieldError(reason);
            isValid = false;
        } else {
            markFieldSuccess(reason);
        }
        
        // Validate Availability
        const availability = document.getElementById('availability');
        if (!availability.value) {
            showError('availabilityError', 'Please select your availability');
            markFieldError(availability);
            isValid = false;
        } else {
            markFieldSuccess(availability);
        }
        
        // Validate Privacy Consent
        const privacyConsent = document.getElementById('privacyConsent');
        if (!privacyConsent.checked) {
            showError('privacyConsentError', 'You must consent to our privacy policy to continue');
            markFieldError(privacyConsent);
            isValid = false;
        } else {
            markFieldSuccess(privacyConsent);
        }
        
        return isValid;
    }
    
    // Function to display error message for a specific field
    function showError(errorElementId, message) {
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    // Function to mark a field with error styling
    function markFieldError(field) {
        field.classList.add('error');
    }
    
    // Function to mark a field with success styling
    function markFieldSuccess(field) {
        field.classList.remove('error');
    }
    
    // Function to clear all error messages
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        // Remove error styling from all fields
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }
    
    // Function to process the program application
    function processProgramApplication() {
        // Get form data
        const formData = new FormData(programForm);
        const applicationData = {
            program: formData.get('selectedProgram'),
            firstName: formData.get('firstName'),
            surname: formData.get('surname'),
            age: formData.get('age'),
            idNumber: formData.get('idNumber'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            reason: formData.get('reason'),
            experience: formData.get('experience'),
            availability: formData.get('availability'),
            communicationConsent: formData.get('communicationConsent') === 'on'
        };
        
        // In a real application, you would send this data to a server
        // For demonstration, we'll just show a success message
        console.log('Program application submitted:', applicationData);
        
        // Show success message
        showApplicationSuccess(applicationData.program);
    }
    
    // Function to show success message after form submission
    function showApplicationSuccess(programName) {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Application Submitted Successfully!</h3>
            <p>Thank you for your interest in our <strong>${programName}</strong>.</p>
            <p>We have received your application and will contact you at the email address you provided within 3-5 business days.</p>
            <p>In the meantime, feel free to explore our other programs or contact us with any questions.</p>
        `;
        
        // Replace form with success message
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';
        modalBody.appendChild(successMessage);
        
        // Update modal header
        const modalHeader = document.querySelector('.modal-header h2');
        modalHeader.textContent = 'Application Submitted';
        
        // Remove close button and add new close button at bottom
        const closeModalBtn = document.querySelector('.close-modal');
        closeModalBtn.style.display = 'none';
        
        // Add close button at bottom
        const closeButton = document.createElement('button');
        closeButton.className = 'cta';
        closeButton.textContent = 'Close';
        closeButton.style.marginTop = '20px';
        closeButton.addEventListener('click', closeModal);
        
        modalBody.appendChild(closeButton);
        
        // Auto-close modal after 5 seconds
        setTimeout(() => {
            closeModal();
        }, 5000);
    }
    
    // REAL-TIME FORM VALIDATION
    // Add real-time validation for form fields as user types
    if (programForm) {
        const formFields = programForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            // Validate on blur (when user leaves the field)
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Remove error styling when user starts typing
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    const fieldName = this.name;
                    const errorElementId = `${fieldName}Error`;
                    const errorElement = document.getElementById(errorElementId);
                    
                    if (errorElement) {
                        errorElement.textContent = '';
                        this.classList.remove('error');
                    }
                }
            });
        });
    }
    
    // Function to validate individual field
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value;
        const errorElementId = `${fieldName}Error`;
        
        // Skip validation for optional fields if empty
        if (!field.required && !value) {
            return;
        }
        
        // Field-specific validation
        switch(fieldName) {
            case 'firstName':
            case 'surname':
                if (!value.trim()) {
                    showError(errorElementId, 'This field is required');
                    markFieldError(field);
                } else if (value.trim().length < 2) {
                    showError(errorElementId, 'Must be at least 2 characters');
                    markFieldError(field);
                } else {
                    markFieldSuccess(field);
                }
                break;
                
            case 'age':
                if (!value) {
                    showError(errorElementId, 'Age is required');
                    markFieldError(field);
                } else if (value < 1 || value > 120) {
                    showError(errorElementId, 'Please enter a valid age (1-120)');
                    markFieldError(field);
                } else {
                    markFieldSuccess(field);
                }
                break;
                
            case 'idNumber':
                const idRegex = /^[0-9]{13}$/;
                if (!value) {
                    showError(errorElementId, 'ID number is required');
                    markFieldError(field);
                } else if (!idRegex.test(value)) {
                    showError(errorElementId, 'Please enter a valid 13-digit ID number');
                    markFieldError(field);
                } else {
                    markFieldSuccess(field);
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    showError(errorElementId, 'Email address is required');
                    markFieldError(field);
                } else if (!emailRegex.test(value)) {
                    showError(errorElementId, 'Please enter a valid email address');
                    markFieldError(field);
                } else {
                    markFieldSuccess(field);
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[0-9]{10}$/;
                if (!value) {
                    showError(errorElementId, 'Contact number is required');
                    markFieldError(field);
                } else if (!phoneRegex.test(value)) {
                    showError(errorElementId, 'Please enter a valid 10-digit phone number');
                    markFieldError(field);
                } else {
                    markFieldSuccess(field);
                }
                break;
                
            case 'reason':
                if (!value.trim()) {
                    showError(errorElementId, 'Please tell us why you want to join this program');
                    markFieldError(field);
                } else if (value.trim().length < 20) {
                    showError(errorElementId, 'Please provide more detail (at least 20 characters)');
                    markFieldError(field);
                } else {
                    markFieldSuccess(field);
                }
                break;
                
            case 'availability':
                if (!value) {
                    showError(errorElementId, 'Please select your availability');
                    markFieldError(field);
                } else {
                    markFieldSuccess(field);
                }
                break;
                
            case 'privacyConsent':
                if (!field.checked) {
                    showError(errorElementId, 'You must consent to our privacy policy to continue');
                    markFieldError(field);
                } else {
                    markFieldSuccess(field);
                }
                break;
        }
    }
    
    // VOLUNTEER FORM VALIDATION
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateVolunteerForm()) {
                // Process volunteer application
                processVolunteerApplication();
            }
        });
    }
    
    // Donation functionality
    const donationButtons = document.querySelectorAll('.donation-btn');
    const customDonationBtn = document.getElementById('customDonationBtn');
    const donationFormContainer = document.getElementById('donationFormContainer');
    const donationForm = document.getElementById('donationForm');
    const cancelDonationBtn = document.getElementById('cancelDonation');
    const recurringDonationCheckbox = document.getElementById('recurringDonation');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('cardDetails');
    
    // Donation button handlers
    if (donationButtons.length > 0) {
        donationButtons.forEach(button => {
            button.addEventListener('click', function() {
                const amount = this.getAttribute('data-amount');
                const isRecurring = this.getAttribute('data-recurring') === 'true';
                
                document.getElementById('donationAmount').value = amount;
                document.getElementById('isRecurring').value = isRecurring;
                document.getElementById('customAmountGroup').style.display = 'none';
                
                if (isRecurring) {
                    recurringDonationCheckbox.checked = true;
                } else {
                    recurringDonationCheckbox.checked = false;
                }
                
                donationFormContainer.style.display = 'block';
                window.location.href = '#donate';
            });
        });
    }
    
    // Custom donation button
    if (customDonationBtn) {
        customDonationBtn.addEventListener('click', function() {
            document.getElementById('customAmountGroup').style.display = 'block';
            document.getElementById('donationAmount').value = 'custom';
            donationFormContainer.style.display = 'block';
            window.location.href = '#donate';
        });
    }
    
    // Cancel donation
    if (cancelDonationBtn) {
        cancelDonationBtn.addEventListener('click', function() {
            donationFormContainer.style.display = 'none';
            donationForm.reset();
        });
    }
    
    // Show/hide card details based on payment method
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', function() {
            if (this.value === 'credit-card' || this.value === 'debit-card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    }
    
    // Donation form submission
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateDonationForm()) {
                processDonation();
            }
        });
    }
    
    // ADOPTION PAGE FUNCTIONALITY
    const filterButtons = document.querySelectorAll('.filter-btn');
    const animalCards = document.querySelectorAll('.animal-card');
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    
    // Animal filter functionality
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter animals
                animalCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Adopt button handlers
    if (adoptButtons.length > 0) {
        adoptButtons.forEach(button => {
            button.addEventListener('click', function() {
                const animalName = this.getAttribute('data-animal');
                window.location.href = `contact.html?interest=adopt&animal=${encodeURIComponent(animalName)}`;
            });
        });
    }
    
    // CONTACT FORM HANDLING
    // Validates and processes the contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Basic validation - check required fields
            const email = document.getElementById('femail');
            const name = document.getElementById('fname');
            const consent = document.getElementById('consent');
            
            // Show error if required fields are empty
            if (!email.value || !name.value || !consent.checked) {
                alert('Please fill in all required fields and agree to be contacted.');
                return;
            }
            
            // In a real application, you would send data to a server here
            // For demonstration, we'll just show a confirmation message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset(); // Clear the form after submission
        });
    }
    
    // NEWSLETTER FORM HANDLING
    // Validates and processes newsletter signups
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const email = document.getElementById('newsletter-email');
            
            // Check if email field is empty
            if (!email.value) {
                alert('Please enter your email address.');
                return;
            }
            
            // Validate email format using regular expression
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message and form reset
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // TESTIMONIAL FORM HANDLING
    // Processes user-submitted testimonials on the About page
    const testimonialForm = document.getElementById('testimonialForm');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Clear previous errors
            clearTestimonialErrors();
            
            // Validate fields
            let isValid = true;
            
            const name = document.getElementById('name');
            const role = document.getElementById('role');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                showTestimonialError('name', 'Please enter your name');
                isValid = false;
            }
            
            if (!role.value.trim()) {
                showTestimonialError('role', 'Please enter your role');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showTestimonialError('message', 'Please share your story');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showTestimonialError('message', 'Please provide more details (at least 10 characters)');
                isValid = false;
            }
            
            if (isValid) {
                // Process form submission
                alert('Thank you for sharing your story! We will review it before publishing.');
                testimonialForm.reset();
            }
        });
        
        // CLEAR FORM BUTTON
        // Adds functionality to the clear form button
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                clearTestimonialErrors();
                testimonialForm.reset(); // Reset all form fields
            });
        }
    }
    
    // Function to clear testimonial form errors
    function clearTestimonialErrors() {
        const errorMessages = document.querySelectorAll('#testimonialForm .error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        const errorFields = document.querySelectorAll('#testimonialForm input.error, #testimonialForm textarea.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }
    
    // Function to show testimonial form errors
    function showTestimonialError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('error');
        
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    // SMOOTH SCROLLING
    // Enables smooth scrolling for anchor links within the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty anchors
            
            // Find the target element
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Smooth scroll to target with offset for fixed navigation
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // PREFILL CONTACT FORM
    // Automatically fills the subject field based on query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const interest = urlParams.get('interest');
    const animal = urlParams.get('animal');
    
    // Check if we're on the contact page and have an interest parameter
    if (interest && document.getElementById('fsubject')) {
        let subject = '';
        
        // Set appropriate subject based on interest type
        switch(interest) {
            case 'volunteer':
                subject = 'Volunteer Interest';
                break;
            case 'donate':
                subject = 'Donation Inquiry';
                break;
            case 'adopt':
                subject = `Adoption Interest - ${animal || 'General'}`;
                break;
            default:
                subject = 'General Inquiry';
        }
        
        // Prefill the subject field
        document.getElementById('fsubject').value = subject;
    }
    
    // ACTIVE NAVIGATION HIGHLIGHTING
    // Highlights the current page in the navigation menu
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    // Add active class to the current page's navigation link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Check if this link matches the current page
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // BACK TO TOP FUNCTIONALITY
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Volunteer form validation function
function validateVolunteerForm() {
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors('volunteerForm');
    
    // Required field validation
    const requiredFields = [
        'volunteerFirstName', 'volunteerSurname', 'volunteerAge', 'volunteerId',
        'volunteerEmail', 'volunteerPhone', 'volunteerAddress', 'volunteerExperience',
        'volunteerMotivation', 'emergencyName', 'emergencyRelationship', 'emergencyPhone'
    ];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showError(`${fieldId}Error`, 'This field is required');
            markFieldError(field);
            isValid = false;
        } else {
            markFieldSuccess(field);
        }
    });
    
    // Age validation
    const age = document.getElementById('volunteerAge');
    if (age.value && (age.value < 18 || age.value > 120)) {
        showError('volunteerAgeError', 'Volunteers must be 18 years or older');
        markFieldError(age);
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('volunteerEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        showError('volunteerEmailError', 'Please enter a valid email address');
        markFieldError(email);
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('volunteerPhone');
    const phoneRegex = /^[0-9]{10}$/;
    if (phone.value && !phoneRegex.test(phone.value)) {
        showError('volunteerPhoneError', 'Please enter a valid 10-digit phone number');
        markFieldError(phone);
        isValid = false;
    }
    
    // ID validation
    const idNumber = document.getElementById('volunteerId');
    const idRegex = /^[0-9]{13}$/;
    if (idNumber.value && !idRegex.test(idNumber.value)) {
        showError('volunteerIdError', 'Please enter a valid 13-digit ID number');
        markFieldError(idNumber);
        isValid = false;
    }
    
    // Availability validation
    const availability = document.getElementById('volunteerAvailability');
    if (!availability.value) {
        showError('volunteerAvailabilityError', 'Please select your availability');
        markFieldError(availability);
        isValid = false;
    }
    
    // Interests validation
    const interests = document.querySelectorAll('input[name="interests"]:checked');
    if (interests.length === 0) {
        showError('volunteerInterestsError', 'Please select at least one area of interest');
        isValid = false;
    }
    
    // Consent validation
    const consentFields = ['volunteerPrivacy', 'volunteerBackground', 'volunteerLiability'];
    consentFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.checked) {
            showError(`${fieldId}Error`, 'This consent is required');
            markFieldError(field);
            isValid = false;
        } else {
            markFieldSuccess(field);
        }
    });
    
    return isValid;
}

// Donation form validation function
function validateDonationForm() {
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors('donationForm');
    
    // Custom amount validation
    const donationAmount = document.getElementById('donationAmount').value;
    if (donationAmount === 'custom') {
        const customAmount = document.getElementById('customAmount');
        if (!customAmount.value || customAmount.value < 10) {
            showError('customAmountError', 'Please enter an amount of R10 or more');
            markFieldError(customAmount);
            isValid = false;
        }
    }
    
    // Donor information validation
    const donorFields = ['donorFirstName', 'donorSurname', 'donorEmail'];
    donorFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showError(`${fieldId}Error`, 'This field is required');
            markFieldError(field);
            isValid = false;
        } else {
            markFieldSuccess(field);
        }
    });
    
    // Email validation
    const email = document.getElementById('donorEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        showError('donorEmailError', 'Please enter a valid email address');
        markFieldError(email);
        isValid = false;
    }
    
    // Payment method validation
    const paymentMethod = document.getElementById('paymentMethod');
    if (!paymentMethod.value) {
        showError('paymentMethodError', 'Please select a payment method');
        markFieldError(paymentMethod);
        isValid = false;
    }
    
    // Card details validation if paying by card
    if (paymentMethod.value === 'credit-card' || paymentMethod.value === 'debit-card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
        cardFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                showError(`${fieldId}Error`, 'This field is required');
                markFieldError(field);
                isValid = false;
            } else {
                markFieldSuccess(field);
            }
        });
        
        // Basic card number validation
        const cardNumber = document.getElementById('cardNumber');
        const cardRegex = /^[0-9]{16}$/;
        const cleanCardNumber = cardNumber.value.replace(/\s/g, '');
        if (cardNumber.value && !cardRegex.test(cleanCardNumber)) {
            showError('cardNumberError', 'Please enter a valid 16-digit card number');
            markFieldError(cardNumber);
            isValid = false;
        }
        
        // Expiry date validation
        const expiryDate = document.getElementById('expiryDate');
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (expiryDate.value && !expiryRegex.test(expiryDate.value)) {
            showError('expiryDateError', 'Please enter a valid expiry date (MM/YY)');
            markFieldError(expiryDate);
            isValid = false;
        }
        
        // CVV validation
        const cvv = document.getElementById('cvv');
        const cvvRegex = /^[0-9]{3,4}$/;
        if (cvv.value && !cvvRegex.test(cvv.value)) {
            showError('cvvError', 'Please enter a valid CVV (3 or 4 digits)');
            markFieldError(cvv);
            isValid = false;
        }
    }
    
    return isValid;
}

// Process volunteer application
function processVolunteerApplication() {
    const formData = new FormData(document.getElementById('volunteerForm'));
    const volunteerData = {};
    
    for (let [key, value] of formData.entries()) {
        volunteerData[key] = value;
    }
    
    // Get selected interests
    const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
        .map(checkbox => checkbox.value);
    volunteerData.interests = interests;
    
    console.log('Volunteer application submitted:', volunteerData);
    
    // Show success message
    alert('Thank you for your volunteer application! We will contact you within 3-5 business days to discuss next steps.');
    document.getElementById('volunteerForm').reset();
}

// Process donation
function processDonation() {
    const formData = new FormData(document.getElementById('donationForm'));
    const donationData = {};
    
    for (let [key, value] of formData.entries()) {
        donationData[key] = value;
    }
    
    // Get donation amount
    if (donationData.amount === 'custom') {
        donationData.amount = document.getElementById('customAmount').value;
    }
    
    donationData.isRecurring = document.getElementById('recurringDonation').checked;
    
    console.log('Donation submitted:', donationData);
    
    // Show success message
    alert(`Thank you for your generous donation of R${donationData.amount}! Your support helps us continue our mission.`);
    document.getElementById('donationForm').reset();
    document.getElementById('donationFormContainer').style.display = 'none';
}

// Helper function to clear form errors
function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }
}

// Helper function to show error
function showError(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Helper function to mark field error
function markFieldError(field) {
    field.classList.add('error');
}

// Helper function to mark field success
function markFieldSuccess(field) {
    field.classList.remove('error');
}

// FORM ENHANCEMENTS
// Additional form validation and user experience improvements
function enhanceFormValidation() {
    // Add real-time validation feedback to form fields
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            // Add validation styling on blur (when user leaves field)
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.style.borderColor = 'red';
                } else {
                    this.style.borderColor = '';
                }
            });
            
            // Remove validation styling when user starts typing
            input.addEventListener('input', function() {
                if (this.value) {
                    this.style.borderColor = '';
                }
            });
        });
    });
}

// Initialize form enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', enhanceFormValidation);

// ACCESSIBILITY IMPROVEMENTS
// Adds keyboard navigation and screen reader support
function improveAccessibility() {
    // Add focus styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        /* Visible focus indicators for keyboard users */
        a:focus, button:focus, input:focus, textarea:focus {
            outline: 2px solid var(--accent-coral) !important;
            outline-offset: 2px;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            :root {
                --font-color: #000000;
                --bg: #FFFFFF;
            }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', improveAccessibility);