# Uproszczona wersja klientu sklepowego

## Opis

Aplikacja webowa symulująca uproszczony proces składania zamówienia w sklepie internetowym. Klient ma do wyboru listę produków, może dodać dowolną ilość do koszyka i następne złożyć zamówienie.

## Założenia

- Produkty są zdefiniowane w pliku `src/data.ts` jako statyczna lista obiektów
- Jak w prawdziwym sklepie, użytkownik może dodać ograniczoną ilość jednego produktu do koszyka. Wspólna wartość ograniczenia dla wszystkich obiektów znajduje się w pliku `src/data.ts`.
- Po finalizacji zamówienia, użytkownik jest przekierowywany na oddzielną stronę zawierającą potwierdzenie złożonego zamówienia.

## Podejście

- Aplikacja została zbudowana jako SPA z użyciem Reacta.
- Dane produktów dodanych do koszyka są przechowywane w obiekcie stanu aplikacji, zdefiniowanym za pomoca `useReducer`.
- Obiekt stanu jest przekazywany do każdego komponentu aplikacji, używając React Context.
- Po odświeżeniu strony dane koszyka są tracone.
- Routing pomiędzy widokami aplikacji został zrealizowany za pomocą `react-router`.
- Wszystkie widoki aplikacji zostały napisane jako komponenty funkcyjne.
- Wspólna część widoków aplikacji została wydzielona jako oddzielne komponenty - szablon widoku oraz tabela.
- Widok potwierdzenia zamówienia jest oddzielną statyczną stroną HTML.

## Technologie

- HTML/CSS
- TypeScript
- React
- Vite
- react-router

## Uruchomienie aplikacji

Aby uruchomić aplikację należy:

1. Sklonować repozytorium

```
git clone https://github.com/jgryko5/ocado-web.git
cd ocado-web
```

2. Zainstalować niezbędne zależności:

```
npm install
```

3. Uruchomić aplikację w trybie deweloperskim

```
npm run dev
```

Aplikacja będzie dostępna pod adresem http://localhost:5173/
