import { useEffect } from 'react';

const useUIInteractions = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const elementToggleFunc = (elem: Element | null) => {
        if (elem) elem.classList.toggle('active');
      };

      // === SIDEBAR TOGGLE ===
      const setupSidebarToggle = () => {
        const sidebar = document.querySelector('[data-sidebar]');
        const sidebarBtn = document.querySelector('[data-sidebar-btn]');
        const handler = () => elementToggleFunc(sidebar);
        sidebarBtn?.addEventListener('click', handler);
      };

      // === MODAL TESTIMONIALS ===
      const setupTestimonialsModal = () => {
        const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
        const modalContainer = document.querySelector('[data-modal-container]') as HTMLElement;
        const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
        const overlay = document.querySelector('[data-overlay]');
        const modalImg = document.querySelector('[data-modal-img]') as HTMLImageElement;
        const modalTitle = document.querySelector('[data-modal-title]') as HTMLElement;
        const modalText = document.querySelector('[data-modal-text]') as HTMLElement;

        const toggleModal = () => {
          modalContainer?.classList.toggle('active');
          overlay?.classList.toggle('active');
        };

        testimonialsItems.forEach((item) => {
          item.addEventListener('click', () => {
            const avatar = item.querySelector('[data-testimonials-avatar]') as HTMLImageElement;
            const title = item.querySelector('[data-testimonials-title]');
            const text = item.querySelector('[data-testimonials-text]');

            if (avatar && title && text && modalImg && modalTitle && modalText) {
              modalImg.src = avatar.src;
              modalImg.alt = avatar.alt;
              modalTitle.innerHTML = title.innerHTML;
              modalText.innerHTML = text.innerHTML;
              toggleModal();
            }
          });
        });

        modalCloseBtn?.addEventListener('click', toggleModal);
        overlay?.addEventListener('click', toggleModal);
      };

      // === CUSTOM SELECT & FILTER ===
      const setupCustomSelectAndFilter = () => {
        const select = document.querySelector('[data-select]');
        const selectItems = document.querySelectorAll('[data-select-item]');
        const selectValue = document.querySelector('[data-select-value]');
        const filterBtns = document.querySelectorAll('[data-filter-btn]');
        const filterItems = document.querySelectorAll('[data-filter-item]');

        const filterFunc = (selectedValue: string) => {
          filterItems.forEach((item) => {
            const category = item.getAttribute('data-category');
            if (selectedValue === 'all' || selectedValue === category) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        };

        select?.addEventListener('click', () => elementToggleFunc(select));

        selectItems.forEach((item) => {
          item.addEventListener('click', () => {
            const value = item.innerHTML.toLowerCase();
            if (selectValue) selectValue.innerHTML = item.innerHTML;
            elementToggleFunc(select);
            filterFunc(value);
          });
        });

        let lastClickedBtn: Element | null = filterBtns[0];
        filterBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const value = btn.innerHTML.toLowerCase();
            if (selectValue) selectValue.innerHTML = btn.innerHTML;
            filterFunc(value);
            lastClickedBtn?.classList.remove('active');
            btn.classList.add('active');
            lastClickedBtn = btn;
          });
        });
      };

      // === FORM VALIDATION ===
      const setupFormValidation = () => {
        const form = document.querySelector('[data-form]') as HTMLFormElement;
        const formInputs = document.querySelectorAll('[data-form-input]');
        const formBtn = document.querySelector('[data-form-btn]') as HTMLButtonElement;

        formInputs.forEach((input) => {
          input.addEventListener('input', () => {
            if (form && form.checkValidity()) {
              formBtn?.removeAttribute('disabled');
            } else {
              formBtn?.setAttribute('disabled', '');
            }
          });
        });
      };

      // === PAGE NAVIGATION ===
      const setupPageNavigation = () => {
        const navigationLinks = document.querySelectorAll('[data-nav-link]');
        const pages = document.querySelectorAll('[data-page]');

        navigationLinks.forEach((link) => {
          link.addEventListener('click', () => {
            const target = link.innerHTML.toLowerCase();

            pages.forEach((page) => {
              const isActive = page.getAttribute('data-page') === target;
              page.classList.toggle('active', isActive);
            });

            navigationLinks.forEach((navLink) => {
              const isActive = navLink.innerHTML.toLowerCase() === target;
              navLink.classList.toggle('active', isActive);
            });

            window.scrollTo(0, 0);
          });
        });
      };

      // Chamada de cada função modularizada
      setupSidebarToggle();
      setupTestimonialsModal();
      setupCustomSelectAndFilter();
      setupFormValidation();
      setupPageNavigation();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);
};

export default useUIInteractions;
