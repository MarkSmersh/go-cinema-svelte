# GO Cinema (Svelte)

Web strona napisana z użyciem frameworku SvelteKit.

## Szczegóły

Framework: SvelteKit
Serwer: NodeJS (pochodzi z frameworku)
Baza danych: PostgreSQL

## Instalacja

1. Zainstalować NodeJS
2. Uruchomić polecenie `npm i` w dyrektorii programy (gdzie jest `package.json`)
3. Stworzyc plik `.env` na podstawie pliku `.env.example` z wypełnieniem linku do bazy danych
4. Uruchomić `npm run dev` dla uruchomienia strony w trybie deweloperskim lub `npm run build` dla tworzenia plików statycznych (JS, HTML, CSS)

## API Endpoints

### POST

1. `/api/movies` - jest dla dodania nowych filmów (przykład `/example/apiMovies.json`)
2. `/api/rating` - jest dla wystawenia ocenam filmom (przykład `/example/apiRating.json`)
3. `/api/places` - jest dla tworzenia typów miejsc dla kinotetrów (przykład `/example/apiPlaces.json`)
4. `/api/cinemas` - jest dla tworzenia kinoteatrów wraz z miejscami dla nich (przykład `/example/apiCinemas.json`)
5. `/api/ticket` - jest dla biletu na podtstawie podanego miejsca i danych kontaktwoych (przykład `/example/apiTicket.json`)

### GET

1. `/api/search/{slug}` - jest dla wyszukiwania filmów, gdzie `slug` - nazwa częściowa lub pełna filmu

## Autorzy

Mark Smotkin
Zakhar Orlovskyi
