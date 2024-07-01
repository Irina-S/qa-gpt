export interface MessageFormProps {
  loading?: boolean;
}

export interface MessageFormContent {
  content: string;
}

export interface MessageFormEmits {
  (e: 'send', value: MessageFormContent): void;
}
