export default {
  input: './src/openapi/KanbanBoard_v1.json', // sign up at app.heyapi.dev
  output: './src/client',
  plugins: [
    // ...other plugins
    '@tanstack/react-query', 
  ],
};