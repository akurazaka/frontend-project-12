### Hexlet tests and linter status:
[![Actions Status](https://github.com/akurazaka/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/akurazaka/frontend-project-12/actions)

(Deploy)[https://frontend-project-12-1-qisa.onrender.com]

## Установка

1. Склонируйте репозиторий на ваш компьютер:

```bash
git clone https://github.com/akurazaka/frontend-project-12.git
```

2. Установите все необходимые зависимости:

```bash
npm install
```

## Сборка проекта
Чтобы собрать проект для продакшена, используйте команду:

```bash
make build
```
После этого собранные файлы будут находиться в папке build.

## Запуск Сервера
Чтобы запустить сервер с проектом, используйте команду

```bash
make start
```

## Линтинг
Для проверки кода на соответствие стандартам используйте ESLint:

```bash
npx eslint .
```