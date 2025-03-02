<template>
  <div class="flex flex-col items-start justify-center p-3">
    <!-- Selección de Run -->
    <transition name="fade">
      <div v-if="!isSummaryVisible" class="relative w-full mb-4">
        <label class="block mb-2 text-xs font-bold tracking-wide uppercase">Select Run</label>
        <input v-model="searchQueryRun" type="text" :placeholder="t('runs') + '...'" @focus="isFocused = true"
          @blur="handleBlur"
          class="w-full px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-indigo-500" />
        <ul v-if="isFocused && filteredRuns.length"
          class="absolute left-0 z-10 w-full mt-1 overflow-y-auto border rounded-md shadow-lg dark:bg-gray-dark-300 bg-gray-light-200 max-h-60">
          <li v-for="run in filteredRuns" :key="run.id" @mousedown.prevent="selectRun(run)"
            class="p-2 cursor-pointer dark:hover:bg-gray-dark-400 hover:bg-gray-light-300">
            {{ run.name }}
          </li>
        </ul>
      </div>
    </transition>

    <!-- Selección de Bid -->
    <transition name="fade">
      <div v-if="selectedRun && !isSummaryVisible" class="w-full mb-4">
        <label class="block mb-2 text-xs font-bold tracking-wide uppercase">Select Bid</label>
        <ul
          class="w-full px-4 py-3 leading-tight border border-gray-200 rounded-lg dark:bg-gray-dark-300 bg-gray-light-200">
          <li v-for="bid in selectedRun.bids" :key="bid.id" @click="selectBid(bid)"
            :class="{ 'bg-indigo-500 text-white': selectedBid === bid, 'cursor-pointer': selectedBid !== bid }"
            class="p-2 rounded-lg hover:bg-indigo-400">
            <div class="flex justify-between">
              <span>{{ bid.bidname }}</span>
              <span>{{ currencyFormat(calculateBidOptionsSum(bid)) }}</span>
            </div>
            <p class="mt-1 text-sm border-t-2 text-gray-light-200">{{ bid.description }}</p>
            <ul v-if="bid.type === 'bidwar' && selectedBid === bid" class="mt-2 ml-4 overflow-y-scroll max-h-32">
              <li v-for="option in bid.bid_options" :key="option.id" class="flex justify-between text-sm">
                <span>{{ option.name }}</span>
                <span>{{ currencyFormat(option.current_amount) }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Opciones de Bid (para Bidwars) -->
    <transition name="fade">
      <div v-if="selectedBid && selectedBid.type === 'bidwar' && !isSummaryVisible" class="w-full mb-4">
        <label class="block mb-2 text-xs font-bold tracking-wide uppercase">Select Bid Option</label>
        <ul
          class="w-full px-4 py-3 overflow-y-scroll leading-tight border border-gray-200 rounded dark:bg-gray-dark-300 bg-gray-light-200 max-h-40">
          <li v-for="option in selectedBid.bid_options" :key="option.id" @click="selectBidOption(option)"
            :class="{ 'bg-indigo-500 text-white': selectedBidOption === option, 'cursor-pointer': selectedBidOption !== option }"
            class="p-2 border-b-2 border-gray-400 hover:bg-indigo-400">
            {{ option.name }}
          </li>
          <!-- Crear nueva opción si se permite y no existe una opción creada -->
          <li v-if="selectedBid.create_new_options && !newOptionCreated" class="flex flex-col p-2">
            <input v-model="newBidOptionName" type="text" placeholder="New Option Name"
              class="w-full px-4 py-2 mb-2 leading-tight border border-gray-400 rounded appearance-none dark:border-gray-200 dark:bg-gray-dark-400 bg-gray-light-300 focus:outline-none focus:border-indigo-500" />
            <transition name="fade">
              <button @click="createNewBidOption" type="button"
                class="w-full px-4 py-2 mt-2 text-sm font-bold border border-indigo-500 rounded text-gray-dark-400 bg-gray-light-200 dark:bg-gray-dark-400 dark:text-indigo-500 dark:hover:bg-gray-dark-200 dark:active:bg-gray-light-400 hover:bg-gray-light-300 active:bg-gray-dark-100">
                {{ t("add new option") }}</button>
            </transition>
          </li>
          <!-- Eliminar opción creada -->
          <li v-if="newOptionCreated" class="flex flex-col p-2">
            <transition name="fade">
              <button @click="deleteBidOption" type="button"
                class="w-full px-4 py-2 mt-2 text-sm text-white bg-red-600 border border-red-600 rounded hover:bg-red-700 active:bg-red-900">
                {{ t("delete option") }}</button>
            </transition>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Botón de guardar -->
    <transition name="fade">
      <div
        v-if="selectedRun && selectedBid && (selectedBid.type !== 'bidwar' || selectedBidOption) && !isSummaryVisible"
        class="w-full mt-4">
        <button @click="saveSelection" type="button"
          class="w-full px-4 py-2 text-sm text-white bg-indigo-500 border border-indigo-500 rounded hover:bg-indigo-600 active:bg-indigo-900">
          {{ t("save selection") }}</button>
      </div>
    </transition>

    <!-- Resumen compactado -->
    <transition name="fade">
      <div v-if="isSummaryVisible && selectedRun && selectedBid"
        class="flex flex-col w-full gap-2 p-4 mt-4 transition-transform duration-500 ease-in-out transform border rounded dark:bg-gray-dark-300 bg-gray-light-200"
        :style="{ transform: isSummaryVisible ? 'scale(1)' : 'scale(0.95)' }">
        <p><strong>Run:</strong> {{ selectedRun.name }}</p>
        <p><strong>Bid:</strong> {{ selectedBid.bidname }}</p>
        <p v-if="!selectedBidOption"><strong>Current amount (+ your donation):</strong>{{
          calculateBidAmount(Number(selectedBid.current_amount), Number(amount)) }}</p>
        <div v-else>
          <p><strong>Option:</strong> {{ selectedBidOption.name }}</p>
          <p><strong>Current amount (+ your donation):</strong> {{
            calculateBidAmount(Number(selectedBidOption.current_amount),
              Number(amount)) }}</p>
        </div>
        <button type="button"
          class="px-4 py-2 text-sm text-white bg-red-400 border border-red-400 rounded hover:bg-red-600 active:bg-red-900"
          @click="handleResetSelection">
          {{ t("remove") }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { Bid, BidOption } from '@/types/bid';
import type { BidDetailsDonation, BidDetailsDonationDTO } from '@/types/donation';
import type { Run } from '@/types/run';
import { currencyFormat } from '@/utils/strings'
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const emit = defineEmits(["save-bid", "remove-bid"]);

const props = defineProps<{ amount: number, runs: Run[], oldBidDetails?: BidDetailsDonation }>();

const searchQueryRun = ref('');
const isFocused = ref(false);

const selectedRun = ref<Run>();
const selectedBid = ref<Bid>();
const selectedBidOption = ref<BidOption>();
const newBidOptionName = ref('');
const isSummaryVisible = ref(false);
const newOptionCreated = ref(false);
const edited = ref(false)
const originalAmount = ref(0)

function calculateBidOptionsSum(bid: Bid): number {
  if (bid.type === 'bidwar') {
    const sum = bid.bid_options.reduce((prev, current) => {
      return prev + current.current_amount
    }, 0)
    return sum
  } else {
    return bid.current_amount
  }
}


function calculateBidAmount(current: number, amount: number) {
  if (props.oldBidDetails) {
    if (selectedBid.value?.id === props.oldBidDetails.bid_id) {
      const difference = amount - originalAmount.value;
      return currencyFormat(current + difference);
    }
  }
  return currencyFormat(current + amount);
}

const filteredRuns = computed(() => {
  return props.runs.filter(run =>
    run.name.toLowerCase().includes(searchQueryRun.value.toLowerCase())
  );
});

function handleBlur() {
  setTimeout(() => {
    isFocused.value = false;
  }, 200);
}

function selectRun(run: Run) {
  selectedRun.value = run;
  searchQueryRun.value = run.name;
  selectedBid.value = undefined;
  selectedBidOption.value = undefined;
  isFocused.value = false;
  isSummaryVisible.value = false;
}

function selectBid(bid: Bid) {
  selectedBid.value = bid;
  selectedBidOption.value = undefined;
}

function selectBidOption(option: BidOption) {
  selectedBidOption.value = option;
}

function createNewBidOption() {
  if (newBidOptionName.value.trim() && !newOptionCreated.value && !selectedBid.value?.bid_options.some(option => option.name === newBidOptionName.value.trim())) {
    const newOption: BidOption = {
      id: Math.random().toString(36).substr(2, 9),
      name: newBidOptionName.value.trim(),
      current_amount: 0,
    };
    selectedBid.value?.bid_options.push(newOption);
    selectBidOption(newOption);
    newBidOptionName.value = '';
    newOptionCreated.value = true;
  }
}

function deleteBidOption() {
  if (selectedBid.value) {
    selectedBid.value.bid_options.pop()
    selectedBidOption.value = undefined;
    newOptionCreated.value = false;
  }
}

function saveSelection() {
  isSummaryVisible.value = true;
  if (selectedBid.value) {
    const bidOptions: BidDetailsDonationDTO = { bid_id: selectedBid.value.id, create_new_options: newOptionCreated.value, type: selectedBid.value.type }
    if (newOptionCreated.value && selectedBidOption.value) {
      bidOptions.option_name = selectedBidOption.value.name
    } else if (!newOptionCreated.value && selectedBidOption.value) {
      bidOptions.option_id = selectedBidOption.value.id
    }
    emit("save-bid", bidOptions)
  }
}

function handleResetSelection() {
  edited.value = true
  selectedRun.value = undefined;
  selectedBid.value = undefined;
  selectedBidOption.value = undefined;
  searchQueryRun.value = "";
  isSummaryVisible.value = false;
  emit("remove-bid")
}

onMounted(() => {
  if (props.oldBidDetails) {
    originalAmount.value = props.amount
    selectedRun.value = props.runs.find(run => run.id === props.oldBidDetails?.run_id)
    if (selectedRun.value) {
      searchQueryRun.value = selectedRun.value.name
      selectedBid.value = selectedRun.value.bids.find(bid => bid.id === props.oldBidDetails?.bid_id)
      isSummaryVisible.value = true;
      if (props.oldBidDetails.type === "bidwar" && selectedBid.value) {
        selectedBidOption.value = selectedBid.value.bid_options.find(option => option.id === props.oldBidDetails?.option_id)
      }
    }
    saveSelection()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}
</style>
