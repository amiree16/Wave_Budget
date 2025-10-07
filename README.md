# Wave Notion Labs Budget App

O aplicatie interna de gestionare a bugetului, construita cu **React** si **json-server**.  
Permite importul de fisiere CSV cu tranzactii, criptarea datelor sensibile (IBAN-uri) si vizualizarea statisticilor financiare.

## ⚙️ Instalare si rulare

1. Cloneaza proiectul:
   ```bash
   git clone https://github.com/utilizator/wave-budget.git
   cd wave-budget/frontend

2. Instalam dependensele:
   ```npm install ```

3. Pornim aplicatia si json-serverul:
   ```npm start ```



## 🛠️ Tehnologii folosite

- **React.js** – interfaaa utilizatorului
- **json-server** – backend mock pentru stocarea tranzactiilor
- **CryptoJS** – criptare/decriptare simpla a datelor sensibile
- **Papaparse** – import fisiere CSV
- **Axios** – comunicare cu serverul
- **Recharts** – generare de grafice
- **CSS / Flexbox** – layout si stilizare

## 🚀 Funcționalități

### 📁 Import fisiere CSV cu tranzactii
Am folosit **PapaParse** pentru a citi si transforma continutul fisierelor CSV in obiecte JavaScript.  
Datele sunt parcurse rand cu rand, iar pentru fiecare inregistrare se face o cerere **POST** catre `json-server` prin **Axios**.  
Inainte de trimitere, valorile numerice sunt curatate si transformate in format standard (ex: `1.000,50` → `1000.50`).

---

### 🔐 Criptare simpla pentru campuri sensibile (IBAN, conturi proprii)
Campurile `cont_propriu` si `iban_partener` sunt criptate inainte de a fi salvate in baza de date folosind **CryptoJS** si algoritmul **AES**.  
La afisarea in frontend, acestea sunt decriptate temporar pentru a fi lizibile in interfata.  
Cheia secreta este stocata local doar pentru demonstratie (proof of concept).

---

### 💼 Categorizare automata a tranzactiilor dupa cuvinte cheie
Am implementat o logica de categorizare in fisierul `categorizationRules.js`.  
Aceasta cauta anumite **cuvinte cheie** in descrierea sau numele partenerului (ex: `omv`, `google`, `client`, `dividende`) si atribuie automat o **categorie** si o **subcategorie** pentru fiecare tranzactie.  
Daca nu exista potriviri, tranzactia este incadrata la `Other` sau `Uncategorized`.

---

### 📊 Dashboard interactiv cu grafice lunare si anuale
Pagina principala (**Home**) calculeaza veniturile, cheltuielile si profitul net pe baza datelor din `json-server`.  
Am folosit **Recharts** pentru a genera grafice dinamice care compara veniturile si cheltuielile pe luni.  
Datele sunt grupate pe baza lunii si anului folosind o functie personalizata `groupByMonth()`.

---

### 💵 Pagini dedicate pentru venituri, cheltuieli si tranzactii
Aplicatia are pagini separate pentru **Income**, **Expenses** si **Transactions**.  
Fiecare pagina foloseste **Axios** pentru a prelua datele din server, apoi afiseaza rezultatele sub forma de tabele si grafice.  
Pe paginile de venituri si cheltuieli sunt calculate automat totalurile, mediile si subcategoriile principale.

---

### 📅 Filtrare dupa an
Am adaugat un **YearFilter** reutilizabil care permite filtrarea tranzactiilor in functie de anul selectat.  
Anul curent este selectat automat, iar lista de ani disponibili este extrasa din datele existente.  
Filtrarea se aplica atat in dashboard, cat si in paginile pentru venituri si cheltuieli.



## ⚠️ Securitate și limitări

- Criptarea este doar o **demonstratie** (proof of concept).  
  Intr-o aplicatie reala, cheia secreta nu trebuie stocata în frontend.
- Fișierele CSV nu sunt salvate permanent, doar procesate local.






