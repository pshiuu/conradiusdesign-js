
let typeSplit;

// Split the text
function runSplit() {
  typeSplit = new SplitType(".bento-text-block", {
    types: "lines, words"
  });

  // Append masks to all words
  $(".word").append("<div class='line-mask'></div>");

  // Remove masks from .highlight-font words
  $(".highlight-font").each(function () {
    $(this).find(".line-mask").remove(); // Remove masks for highlight-font words
  });

  createAnimation();
}

runSplit();

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Create staggered animation
function createAnimation() {
  // Select masks for non-highlight words only
  let allMasks = $(".word").not(".highlight-font").map(function () {
    return $(this).find(".line-mask");
  }).get();

  let texttl = gsap.timeline({
    scrollTrigger: {
      trigger: ".bento-text-block",
      start: "top center",
      end: "bottom center",
      scrub: 1
    }
  });

  // Animate the masks to disappear
  texttl.to(allMasks, {
    width: "0%",
    duration: 1,
    stagger: 0.5
  });
}

    gsap.from('.slide', {
      scrollTrigger: {
        trigger: '.services_right-col',
        start: '-40% top',
        end: '80% top',
        scrub: true,
        toggleActions: 'restart none reverse',
      },
      x: '+=5rem',
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power4.out',
    });
  

 document.addEventListener("DOMContentLoaded", () => {
  const projekte = new Swiper('.swiper.is-projekte', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    navigation: {
      nextEl: '.swiper-btn.is-next',
      prevEl: '.swiper-btn.is-back',
    },
    breakpoints: {
      768: {
        slidesPerView: 1, // On smaller screens, show 1 slide
      },
      1024: {
        slidesPerView: 1.5, // On larger screens, show 1.5 slides
      },
    },
  });
});


gsap.to('.section_services', {
  scale: 1,
  borderRadius: '0',
  ease: 'none',
  scrollTrigger: {
    trigger: '.section_services',
    start: 'top 80%',
    end: 'top 30%',
    scrub: true,
  },
});
gsap.to('.section_conradius', {
  scale: 0.9,
  borderRadius: '1rem',
  ease: 'none',
  scrollTrigger: {
    trigger: '.section_projekte',
    start: 'top bottom',
    end: 'top center',
    scrub: true,
  },
})


$(document).ready(function() {
  // Get all the FAQ items
  const faqItems = document.querySelectorAll('.faq-col-item');

  // Attach click event listeners to each FAQ item
  faqItems.forEach(faqItem => {
    const plusIcon = faqItem.querySelector('.plus-icon');
    const plusMovingLine = faqItem.querySelector('.plus-moving-line');
    const faqPopup = faqItem.querySelector('.faq-popup');
    const faqHeading = faqItem.querySelector('.faq-heading');
    const faqAnswer = faqItem.querySelector('.faq-answer');
    let isExpanded = false;

    faqItem.addEventListener('click', () => {
      if (window.innerWidth <= 568) {
        if (!isExpanded) {
          // Hide all other FAQ items
          faqItems.forEach(item => {
            if (item !== faqItem) {
              item.style.display = 'none';
            }
          });

          // Expand the clicked FAQ item
          faqItem.classList.add('expanded');
          gsap.to(faqAnswer, { duration: 0.3, height: 'auto' });
          gsap.set(faqAnswer, { overflow: 'visible' });

          // Rotate plus-moving-line to 0deg
          gsap.to(plusMovingLine, { duration: 0.3, rotation: '0deg' });

          isExpanded = true;
        } else {
          // Show all FAQ items
          faqItems.forEach(item => {
            item.style.display = 'block';
          });

          // Collapse the clicked FAQ item
          faqItem.classList.remove('expanded');
          gsap.to(faqAnswer, { duration: 0.3, height: '0px' });
          gsap.set(faqAnswer, { overflow: 'hidden' });

          // Rotate plus-moving-line back to 90deg
          gsap.to(plusMovingLine, { duration: 0.3, rotation: '90deg' });

          isExpanded = false;
        }
      } else {
        // For screens larger than 568px, retain the previous behavior
        const isExpanded = faqItem.classList.contains('expanded');
  
        // Reset the state of all FAQ items
        faqItems.forEach(item => {
          item.classList.remove('expanded');
          gsap.to(item.querySelector('.plus-moving-line'), { duration: 0.3, rotation: '90deg' });
          gsap.set(item, { background: '' });
          gsap.set(item.querySelector('.faq-heading'), { marginBottom: '' });
          gsap.set(item.querySelector('.faq-answer'), { height: '' });
          gsap.set(item, { filter: 'none' }); // Remove the blur effect
        });
  
        if (!isExpanded) {
          // Expand the clicked FAQ item
          faqItem.classList.add('expanded');
          gsap.to(faqItem.querySelector('.plus-moving-line'), { duration: 0.3, rotation: '0deg' });
          gsap.set(faqItem, { background: 'rgba(14, 14, 14, 0.75)' });
          gsap.set(faqHeading, { marginBottom: '1.5rem' });
          gsap.to(faqItem, { duration: 0.3, y: '-10%' });
          gsap.to(faqAnswer, { duration: 0.3, height: 'auto' });
  
          // Apply blur effect to other FAQ items
          faqItems.forEach(item => {
            if (item !== faqItem) {
              gsap.set(item, { filter: 'blur(20px)' });
            }
          });
        } else {
          gsap.to(faqItem.querySelector('.plus-moving-line'), { duration: 0.3, rotation: '90deg' });
          gsap.to(faqItem, { duration: 0.3, y: '0%' });
  
          // Remove blur effect from other FAQ items
          faqItems.forEach(item => {
            if (item !== faqItem) {
              gsap.set(item, { filter: 'none' });
            }
          });
        }
      }
    });
  });
});

$(function(){
  $('#email-form-multi').ebcaptcha(); //Add this ID to your Form, or replace this ID with your Form ID
});

(function($){

	jQuery.fn.ebcaptcha = function(options){

		var element = this; 
		var input = this.find('#captchainput'); // Add this ID to your input field which user will use to answer the question
		var label = this.find('#captchatext'); // Add this ID to the field label -- this will have the maths question
				$(element).find('input[type=submit]').attr('disabled','disabled'); 

		var randomNr1 = 0; 
		var randomNr2 = 0;
		var totalNr = 0;


		randomNr1 = Math.floor(Math.random()*10);
		randomNr2 = Math.floor(Math.random()*10);
		totalNr = randomNr1 + randomNr2;
		var texti = "Was ist "+randomNr1+" + "+randomNr2;
		$(label).text(texti);
		
	
		$(input).keyup(function(){

			var nr = $(this).val();
			if(nr==totalNr)
			{
				$(element).find('input[type=submit]').removeAttr('disabled');				
			}
			else{
				$(element).find('input[type=submit]').attr('disabled','disabled');
			}
			
		});

		$(document).keypress(function(e)
		{
			if(e.which==13)
			{
				if((element).find('input[type=submit]').is(':disabled')==true)
				{
					e.preventDefault();
					return false;
				}
			}

		});

	};

})(jQuery);

  document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const backBtns = document.querySelectorAll(".back-btn");
    const submitBtn = document.querySelector(".submit-btn");
    let currentStep = 0;

    const showStep = (index) => {
      gsap.to(steps[currentStep], {
        duration: 0.5,
        opacity: 0,
        y: -50,
        display: "none",
        onComplete: () => {
          steps[currentStep].classList.add("hidden");
          currentStep = index;
          steps[currentStep].classList.remove("hidden");
          gsap.fromTo(
            steps[currentStep],
            { opacity: 0, y: 50, display: "flex" },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        },
      });
    };

    const validateStep = (stepIndex) => {
      const step = steps[stepIndex];
      const inputs = step.querySelectorAll(".form-input[required]");
      const ratioGroups = step.querySelectorAll(".ratios, .pages-ratio-warp");
      let isValid = true;

      // Validate text inputs and email format
      inputs.forEach((input) => {
        const pattern = input.getAttribute("pattern");
        const type = input.getAttribute("type");

        if (!input.value.trim() || (pattern && !new RegExp(pattern).test(input.value)) || (type === "email" && !validateEmail(input.value))) {
          isValid = false;
          input.classList.add("input-error");
        } else {
          input.classList.remove("input-error");
        }
      });

      // Validate radio button groups
      ratioGroups.forEach((group) => {
        const radios = group.querySelectorAll("input[type='radio']");
        const isSelected = Array.from(radios).some((radio) => radio.checked);
        if (!isSelected) {
          isValid = false;
          group.querySelectorAll(".radio_button, .pages-btn").forEach((btn) => {
            btn.classList.add("input-error");
          });
        } else {
          group.querySelectorAll(".radio_button, .pages-btn").forEach((btn) => {
            btn.classList.remove("input-error");
          });
        }
      });

      return isValid;
    };

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
          showStep(currentStep + 1);
        }
      });
    });

    backBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        showStep(currentStep - 1);
      });
    });

    // Add validation on hover over the submit button
    submitBtn?.addEventListener("mouseover", () => {
      validateStep(currentStep);
    });

    // Remove the error class when the user interacts
    document.querySelectorAll(".form-input").forEach((input) => {
      input.addEventListener("input", () => {
        input.classList.remove("input-error");
      });
    });

    document.querySelectorAll("input[type='radio']").forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const parentGroup = radio.closest(".ratios, .pages-ratio-warp");
        if (parentGroup) {
          parentGroup.querySelectorAll(".radio_button, .pages-btn").forEach((btn) => {
            btn.classList.remove("input-error");
          });
        }
      });
    });

    showStep(currentStep);
  });


