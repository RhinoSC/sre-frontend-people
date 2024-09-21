<template>
  <div class="relative flex flex-col items-center justify-center gap-6">
    <img src="/src/assets/cartel_con_logo.png"
      class="absolute top-[100px] z-10 brightness-[0.3] object-cover w-screen h-[1000px]" alt=""
      style="width: 100vw; position: absolute; left: calc(-50vw + 50%);">
    <div class="relative w-full h-full">
      <VForm @submit="handlerPaypalDonation" class="flex flex-col items-center justify-center" v-if="!donationCompleted"
        :validation-schema="schema">
        <div class="z-20 max-w-3xl px-10 py-12 mt-10 rounded-lg shadow-2xl dark:bg-gray-dark-400 bg-gray-light-100"
          v-if="!renderPaypalBtn">
          <div class="z-20 flex flex-row items-center justify-center py-5 pl-4 mb-5 -mx-10 bg-gray-light-400 bg">
            <div class="flex flex-col items-center justify-center gap-6">
              <!-- <h1 class="text-4xl font-bold text-center uppercase text-[#D1559E]">
              {{ donationCompleted ? "SRE X" : "Donate to Save One Animal ONG" }}
            </h1> -->
              <img src="/src/assets/save-one-ong-color_1.png" alt="">
            </div>
          </div>
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-base font-bold tracking-wide uppercase" for="grid-name">
                Name
              </label>
              <Field v-model="newDonation.name" name="name"
                class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-indigo-500"
                id="grid-name" type="text" placeholder="Your name" />
              <ErrorMessage name="name" class="mt-1 text-xs text-red-500" />
              <transition name="fade">
                <span v-if="!validations.name" class="text-xs text-red-500">Name is required.</span>
              </transition>
            </div>
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-base font-bold tracking-wide uppercase" for="grid-email">
                Email
              </label>
              <Field v-model="newDonation.email" name="email"
                class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-indigo-500"
                id="grid-email" type="email" placeholder="Your email" />
              <ErrorMessage name="email" class="mt-1 text-xs text-red-500" />
              <transition name="fade">
                <span v-if="!validations.email" class="text-xs text-red-500">Valid email is required.</span>
              </transition>
            </div>
          </div>
          <div class="flex flex-wrap mb-6 -mx-3">
            <div class="w-1/2 px-3">
              <label class="block mb-2 text-base font-bold tracking-wide uppercase" for="grid-amount">
                Amount
              </label>
              <Field v-model="newDonation.amount" name="amount"
                class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-indigo-500"
                id="grid-amount" type="number" min="0" placeholder="Donation amount" />
              <ErrorMessage name="amount" class="mt-1 text-xs text-red-500" />
              <transition name="fade">
                <span v-if="!validations.amount" class="text-xs text-red-500">Amount should be greater than zero.</span>
              </transition>
            </div>
            <div class="flex items-center w-1/2 px-3">
              <div class="flex flex-row items-center justify-center gap-3 mt-7">
                <input type="checkbox" id="checkbox" v-model="newDonation.to_bid" :disabled="disabledGoesToIncentive"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="checkbox"> Donation goes to an incentive?</label>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-center mb-6 -mx-3">
            <div class="flex flex-col w-full px-3">
              <label class="block mb-2 text-xs font-bold tracking-wide uppercase" for="grid-first-name">
                Description
              </label>
              <textarea v-model="newDonation.description"
                class="block p-2.5 w-full h-24 text-sm rounded-lg border px-4 py-3 mb-1 leading-tight border-gray-200 appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-indigo-500 resize-none"
                placeholder="Write your thoughts here..." maxlength="300"></textarea>
              <transition name="fade">
                <span v-if="!validations.description" class="text-xs text-red-500">Description should not exceed 300
                  characters.</span>
              </transition>
            </div>
          </div>
          <transition name="fade">
            <div class="flex flex-wrap items-center justify-center h-20 mb-6 -mx-10 bg-gray-light-400"
              v-if="newDonation.to_bid">
              <h1 class="text-4xl font-bold text-center text-white-smoke">Incentive selector</h1>
            </div>
          </transition>
          <transition name="fade" class="">
            <div class="z-20 flex flex-wrap items-center justify-center mb-6 -mx-3" v-if="newDonation.to_bid">
              <div class="flex flex-col w-full px-3">
                <DonationBidSelector :amount="newDonation.amount" :runs="runs" @save-bid="saveBidOptions($event)"
                  @remove-bid="removeBidOptions">
                </DonationBidSelector>
              </div>
            </div>
          </transition>
          <div class="flex flex-row items-center justify-center w-full gap-2 font-bold">
            <button
              class="w-full px-4 py-2 text-sm text-white bg-indigo-500 border border-indigo-500 rounded hover:bg-indigo-700 active:bg-indigo-900"
              type="submit">
              Continue
            </button>
          </div>
        </div>
        <div class="z-20 max-w-3xl px-4 py-2 mt-[200px] rounded-lg shadow-2xl dark:bg-gray-dark-400 bg-gray-light-100"
          :class="renderPaypalBtn ? 'block' : 'hidden'">
          <div class="flex flex-col items-center justify-center gap-2">
            <h1 class="text-4xl font-bold text-center">Click the button when you are ready to donate:</h1>
            <h1 class="text-4xl font-bold text-center">{{ currencyFormat(newDonation.amount) }}</h1>
            <div id="paypal-donate-button-container"></div>
          </div>
        </div>
      </VForm>
      <div class="z-20 flex flex-row items-center justify-center w-full" v-else>
        <div class="max-w-3xl px-4 py-2 rounded-lg shadow-2xl">
          <h1 class="text-4xl font-bold text-center">Thanks for your support! Keep enjoying the event!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { defineRule, Field, Form as VForm, ErrorMessage } from 'vee-validate';
import { required, url } from '@vee-validate/rules';
import * as yup from 'yup';

defineRule('required', required);
defineRule('url', url);

import DonationBidSelector from '@/components/donation/DonationBidSelector.vue';

import type { APIResponse } from '@/types/api';
import type { BidDetailsDonationDTO, Donation, DonationDTO, PaypalResponse } from '@/types/donation';

import { apiCreateDonation } from '@/api/donation/donation';
import type { Run } from '@/types/run';
import { apiGetRuns } from '@/api/run/run';
import { useEventStore } from '@/stores/useEventStore';
import { storeToRefs } from 'pinia';
import { loadCustomScript } from '@paypal/paypal-js';
import { currencyFormat } from '@/utils/strings';

const eventStore = useEventStore()
const { selectedEvent } = storeToRefs(eventStore)

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  amount: yup.number().typeError("Amount must be a number").min(0, "Amount must be greater than zero").required("Amount is required")
});

watch(selectedEvent, (newEvent) => {
  if (newEvent) {
    newDonation.value.event_id = newEvent.id
  }
})

const renderPaypalBtn = ref(false)
const donationCompleted = ref(false)

const router = useRouter();
const runs = ref<Run[]>([]);

const newDonation = ref<DonationDTO>({
  name: "",
  to_bid: false,
  time_mili: new Date().getTime(),
  event_id: "",
  email: "",
  description: "",
  bid_details: { bid_id: "", create_new_options: false, type: "bidwar" },
  amount: 0,
});

const validations = ref({
  name: true,
  email: true,
  amount: true,
  description: true,
});

const disabledGoesToIncentive = ref(false)

const saveBidOptions = ($event: BidDetailsDonationDTO) => {
  disabledGoesToIncentive.value = true
  newDonation.value.bid_details = $event
}

const removeBidOptions = () => {
  disabledGoesToIncentive.value = false
  newDonation.value.bid_details = undefined
}

const getRuns = async () => {
  try {
    const response: APIResponse<Run[]> = await apiGetRuns("bids");

    let filteredRuns = response.data.filter((run) => run.schedule_id === import.meta.env.VITE_SCHEDULE_ID && run.status === "active" && run.bids !== undefined)
    filteredRuns = filteredRuns.sort((a, b) => {
      if (a.start_time_mili < b.start_time_mili) {
        return -1;
      } else if (a.start_time_mili < b.start_time_mili) {
        return 1;
      }
      return 0;
    })

    filteredRuns.forEach(run => {
      if (run.bids) {
        run.bids.forEach(bid => {
          if (bid.bid_options) {
            // Ordena las bid_options por current_amount en orden descendente
            bid.bid_options.sort((a, b) => b.current_amount - a.current_amount);
          }
        });
      }
    });
    runs.value = filteredRuns;
  } catch (error) {
    console.error("Failed to get runs:", error);
    alert("There was an error getting runs. Please try again.");
    router.push('/donations');
  }
};

let btn = ref()

const handlerPaypalDonation = async () => {
  renderPaypalBtn.value = true
  await nextTick()
  btn.value = (window as any).PayPal.Donation.Button({
    currency_code: import.meta.env.VITE_EVENT_CURRENCY,
    amount: newDonation.value.amount,
    env: import.meta.env.PROD ? 'production' : 'sandbox',
    // env: 'production',
    // hosted_button_id: 'E3RKEMWJWCCDY',
    // env: 'sandbox',
    business: import.meta.env.VITE_PAYPAL_BUSINESS,
    // business: "2E3R3QGERN7FN",
    // item_name: `${this.event.isCharityData.paypalData.itemName}`,
    // image_url: `${this.event.isCharityData.paypalData.logoUrl}`,
    // banner_image: `https://cdn.discordapp.com/attachments/701204143678685205/1286810409092780065/SREX_BSKYBanner.jpg?ex=66ef4315&is=66edf195&hm=db1e70d7d140e01f5aa3805f8cbd98fea99cd19cf41f5322936753b26cfdd20a&`,
    image: {
      src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
      // src: '/src/assets/btn.png',
      alt: 'Donate with PayPal button'
    },
    onComplete: function (params: PaypalResponse) {
      if (params.st === "Completed") {
        handleCreateDonation()
      }
      router.push("/donate")
    },
  }).render('#paypal-donate-button-container');
}

const handleCreateDonation = async () => {
  try {
    if (!selectedEvent) {
      alert("select an event to donate")
      return
    }
    if (newDonation.value.to_bid && newDonation.value.bid_details?.bid_id === "") {
      newDonation.value.to_bid = false
    }

    const response: APIResponse<Donation> = await apiCreateDonation(newDonation.value);
    donationCompleted.value = true
    // console.log("Donation created:", response.data);
    // router.push('/donations');
  } catch (error) {
    console.error("Failed to create donation:", error);
    alert("There was an error creating the donation. Please try again.");
  }
};

onMounted(async () => {
  try {
    await loadCustomScript({
      url: "https://www.paypalobjects.com/donate/sdk/donate-sdk.js",
    });
  } catch (error) {
    console.error("failed to load the custom script", error);
  }

  await getRuns();
  if (selectedEvent) {
    newDonation.value.event_id = selectedEvent.value.id
  }
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
