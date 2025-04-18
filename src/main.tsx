
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Функция для инициализации приложения
function initializeApp() {
  console.log("Начало инициализации приложения");
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Не найден элемент с id 'root'");
    return;
  }
  
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Приложение успешно инициализировано");
  } catch (error) {
    console.error("Ошибка при инициализации приложения:", error);
  }
}

// Запускаем инициализацию после полной загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
