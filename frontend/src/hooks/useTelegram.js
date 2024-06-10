const tg = window.Telegram.WebApp

export function useTelegram() {
  const onClose = () => {
    tg.close()
  }

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id
  }
}

// 1. initDataUnsafe:
// Этот объект содержит начальные данные, переданные в мини-приложение при его открытии.
// Он может включать информацию о пользователе, которая была получена из контекста чата,
// где было запущено мини-приложение. Например, tg.initDataUnsafe.user может содержать информацию
// о текущем пользователе, включая его id.

// 2. close: Метод, который закрывает мини-приложение.

// 3. MainButton:
// Объект, представляющий кнопку главного действия, которую Telegram предоставляет
// для использования в мини-приложениях. Этот объект может использоваться
// для управления видимостью этой кнопки.

// 4. updateListener:
// Метод, который позволяет установить обработчик событий
// для получения обновлений от Telegram. Это может быть полезно
// для реализации функционала, зависящего от действий пользователя
// в Telegram или изменения состояния чата.
