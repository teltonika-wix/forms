import { type MaybeElement, useElementSize } from '@vueuse/core';
import { type Ref, onMounted, ref } from 'vue';

type TMountedReferenceWidthReturnType = {
  width: Ref<number>;
  ready: Ref<boolean>;
};

export const useMountedRefWidth = (reference: Ref<MaybeElement>): TMountedReferenceWidthReturnType => {
  const { width, stop } = useElementSize(reference);
  const referenceElement = ref<number>(0);
  const isMounted = ref<boolean>(false);

  onMounted(() => {
    stop();
    referenceElement.value = width.value;
    isMounted.value = true;
  });

  return {
    width: referenceElement,
    ready: isMounted,
  };
};
