import { computed, ref } from 'vue';

/**
 *
 * @param handlerPosition граница за которую перетаскиваюь
 * @param minWidth минимальная ширина
 */
export const useResize = (
  handlerPosition: 'left' | 'right',
  initialWidth: number,
  minWidth = 100
) => {
  const width = ref(initialWidth);
  const computedWidth = computed(() => `${width.value}px`);
  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  const startResize = (event: MouseEvent) => {
    isResizing = true;
    startX = event.clientX;
    startWidth = width.value;

    const onMouseMove = (event: MouseEvent) => {
      if (isResizing) {
        const dx = event.clientX - startX;
        const newWidth = handlerPosition === 'left' ? startWidth - dx : startWidth + dx;
        width.value = Math.max(minWidth, newWidth);
      }
    };

    const onMouseUp = () => {
      isResizing = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return {
    width,
    computedWidth,
    startResize
  };
};
