// Установка title. Если заголовка нет, он будет установлен

let lang = document.documentElement.lang;
let title;

if (!document.title) {
    switch (document.location.pathname) {
        case '/':
            title = lang == 'ru' ? 'Главная' : 'Main';
            document.title = title;
            break;

        case '/start.html':
            title = lang == 'ru' ? 'С чего начать?' : 'Where to start?';
            document.title = title;
            break;

        case '/404.html':
            title = lang == 'ru' ? 'Страница не найдена?' : 'Page not found';
            document.title = title;
            break;

        case '/terms.html':
        case '/terms-of-trade.html':
            title = lang == 'ru' ? 'Условия торговли' : 'Trading terms';
            document.title = title;
            break;

        case '/platform.html':
            title = lang == 'ru' ? 'Торговая платформа' : 'Trading platform';
            document.title = title;
            break;

        case '/strategies.html':
            title = lang == 'ru' ? 'Торговые стратегии' : 'Trading strategies';
            document.title = title;
            break;

        case '/schedule.html':
            title = lang == 'ru' ? 'Часы работы рынка' : 'Market hours';
            document.title = title;
            break;

        case '/instruments.html':
            title = lang == 'ru' ? 'Торговые инструменты' : 'Trading instruments';
            document.title = title;
            break;

        case '/analytics.html':
            title = lang == 'ru' ? 'Аналитика рынка' : 'Market analytics';
            document.title = title;
            break;

        case '/review.html':
        case '/overview.html':
            title = lang == 'ru' ? 'Обзор рынка' : 'Market overview';
            document.title = title;
            break;

        case '/raw-materials.html':
        case '/commodities.html':
            title = lang == 'ru' ? 'Сырье' : 'Сommodities';
            document.title = title;
            break;

        case '/condition.html':
            title = lang == 'ru' ? 'Состояние рынка' : 'State of the market';
            document.title = title;
            break;

        case '/calendar.html':
            title = lang == 'ru' ? 'Экономический календарь' : 'Economic calendar';
            document.title = title;
            break;

        case '/news.html':
            title = lang == 'ru' ? 'Новости рынка' : 'Market news';
            document.title = title;
            break;

        case '/forecasts.html':
            title = lang == 'ru' ? 'Прогнозы рынка' : 'Market forecasts';
            document.title = title;
            break;

        case '/currencies.html':
            title = lang == 'ru' ? 'Валюты' : 'Currencies';
            document.title = title;
            break;

        case '/cryptocurrencies.html':
            title = lang == 'ru' ? 'Криптовалюты' : 'Cryptocurrencies';
            document.title = title;
            break;

        case '/stocks.html':
            title = lang == 'ru' ? 'Акции' : 'Stocks';
            document.title = title;
            break;

        case '/ies.html':
            title = lang == 'ru' ? 'Индексы' : 'Indices';
            document.title = title;
            break;

        case '/history.html':
            title = lang == 'ru' ? 'История компании' : 'Company history';
            document.title = title;
            break;

        case '/why.html':
            title = lang == 'ru' ? 'Почему мы?' : 'Why us?';
            document.title = title;
            break;

        case '/documents.html':
            title = lang == 'ru' ? 'Документы' : 'Documents';
            document.title = title;
            break;

        case '/about.html':
            title = lang == 'ru' ? 'О нас' : 'About us';
            document.title = title;
            break;

        case '/contacts.html':
            title = lang == 'ru' ? 'Контакты' : 'Contacts';
            document.title = title;
            break;

        case '/tips.html':
            title = lang == 'ru' ? 'Торговые советы' : 'Trading tips';
            document.title = title;
            break;

        default:
            document.title = 'Нужно установить title';
            break;
    }
}
