<template lang="pug">
  div
    .minsport__block
      p.minsport__block-title Проверьте доступность жилья на вторичном рынке для программы Семейная ипотека
      .minsport__wr-search-field(ref="inputSearchWrapper")
        .select-list__wrapper.search-family-mortgage__wrapper-input-search.js--only-mobile-fixed(ref="selectListWrapper")
          .select__background(
            ref="windowBackground"
            @click="closeList"
          )
          .input-field-wrapper.js--search-family-mortgage-mask(
            v-show="!desctop_input_searh"
            ref="inputSearch"
            @focusin="focusIn"
            @focusout="focusOut"
          )
            input(
              type="text"
              :placeholder="placeholder"
              :value="inpValue"
              @keyup="keyUpField"
            )
            .input-field-wrapper__input-clear.js--clear-calc-tax(
              @click="clearField" ref="clearInput"
            )
          .input-field-wrapper.mobile-searh.js--search-family-mortgage-mask(
            v-show="desctop_input_searh"
            @click="openMobileList"
          )
            p(
              :class="inpValueMobileClick!==placeholder?'active':''"
            ) {{inpValueMobileClick}}

          .minsport__container-mobile.select-list__selection-window.modal-special-styles.js--openlist-body(
            ref="selectList"
            :class="screenWidth > 480&&request_result!==null&&request_result.code>=400?'error-dn':screenWidth > 480&&resultDaData.length===0?'error-dn':''"
            
          )
            

            .select-list__head
              p Название города
              .select-list__head-close(@click="closeList")
                svg(width='10', height='10', viewbox='0 0 10 10', fill='none', xmlns='http://www.w3.org/2000/svg')
                  path(fill-rule='evenodd', clip-rule='evenodd', d='M0.209209 0.209209C0.488155 -0.0697365 0.940416 -0.0697365 1.21936 0.209209L5 3.98985L8.78064 0.209209C9.05958 -0.0697365 9.51184 -0.0697365 9.79079 0.209209C10.0697 0.488155 10.0697 0.940416 9.79079 1.21936L6.01015 5L9.79079 8.78064C10.0697 9.05958 10.0697 9.51184 9.79079 9.79079C9.51184 10.0697 9.05958 10.0697 8.78064 9.79079L5 6.01015L1.21936 9.79079C0.940416 10.0697 0.488155 10.0697 0.209209 9.79079C-0.0697365 9.51184 -0.0697365 9.05958 0.209209 8.78064L3.98985 5L0.209209 1.21936C-0.0697365 0.940416 -0.0697365 0.488155 0.209209 0.209209Z', fill='#252628')

            .input-field-wrapper__mobile-container-input(v-show="desctop_input_searh")
              .input-field-wrapper.js--search-family-mortgage-mask-mobile(
                @focusin="focusIn"
                @focusout="focusOut"
              )
                input(
                  :placeholder="placeholder"
                  :value="inpValue"
                  type="text"
                  @focus="onInputFocus"
                  @keyup="keyUpField"
                )
                .input-field-wrapper__input-clear.js--clear-calc-tax(
                  @click="clearField" ref="clearInputMobile"
                )
            .select-list__wr-search(ref="selectListSearch")
              .select-list__search-item(
                v-for="item in resultDaData"
                :data-town="item.name"
                :data-oktmo="item.oktmo"
                @click="selectItemTown"
              )
                p {{item.name}}

              .search-family-mortgage__block-result.select-list__search-item(
                v-if="screenWidth<=480&&request_result!==null&&request_result.code>=400"
              )
                .search-family-mortgage__block-result-icon
                  svg(xmlns='http://www.w3.org/2000/svg', width='24', height='24', fill='none')
                    path(fill-rule='evenodd', clip-rule='evenodd', d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z', fill='#de4a2a')
                    path(fill-rule='evenodd', clip-rule='evenodd', d='M12 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z', fill='#de4a2a')
                    path(d='M13 18a1 1 0 11-2 0 1 1 0 012 0z', fill='#de4a2a')
                p {{request_result.description}}


        .btn_s.black.disabled(
          v-if="!btn_active || (request_result!==null&&request_result.code>=400)"
          :class="preload_btn===true?'submitting':''"
        ) Проверить
        .btn_s.black(
          v-else
          @click="sendingResult"
          ref="btnSend"
          :class="preload_btn===true?'submitting':''"
        ) Проверить

    .minsport__container-result
      .mortgage-surveys__final-block-refusal(v-if="request_result!==null && request_result.code===200")
        .search-family-mortgage__block-result
          .search-family-mortgage__block-result-icon
            svg(xmlns='http://www.w3.org/2000/svg', width='24', height='24', viewbox='0 0 24 24', fill='none')
              path(fill-rule='evenodd', clip-rule='evenodd', d='M15.663 3.77342C13.8902 2.98352 11.9096 2.78783 10.0166 3.21555C8.12351 3.64326 6.41942 4.67145 5.15845 6.14678C3.89749 7.62211 3.14721 9.46552 3.01951 11.4021C2.89181 13.3387 3.39354 15.2646 4.44987 16.8928C5.50619 18.5209 7.06051 19.764 8.88102 20.4365C10.7015 21.1091 12.6907 21.1752 14.5518 20.6249C16.413 20.0746 18.0464 18.9375 19.2084 17.3831C20.3705 15.8286 20.9989 13.9402 21 11.9994V11.08C21 10.5277 21.4477 10.08 22 10.08C22.5523 10.08 23 10.5277 23 11.08V12C22.9986 14.3721 22.2305 16.6807 20.8103 18.5806C19.39 20.4804 17.3936 21.8703 15.1189 22.5428C12.8442 23.2154 10.413 23.1346 8.18792 22.3126C5.96285 21.4906 4.06312 19.9713 2.77206 17.9813C1.48099 15.9914 0.86777 13.6374 1.02384 11.2705C1.17992 8.90358 2.09693 6.65052 3.63811 4.84734C5.17929 3.04416 7.26206 1.78748 9.57581 1.26472C11.8896 0.74196 14.3103 0.981129 16.477 1.94656C16.9815 2.17134 17.2082 2.76252 16.9834 3.26699C16.7587 3.77146 16.1675 3.9982 15.663 3.77342ZM22.7068 3.29253C23.0975 3.68286 23.0978 4.31602 22.7075 4.70674L12.7075 14.7167C12.52 14.9044 12.2656 15.0099 12.0003 15.01C11.735 15.0101 11.4805 14.9047 11.2929 14.7171L8.2929 11.7171C7.90237 11.3266 7.90237 10.6934 8.2929 10.3029C8.68342 9.91236 9.31659 9.91236 9.70711 10.3029L11.9997 12.5954L21.2925 3.29323C21.6829 2.90251 22.316 2.9022 22.7068 3.29253Z', fill='#82BF00')
          p.mortgage-surveys__final-attention.success {{request_result.description}}

      .mortgage-surveys__final-block-refusal(v-if="request_result!==null && request_result.code!==200&&(request_result.code<400)")
        .search-family-mortgage__block-result
            .search-family-mortgage__block-result-icon
              svg(xmlns='http://www.w3.org/2000/svg', width='24', height='24', fill='none')
                path(fill-rule='evenodd', clip-rule='evenodd', d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z', fill='#EEA20F')
                path(fill-rule='evenodd', clip-rule='evenodd', d='M12 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z', fill='#EEA20F')
                path(d='M13 18a1 1 0 11-2 0 1 1 0 012 0z', fill='#EEA20F')
            p.mortgage-surveys__final-attention.error {{request_result.description}}
      .mortgage-surveys__final-block-refusal(v-if="request_result!==null && (request_result.code>=400)")
        .search-family-mortgage__block-result
          .search-family-mortgage__block-result-icon
            svg(xmlns='http://www.w3.org/2000/svg', width='24', height='24', fill='none')
              path(fill-rule='evenodd', clip-rule='evenodd', d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z', fill='#de4a2a')
              path(fill-rule='evenodd', clip-rule='evenodd', d='M12 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z', fill='#de4a2a')
              path(d='M13 18a1 1 0 11-2 0 1 1 0 012 0z', fill='#de4a2a')
          p.mortgage-surveys__final-attention.error {{request_result.description}}

    #yandex-captcha-family-mortgage.captcha-element

</template>
<script>
import Storage from '../development-tools/state.vue';
import bodyLockMobileFilter from '../../redesign-site/body-lock-mobile-filter.js';
import bodyUnlockMobileFilter from '../../redesign-site/body-unlock-mobile-filter.js';
import windowResizeDropDown from '../../TemplateScript/window-resize-drop-down.js';
import vComponentSuccess from './v-component-success.vue';
import vComponentFailureNotFound from './v-component-failure-not-found.vue';
import vComponentFailureOtherError from './v-component-failure-other-error.vue';
import IMask from 'imask';
let maskInput;
let maskInputMobile;

export default {
  name: 'v-component-v-component-search-family-mortgage',
  data(){
    return {
      placeholder:'Введите название города',
      inpValue:'',
      inpValueMobileClick:'',
      // btn_active:false, //убрать
      oktmo:null,
      input_errors:false,
      array_errors:[
        {
          wrong_language:'недопустимый символ для ввода данных'
        }
      ],
      error_text:'',
      screenWidth : window.innerWidth,
      screenHeight: window.innerHeight,
      desctop_input_searh:false,
      timeout:null,
      captcha_id:null,
      flag:0,
      visualViewportHandler: null,
      isFullScreen: false,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

      scrollPosition:0,
    }
  },
  methods:{

    
  onInputFocus() {
      if (this.isMobile) {
       
      }
    },

    openMobileList(el){
      const element = el.currentTarget;
      bodyLockMobileFilter(this.$refs.selectListWrapper);
      this.$refs.selectListWrapper.classList.add('open')
      
      // Добавляем обработчики
      this.$nextTick(() => {
        this.updateModalHeight();
        
        // Добавляем обработчики
        window.addEventListener('resize', this.updateModalHeight);
        if (window.visualViewport) {
          window.visualViewport.addEventListener('resize', this.updateModalHeight);
        }
      });
    },




  updateModalHeight() {
    // Задержка для корректного определения высоты после анимации
    setTimeout(() => {
      const modal = this.$refs.selectList;
      if (!modal) return;
      
      // Сбрасываем высоту для динамического расчета
      modal.style.height = '';
      
      // Получаем актуальную высоту видимой области
      const visualHeight = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
      
      // Устанавливаем минимальную высоту
      modal.style.minHeight = `${visualHeight}px`;
    }, 300);
  },

  handleInputFocus() {
    // Дополнительная проверка для Android
    if (/android/i.test(navigator.userAgent)) {
      setTimeout(this.updateModalHeight, 500);
    }
  },
  
  handleInputBlur() {
    // Возвращаем исходную высоту
    this.updateModalHeight();
  },

  closeList(el){
      this.$refs.selectListWrapper.classList.remove('open')
      this.closeBlock()
      bodyUnlockMobileFilter(this.$refs.selectListWrapper)
      window.removeEventListener('resize', this.updateModalHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', this.updateModalHeight);
      }
      this.$refs.selectList.querySelector('.js--search-family-mortgage-mask-mobile input').removeEventListener('focus', this.handleInputFocus);
      this.$refs.selectList.querySelector('.js--search-family-mortgage-mask-mobile input').removeEventListener('blur', this.handleInputBlur);
    },












    
    
    closeBlock() {
      
    },
  






    captchaInit() {
      this.captcha_id = window.smartCaptcha.render('yandex-captcha-family-mortgage', {
        sitekey: conf.smartcaptcha_key,
        invisible: true,
        callback: (token) => {
          this.sendingResultToApi(token)
        },
      });
    },
    sendingResult(){
      if (this.btn_active){
        Storage.dispatch('ActionStandingButton')
        Storage.dispatch('ActionButtonActive',false)
        this.captchaInit();
        let recaptchaKey = null;
        if(typeof conf !== 'undefined'){
          recaptchaKey = conf.smartcaptcha_key
        }
        if ((typeof recaptchaKey !== 'undefined') && recaptchaKey!==null) {
          window.smartCaptcha.execute(this.captcha_id);
        }
      }
    },
    sendingResultToApi(token){
      this.$refs.selectListWrapper.classList.remove('open')
      this.closeBlock()
      Storage.dispatch('ActionGetResult',[this.oktmo,token])
    },
    
    liveSearch(el){

      // const element = el.target
      // this.inpValue = element.value;

      // this.inpValue=this.inpValue.trim()
      // if(this.inpValue.length >0&&this.inpValue!==''){
      //   this.$refs.clearInput.classList.add('active')
      // }
      // else if(this.inpValue.length ===0) {
      //   this.$refs.clearInput.classList.remove('active')
      // }
      //
      // if (element.value.length >25){
      //   element.value=element.value.substring(0,25)
      // }
      // if (this.inpValue.length >3){
      //   Storage.dispatch('ActionGetDaData',this.inpValue)
      // }




      // const start = element.selectionStart
      // const end = element.selectionEnd
      // const NewValue = element.value.replace(/[^A-Za-za-zА-Яа-я-]/g,'');
      // if(element.value!==NewValue){
      //   element.value = NewValue
      //   element.setSelectionRange(
      //     Math.min(start, NewValue.length),
      //     Math.min(end, NewValue.length)
      //   )
      // }



      // if(this.inpValue.match(/^[а-яёa-z0-9_\-"'.№«» ]+$/i)){
      //   element.closest('.js--search-family-mortgage-mask').classList.remove('error')
      // }
      // else if(!this.inpValue.match(/^[а-яёa-z0-9_\-"'.№«» ]+$/i)&&this.inpValue.length!==0){
      //   element.closest('.js--search-family-mortgage-mask').classList.add('error')
      // }
      // if(this.inpValue.length>0){
      //   this.$refs.inputSearch.classList.add('active-input')
      // }
      // else {
      //   this.$refs.inputSearch.classList.remove('active-input')
      //   Storage.dispatch('ActionNullQueryResult')
      // }
      // if (this.inpValue.length >=10&&this.inpValue.length<=12&&!isNaN(this.inpValue)&&this.inpValue.match(/^[а-яёa-z0-9_\-"'.№«» ]+$/i)){
      //   this.btn_active=true
      // }
      // else if (this.inpValue.length <10||this.inpValue.length>12&&!isNaN(this.inpValue)){
      //   this.btn_active=false
      // }
      // if (this.inpValue.length >=4&&isNaN(this.inpValue)&&this.inpValue.match(/^[а-яёa-z0-9_\-"'.№«» ]+$/i)){
      //   this.btn_active=true
      // }
      // else if(this.inpValue.length <4&&isNaN(this.inpValue)){
      //   this.btn_active=false
      // }
    },
    inputValidation(){
      let key_word = this
      const input_status = document.querySelectorAll('.js--search-family-mortgage-mask input');
      const maskOptions = {
        // mask: /^[a-zA-Zа-яёА-ЯЁ0-9,. -]+$/,
        // mask: /^(?!.*[.,-]{2})[a-zA-Zа-яёА-ЯЁ0-9., \-]*$/,

        mask: /^(?!.*([., -])\1)[a-zA-Zа-яёА-ЯЁ0-9., \-]*$/

        // mask:/^(?!.*(,,|\.\.|  ))[a-zA-Zа-яёА-ЯЁ0-9,.\s]*$/,


      };
      for (const item of input_status) {
        maskInput = IMask(item, maskOptions);
      }

      maskInput.on('accept',()=>{

        key_word.inpValue = maskInput.value;
        // key_word.inpValue=key_word.inpValue.trim()
        if(key_word.inpValue.length >0&&key_word.inpValue!==''){
          key_word.$refs.clearInput.classList.add('active')
        }
        else if(key_word.inpValue.length ===0) {
          key_word.$refs.clearInput.classList.remove('active')
          Storage.dispatch('ActionRemoveError')
        }

        if (maskInput.value.length >80){
          maskInput.value=maskInput.value.substring(0,80)
        }

        if (maskInput.value.length < 3){
          Storage.dispatch('ActionButtonActive',false)
          key_word.oktmo=null
        }


        // if (this.oktmo!==null) {
        //   this.oktmo = null
        // }
        if (key_word.inpValue.length >=3){
          if (key_word.timeout) clearTimeout(key_word.timeout)
          key_word.timeout = setTimeout(() => {
            Storage.dispatch('ActionGetDaData',key_word.inpValue)
          }, 500)
        }
      })
    },
    inputValidationMobile(){
      let key_word = this
      const input_status = document.querySelectorAll('.js--search-family-mortgage-mask-mobile input');
      const maskOptions = {
        mask: /^(?!.*([., -])\1)[a-zA-Zа-яёА-ЯЁ0-9., \-]*$/
      };
      for (const item of input_status) {
        maskInputMobile = IMask(item, maskOptions);
      }

      maskInputMobile.on('accept',()=>{
        key_word.inpValue = maskInputMobile.value;
        // key_word.inpValue=key_word.inpValue.trim()
        if(key_word.inpValue.length >0&&key_word.inpValue!==''){
          key_word.$refs.clearInputMobile.classList.add('active')

        }
        else if(key_word.inpValue.length ===0) {
          key_word.$refs.clearInputMobile.classList.remove('active')
          Storage.dispatch('ActionRemoveError')
        }

        if (maskInputMobile.value.length >80){
          maskInputMobile.value=maskInputMobile.value.substring(0,80)
        }
        if (maskInput.value.length < 3){
          Storage.dispatch('ActionButtonActive',false)
          key_word.oktmo=null
        }

        // if (this.oktmo!==null) {
        //   this.oktmo = null
        // }
        if (key_word.inpValue.length >=3){
          if (key_word.timeout) clearTimeout(key_word.timeout)
          key_word.timeout = setTimeout(() => {
            Storage.dispatch('ActionGetDaData',key_word.inpValue)
          }, 500)
        }
      })
    },
    
    selectItemTown(e){
      const element = e.currentTarget
      const data_name_town = element.getAttribute('data-town')
      this.oktmo = element.getAttribute('data-oktmo')
      maskInput.value=data_name_town
      this.inpValueMobileClick = data_name_town
      Storage.dispatch('ActionButtonActive',true)
      this.flag=1
      this.$refs.selectListWrapper.classList.remove('open')
      this.closeBlock()
      bodyUnlockMobileFilter(this.$refs.selectListWrapper)

    },
    clearField(el) {
      this.oktmo = null


      const element = el.currentTarget;
      maskInput.value = ''
      maskInputMobile.value=''
      element.classList.remove('active')
      this.inpValue=''
      this.inpValueMobileClick = this.placeholder
      Storage.dispatch('ActionButtonActive',false)

      Storage.dispatch('ActionRemoveError')
      if (this.screenWidth > 480) {
        this.$refs.selectListWrapper.classList.remove('open')
        this.closeBlock()
      }
    },

    // отправка данных для получения подсказки с городами
    // срабатывает на события input, paste
    // правда this.inpValue обновляется с опозданием, из-за этого не всегда логика работает корректно

    //Стас - закомментировал для проверки
    inputField(el){

      if (this.oktmo!==null) {
        this.oktmo = null
      }

      if (this.inpValue.length >=3){
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          Storage.dispatch('ActionGetDaData',this.inpValue)
        }, 500)
      }
    },

    //нажатие интер И отправка данных в дадата
    keyUpField(el){

      if (this.oktmo!==null) {
        this.oktmo = null
      }
      //
      // // Убрал из-за ложных срабатываний при нажатии на функциональные клавиши (стрелки курсора например).
      // if (this.inpValue.length >=3){
      //   console.log('@keyUpField() el',el)
      //   if (this.timeout) clearTimeout(this.timeout)
      //   this.timeout = setTimeout(() => {
      //     Storage.dispatch('ActionGetDaData',this.inpValue)
      //   }, 500)
      // }
      //
      //
      //
      // if(el.code =='Enter'){
      //   if(this.$refs.btnSend){
      //     this.$refs.btnSend.click()
      //   }
      // }
    },
    focusIn(el){
      const element = el.currentTarget
      element.classList.add('active')
      this.flag=0
      if(this.inpValue.length > 3 && this.resultDaData.length>0) {
        this.$refs.selectListWrapper.classList.add('open')
        // this.$refs.selectListWrapper.classList.add('open')
      }
    },
    focusOut(el){
      const element = el.currentTarget
      element.classList.remove('active')
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    },
  },
  computed:{
    resultDaData(){
      return Storage.getters.RESULTDADATA
    },
    resultDaDataCode(){
      return Storage.getters.RESULTDADATACODE
    },

    erroNotFoundTown(){
      return Storage.getters.EERORNOTFOUNDTOWN
    },
    request_result(){
      return Storage.getters.REQUESTRESULT
    },
    preload_btn(){
      return Storage.getters.PRELOADBTN
    },
    btn_active(){
      return Storage.getters.BTNACTIVE
    },

  },
  watch:{
    resultDaData(){
      if (this.resultDaData.length>0&&this.flag!==1){
        this.$refs.selectListWrapper.classList.add('open')
      }
    },
    screenWidth(){
      if (this.screenWidth <= 480) {
        this.desctop_input_searh=true
      } else{
        this.desctop_input_searh=false
        if(this.$refs.selectListSearch.querySelectorAll('.select-list__search-item').length===0) {
          if(this.$refs.selectListWrapper.classList.contains('open')) {
            this.$refs.selectListWrapper.classList.remove('open')
            this.closeBlock()
          }
        }
      }
    }
  },
  components:{
    vComponentSuccess,
    vComponentFailureNotFound,
    vComponentFailureOtherError
  },
  mounted(){
    this.$refs.selectList.style.height = this.initialHeight;
    this.inpValueMobileClick = this.placeholder
    this.inputValidation()
    this.inputValidationMobile()
    window.addEventListener('resize', this.updateScreenWidth)
    this.updateScreenWidth();
    this.desctop_input_searh = this.screenWidth <= 480;
    windowResizeDropDown()

    // Для Яндекс.Браузера и Safari
    this.$refs.selectList.querySelector('.js--search-family-mortgage-mask-mobile input').addEventListener('focus', this.handleInputFocus);
    this.$refs.selectList.querySelector('.js--search-family-mortgage-mask-mobile input').addEventListener('blur', this.handleInputBlur);











  },
  beforeDestroy() {
    // Очистка при уничтожении компонента
    window.removeEventListener('resize', this.setFullScreenHeight);
    /*if (window.visualViewport && this.visualViewportHandler) {
      window.visualViewport.removeEventListener('resize', this.visualViewportHandler);
      window.visualViewport.removeEventListener('scroll', this.visualViewportHandler);
    }*/
  }
};
</script>
<style scoped>
</style>
