<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getAuthName, getAuthPhone } from './services/auth.service';
import Cookies from 'js-cookie';

export default defineComponent({
  setup() {
    const route = useRoute();
    const layout = computed(() => route.meta.layout || 'default-layout');

    const userId = ref<string | undefined>();
    const userName = ref<string | undefined>();

    const checkLogin = () => {
      if (Cookies.get('client_data')) {
        userId.value = getAuthPhone();
        userName.value = getAuthName();

        if (userId.value && userName.value) {
          return true;
        }
      }
      return false;
    };

    onMounted(() => {
      if (checkLogin()) {
        (function (d, m) {
          var kommunicateSettings: any = {
            "appId": "2d61eae030729574b58385cf7a465fb72",
            "popupWidget": true,
            "automaticChatOpenOnNavigation": true,
            "emojilibrary": true,
            "quickReplies": ["Hướng dẫn đặt hàng", "Kiểm tra đơn hàng", "Hướng dẫn tạo tài khoản"],
            "userId": userId.value,
            "userName": userName.value,
          };
          var s = document.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
          var h = document.getElementsByTagName("head")[0];
          h.appendChild(s);
          window.kommunicate = m;
          m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
      }
      else {
        (function (d, m) {
          var kommunicateSettings: any = {
            "appId": "2d61eae030729574b58385cf7a465fb72",
            "popupWidget": true,
            "automaticChatOpenOnNavigation": true,
            "quickReplies": ["Hướng dẫn đặt hàng", "Kiểm tra đơn hàng", "Hướng dẫn tạo tài khoản"],            
          };
          var s = document.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
          var h = document.getElementsByTagName("head")[0];
          h.appendChild(s);
          window.kommunicate = m;
          m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
      }
    });

    return {
      layout,
    };
  },
});
</script>

<style>
.kommunicate-custom-iframe {
  z-index: 30 !important;
  bottom: 20px !important;
}

.km-iframe-dimension-with-popup {
  z-index: 0 !important;
  height: 520px !important;
  width: 360px !important;
  bottom: 20px !important;
}
</style>