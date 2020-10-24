(function () {
   let popupData = null;

   const cssStyles = `
   .popup-banner-overlay.modal-container.mostrar {
      display: flex;
   }
   
   .popup-banner-overlay.modal-container {
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,.8);
   
      position: fixed;
      top: 0px;
      left: 0px;
   
      z-index: 2000;
   
      display: none;
      justify-content: center;
      align-items: center;
   }
   
   @keyframes modal {
      from {
         opacity: 0;
         transform: translate3d(0, -60px, 0);
      }
      to {
         opacity: 1;
         transform: translate3d(0, 0, 0);
      }
   }
   
   .popup-banner-overlay .mostrar .modal {
      animation: modal .3s;
   }
   
   .popup-banner-overlay .modal {
      
      width: 50%;
   }
   
   .popup-banner-overlay .modal img {
      width: 100%;
   }
   
   .popup-banner-overlay .botao-fechar {
      position: absolute;
      top: 25px; 
      right: 50px; 
   
      background-color: transparent;
      border: none;
      color: white;
      font-size: large;
   
      cursor: pointer;
   }
   
   @media (max-width: 768px) {
      .popup-banner-overlay .modal {
         width: 95%;
      }
   
      .popup-banner-overlay .botao-fechar {
         right: 10px;
         top: 10px;
         font-size: 1.5rem;
      }
   }
   `;

   async function setupPopup () {
      try {
         popupData = await checkLinkValidity();
      
         if (popupData.redirect_url != undefined || popupData.image_url != undefined) {
            
            if (getCookie('PublicityPopUp') == popupData.name) throw '';
   
            var body = document.body;
      
            let stylesTag = document.createElement('style');
            stylesTag.innerHTML= cssStyles;
            stylesTag.innerHTML= cssStyles;
            body.appendChild(stylesTag); 

            let divContainer = document.createElement('div'); 
            divContainer.classList.add('popup-banner-overlay');
            divContainer.classList.add('modal-container');
            divContainer.id = 'promotion-modal';
      
            body.appendChild(divContainer); 
      
            let botaoFechar = document.createElement('button');
            botaoFechar.textContent = "x";
            botaoFechar.classList.add('botao-fechar');
            botaoFechar.id = 'fechar';
      
            divContainer.appendChild(botaoFechar);
      
            let div = document.createElement('div'); 
            div.classList.add('modal');
      
            divContainer.appendChild(div);
      
            var img = document.createElement('img');
            img.src = popupData.image_url;
            var a = document.createElement('a');
            a.href = popupData.redirect_url;
      
            div.appendChild(a);
            a.appendChild(img);
      
            iniciateModal('promotion-modal');
      
         } else {
            throw 'erro';
         }
      } catch (error) {
         console.log(error);
      }
   } 
   
   async function checkLinkValidity() {
      try {
         let response = await fetch('https://gestao.esteticaexperts.com.br/api/config/popup');
         
         let data = await response.json();
   
         return data;
      } catch (error) {
         return false;
      }
   }
   
   function createCookie(name) {
      if (name == undefined) {
         return "";
      } else {
         document.cookie += `PublicityPopUp=${name} ;`;
         return document.cookie;
      }
   }
   
   function iniciateModal(modalID) {
      const modal = document.getElementById(modalID);
      if (modal) {
         modal.classList.add('mostrar');
         modal.addEventListener('click', (e) => {
            if (e.target.id == modalID || e.target.id == 'fechar') {
               modal.classList.remove('mostrar');
               createCookie(popupData.name);
            }
         });
      }
   }
   
   function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
   }
   
   setupPopup();
})();