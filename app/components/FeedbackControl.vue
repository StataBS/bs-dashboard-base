<script lang="ts" setup>
import { ref } from 'vue'

import IconMail from '@kanton-basel-stadt/designsystem/icons/symbol/mail'
import IconSendMail from '@kanton-basel-stadt/designsystem/icons/symbol/send-mail'
import IconCircleCheck from '@kanton-basel-stadt/designsystem/icons/symbol/circle-check'
import IconCircleError from '@kanton-basel-stadt/designsystem/icons/symbol/circle-error'
import IconBaselstab from '@kanton-basel-stadt/designsystem/icons/symbol/baselstab'

interface InputProps {
  defaultMail?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  defaultMail: '',
})

const feedbackText = ref('')
const selectedRating = ref('')
const emailAddress = ref(props.defaultMail)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')
const isOpen = ref(false)

const ratings = [
  { emoji: '😕', label: 'Schlecht', value: 'poor' },
  { emoji: '😐', label: 'Okay', value: 'okay' },
  { emoji: '🙂', label: 'Gut', value: 'good' },
  { emoji: '😀', label: 'Sehr gut', value: 'great' },
  { emoji: '🤩', label: 'Ausgezeichnet', value: 'excellent' },
]

const submitFeedback = async () => {
  errorMessage.value = ''

  if (!feedbackText.value.trim() || !emailAddress.value.trim()) {
    errorMessage.value = 'Bitte fülle Sie Textfeld und Mailadresse aus.'
    return
  }

  isSubmitting.value = true

  try {
    const result = await $fetch<{
      ok: boolean
      simulated?: boolean
      issueUrl?: string | null
      message?: string
    }>('/api/feedback', {
      method: 'POST',
      body: {
        rating: selectedRating.value,
        message: feedbackText.value.trim(),
        email: emailAddress.value.trim(),
        attachments: [],
      },
    })

    if (result.simulated || !result.issueUrl) {
      throw new Error(result.message || 'Feedback submission is running in local simulation mode.')
    }

    isSubmitting.value = false
    isSubmitted.value = true

    setTimeout(() => {
      feedbackText.value = ''
      selectedRating.value = ''
      emailAddress.value = ''
      isSubmitted.value = false
    }, 3000)
  } catch (error) {
    isSubmitting.value = false
    errorMessage.value
      = 'Feedback konnte nicht gesendet werden. Senden Sie bitte eine Mail an opendata@bs.ch'
    console.error('Failed to submit feedback:', error)
  }
}

const resetForm = () => {
  feedbackText.value = ''
  selectedRating.value = ''
  emailAddress.value = ''
  isSubmitted.value = false
  errorMessage.value = ''
  isOpen.value = false
}
</script>

<template>
  <div class="feedback-wrapper">
    <button
      class="button is-action has-icon !px-10 group/feedback-trigger"
      aria-label="Feedback geben"
      @click="isOpen = !isOpen"
    >
      <span class="inline-flex h-20 w-20 shrink-0 items-center justify-center">
        <component
          :is="IconMail"
          data-symbol="mail"
          class="w-20 h-20 transition-transform group-hover/feedback-trigger:animate-jump-scale"
        />
      </span>
      <span>Feedback</span>
    </button>

    <div
      v-if="isOpen"
      class="feedback-panel absolute bottom-[calc(100%+8px)] left-0 z-[60] w-[360px] rounded-[12px] bg-white shadow-[0_10px_25px_#BABABA] border-0 p-25 animate-[popup_0.3s_cubic-bezier(0.16,1,0.3,1)]"
    >
      <button
        class="absolute top-10 right-10 flex h-[28px] w-[28px] items-center justify-center text-lg font-bold cursor-pointer border-0 bg-transparent transition-colors duration-200 hover:text-blue-700"
        aria-label="Schliessen"
        @click="resetForm"
      >
        <span>×</span>
      </button>

      <div v-if="!isSubmitted" class="flex flex-col gap-20">
        <h3 class="text-lg font-bold m-0">
          Teilen Sie Ihre Gedanken
        </h3>

        <div class="flex flex-col gap-15">
          <p class="text-sm font-medium">
            Wie würden Sie Ihre Erfahrung bewerten?
          </p>

          <div class="tabs-container feedback-ratings !my-0">
            <button
              v-for="rating in ratings"
              :key="rating.value"
              type="button"
              class="button is-tab group/feedback-rating"
              :class="{ 'is-active': selectedRating === rating.value }"
              :aria-label="rating.label"
              @click="selectedRating = rating.value"
            >
              <span class="mr-5 text-base transition-transform group-hover/feedback-rating:animate-jump-scale">{{ rating.emoji }}</span>
              <span class="text-sm">{{ rating.label }}</span>
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-10">
          <label
            for="feedback-text"
            class="text-sm font-medium"
          >
            Ist Ihnen etwas aufgefallen? Fehlt etwas?
          </label>
          <textarea
            id="feedback-text"
            v-model="feedbackText"
            class="input w-full min-h-[100px]"
            placeholder="Ihr Feedback hilft uns, besser zu werden..."
          />
        </div>

        <div class="flex flex-col gap-10">
          <label
            for="feedback-email"
            class="text-sm font-medium"
          >
            E-Mail
          </label>
          <input
            id="feedback-email"
            v-model="emailAddress"
            type="email"
            class="input w-full"
            placeholder="Ihre@email.ch"
          >
          <small class="text-xs inline-block text-gray-700">
            Damit wir Sie erreichen können.
          </small>
        </div>

        <div
          v-if="errorMessage"
          class="mt-10 flex items-center gap-10 rounded-[6px] border border-red-600 bg-red-100 p-10 text-sm text-red-600 animate-[shake_0.5s_ease-in-out]"
        >
          <span class="inline-flex items-center justify-center mr-5">
            <component
              :is="IconCircleError"
              data-symbol="circle-error"
              class="w-20 h-20"
            />
          </span>
          <span>{{ errorMessage }}</span>
        </div>

        <button
          class="button is-action has-icon !px-10 max-w-[190px] group/feedback-submit"
          :disabled="isSubmitting"
          @click="submitFeedback"
        >
          <template v-if="isSubmitting">
            <span class="inline-flex h-20 w-20 shrink-0 items-center justify-center loading-spinner">
              <component
                :is="IconBaselstab"
                data-symbol="baselstab"
                class="w-20 h-20"
              />
            </span>
            <span>Wird gesendet...</span>
          </template>
          <template v-else>
            <span class="inline-flex h-20 w-20 shrink-0 items-center justify-center">
              <component
                :is="IconSendMail"
                data-symbol="send-mail"
                  class="w-20 h-20 transition-transform group-hover/feedback-submit:animate-jump-x"
              />
            </span>
            <span>Feedback senden</span>
          </template>
        </button>
      </div>

      <div v-else class="flex min-h-[200px] flex-col items-center justify-center gap-20 text-center">
        <span class="inline-flex items-center justify-center mb-10">
          <component
            :is="IconCircleCheck"
            data-symbol="circle-check"
            class="w-60 h-60 text-green-500"
          />
        </span>
        <h3 class="text-lg font-bold m-0 text-green-500">
          Vielen Dank für Ihr Feedback!
        </h3>
        <p class="text-sm m-0">
          Wir schätzen Ihre Eingabe und werden sie nutzen, um unseren Service zu verbessern.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.feedback-wrapper {
  position: relative;
  display: inline-block;
}

.feedback-ratings {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 480px) {
  .feedback-panel {
    right: auto;
    left: 0;
    width: min(360px, calc(100vw - 40px));
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

@keyframes popup {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}


.loading-spinner * {
  transform-origin: center;
  animation: rotateBaselStab 1.2s infinite linear;
}
</style>
