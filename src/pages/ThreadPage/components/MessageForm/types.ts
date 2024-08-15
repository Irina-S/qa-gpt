export interface MessageFormProps {
  loading?: boolean;
}

export interface MessageFormContent {
  content: string;
  files: File[];
}

export interface MessageFormEmits {
  (e: 'send', value: MessageFormContent): void;
}
