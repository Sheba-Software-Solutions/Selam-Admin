export function useToast() {
  return {
    toast: ({ title, description }) => {
      // Replace this with your toast library or custom implementation
      console.log(`Toast: ${title} - ${description}`);
    },
  };
} 