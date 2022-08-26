"use strict";
const burger = document.querySelector(".burger"),
   header = document.querySelector(".header"),
   headerAction = document.querySelector(".header__action"),
   body = document.querySelector("body");

window.addEventListener("load", () => {
   function qs(element) {
      let newEl = document.querySelector(element);
      if (newEl) return newEl;
   }
   function qa(element) {
      let newEl = document.querySelectorAll(element);
      if (newEl) return newEl;
   }

   // ! Burger
   if (burger) {
      body.addEventListener("click", burgerToggle);
      function burgerToggle(e) {
         if (e.target.closest(".burger")) {
            if (burger.classList.contains("active")) {
               closeBurger();
            } else {
               burger.classList.add("active");
               header.classList.add("active");
               headerAction.classList.add("active");
               body.classList.add("lock");
               actualizeHeight();
               window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
            }
         } else if (!e.target.closest(".burger") && !e.target.closest(".header__action-wrapper")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            headerAction.classList.remove("active");
            body.classList.remove("lock");
            closeBurger();
         }
      }
      function closeBurger() {
         //Обязательная дополнительная проверка
         if (burger.classList.contains("active")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            headerAction.classList.remove("active");
            body.classList.remove("lock");
            setTimeout(() => {
               qs(".header__action-wrapper").style.height = null;
            }, 1000);
            window.removeEventListener("scroll", closeBurger);
         }
      }

      function actualizeHeight(e) {
         const headerActionWrapper = qs(".header__action-wrapper");
         const headerActionBody = qs(".header__action-body");
         const wrapperHeight = headerActionWrapper.scrollHeight;
         const bodyHeight = headerActionBody.scrollHeight;
         const total = wrapperHeight + bodyHeight;
         if (headerAction.classList.contains("active")) {
            if (total >= window.innerHeight) {
               headerActionWrapper.style.height = "100%";
            } else {
               headerActionWrapper.style.height = wrapperHeight + bodyHeight + "px";
            }
         }
      }
   }

   // ! Header
   body.addEventListener("click", relocate);

   function relocate(e) {
      // if (e.target.closest("a").innerHTML == "Authorization") {
      //    document.location.href = "authorization.html";
      // }
   }

   // ! Spoiler.html
   if (qa(".spoiler")) {
      // ? Если нужно открыть только первый спойлер на странице. Можно прогнать циклом для остальных
      if (qs(".spoiler").classList.contains("opened")) {
         let spoilerWrapper = qa(".spoiler__wrapper")[0];
         spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
      }

      body.addEventListener("click", toggleSpoiler);

      function toggleSpoiler(e) {
         if (e.target.closest(".spoiler__preview")) {
            e.target.closest(".spoiler").classList.toggle("opened");
            let spoilerWrapper = e.target.closest(".spoiler__preview").nextElementSibling;
            if (!e.target.closest(".spoiler").classList.contains("opened")) {
               spoilerWrapper.style.height = null;
            } else {
               spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
            }
         }
      }
   }

   // ! index.html
   if (qs("body.home")) {
      // Move graphic
      window.addEventListener("resize", moveBlock);
      moveBlock();
      function moveBlock(e) {
         if (window.innerWidth <= 768) {
            qs(".hello-h2__title").after(qs(".biography__graphic"));
         } else if (window.innerWidth > 768) {
            qs(".biography__container").prepend(qs(".biography__graphic"));
         }
      }

      // swiperBiography
      const swiperBiography = new Swiper(".biography__swiper", {
         spaceBetween: 22,
         slidesPerView: 2.47,
         slideToClickedSlide: true,
         breakpoints: {
            460: {
               slidesPerView: 2.75,
               spaceBetween: 28,
            },
            769: {
               slidesPerView: 2,
            },
            1000: {
               slidesPerView: 2.5,
               spaceBetween: 35,
            },
            1200: {
               slidesPerView: 3,
               spaceBetween: 9,
            },
         },
      });

      // swiperCards
      const swiperNft = new Swiper(".nft __swiper", {
         spaceBetween: 22,
         slidesPerView: 2.47,
         slideToClickedSlide: true,
         breakpoints: {
            460: {
               slidesPerView: 2.75,
               spaceBetween: 28,
            },
            769: {
               slidesPerView: 2,
            },
            1000: {
               slidesPerView: 2.5,
               spaceBetween: 35,
            },
            1200: {
               slidesPerView: 3,
               spaceBetween: 9,
            },
         },
      });
   }
});
