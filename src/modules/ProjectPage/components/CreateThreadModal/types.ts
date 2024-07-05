export interface CreateThreadModalProps {
  modelValue: boolean;
}

export interface CreateThreadModalEmits {
  (e: 'create', value: string): void;
  (e: 'update:modelValue', value: boolean): void;
}
