<script setup lang="ts">
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/vue/20/solid";

const props = defineProps<{
  name: string;
  options: string[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}>();

const { handleChange, errorMessage } = useField(props.name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div class="w-full"> 
    <SelectRoot @update:modelValue="handleChange">
      <SelectTrigger
        class="disabled:cursor-not-allowed w-full border inline-flex items-center justify-between rounded-lg px-[15px] text-sm leading-none p-3 gap-[5px] bg-white data-[placeholder]:text-slate-400 outline-none"
        :disabled="disabled"
      >
        <SelectValue :placeholder="placeholder" />
        <ChevronDownIcon class="w-3.5 text-tres-blue" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
          :side-offset="5"
        >
          <SelectScrollUpButton
            class="flex items-center justify-center h-[25px] bg-white text-tres-blue cursor-default"
          >
            <ChevronUpIcon class="w-3.5" />
          </SelectScrollUpButton>

          <SelectViewport class="p-[5px]">
            <SelectGroup>
              <SelectItem
                v-for="(option, index) in options"
                :key="index"
                class="text-sm leading-none text-black rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] py-2 relative select-none data-[highlighted]:outline-none data-[highlighted]:bg-tres-blue/[0.3]"
                :value="option"
              >
                <SelectItemIndicator
                  class="absolute left-0 w-[25px] inline-flex items-center justify-center text-tres-blue"
                >
                  <CheckIcon class="w-3.5" />
                </SelectItemIndicator>
                <SelectItemText>
                  {{ option }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>

          <SelectScrollDownButton
            class="flex items-center justify-center h-[25px] bg-white text-tres-blue cursor-default"
          >
            <ChevronDownIcon class="w-3.5" />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <ErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>
