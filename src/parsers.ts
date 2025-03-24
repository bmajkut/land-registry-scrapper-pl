import { location, person } from "./interfaces";

import { Page } from "playwright";

export async function parseIO(page: Page) {
    // Rubryka 1.1 - Wzmianki w dziale I-O
    const table11 = page.locator('table:has(tbody tr:has(td:text("Rubryka 1.1 - Wzmianki w dziale I-O")))');
    const table11Rows = await table11.locator('tr').all();
    if (table11Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.1.`);
    }
    // Rubryka 1.2 - Numer nieruchomości
    const table12 = page.locator('table:has(tbody tr:has(td:text("Rubryka 1.2 - Numer nieruchomości")))');
    const table12Rows = await table12.locator('tr').all();
    if (table12Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.2.`);
    }
    // Rubryka 1.3 - Położenie
    const table13 = page.locator('table:has(tbody tr:has(td:text("Rubryka 1.3 - Położenie")))');
    const table13Rows = await table13.locator('tr').all();
    if (table13Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.3.`);
    }
    // Rubryka 1.4 - Oznaczenie
    const table14 = page.locator('table:has(tbody tr:has(td:text("Rubryka 1.4 - Oznaczenie")))');
    const table14Rows = await table14.locator('tr').all();
    if (table14Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.4.`);
    }
    // Podrubryka 1.4.1 - Działka ewidencyjna
    const table141 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 1.4.1 - Działka ewidencyjna")))');
    const table141Rows = await table141.locator('tr').all();
    if (table14Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.4.1.`);
    }
    // Podrubryka 1.4.2 - Budynek
    const table142 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 1.4.2 - Budynek")))');
    const table142Rows = await table142.locator('tr').all();
    if (table14Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.4.2.`);
    }
    // Podrubryka 1.4.3 - Urządzenie
    const table143 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 1.4.3 - Urządzenie")))');
    const table143Rows = await table143.locator('tr').all();
    if (table143Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.4.3.`);
    }
    // Podrubryka 1.4.4 - Lokal
    const table144 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 1.4.4 - Lokal")))');
    const table144Rows = await table144.locator('tr').all();
    if (table144Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.4.4.`);
    }
    // Rubryka 1.5 - Obszar
    const table15 = page.locator('table:has(tbody tr:has(td:text("Rubryka 1.5 - Obszar")))');
    const table15Rows = await table15.locator('tr').all();
    if (table15Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 1.5.`);
    }

    let rows = await table13.locator('tr').all();
    let voivodeship = ``;
    let district = ``;
    let commune = ``;
    let city = ``;
    let cityDistrict = ``;
    for (let i = 4; i < rows.length; i++) {
        const row = rows[i];
        const cells = await row.locator('td').all();
        let fieldName = ``;
        let fieldValue = ``;

        if (cells.length === 6) {
            fieldName = await cells[1]?.innerText();
            fieldValue = await cells[5]?.innerText();

        } else {
            fieldName = await cells[0]?.innerText();
            fieldValue = await cells[4]?.innerText();
        }
        if (fieldName && fieldValue) {
            switch (fieldName.trim()) {
                case '2. Województwo':
                    voivodeship = fieldValue.trim();
                    break;
                case '3. Powiat':
                    district = fieldValue.trim();
                    break;
                case '4. Gmina':
                    commune = fieldValue.trim();
                    break;
                case '5. Miejscowość':
                    city = fieldValue.trim();
                    break;
                case '6. Dzielnica':
                    cityDistrict = fieldValue.trim();
                    break;
            }
        }
    }

    const result: location = {
        city: city,
        commune: commune,
        cityDistrict: cityDistrict,
        district: district,
        voivodeship: voivodeship,
    };

    return result;
}

export async function parseII(page: Page): Promise<person[]> {
    // Podrubryka 2.2 - Właściciel
    const table22 = page.locator('table:has(tbody tr:has(td:text("Rubryka 2.2 - Właściciel")))');

    // Podrubryka 2.2.1 - Udział
    const table221 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.2.1 - Udział")))');
    const table221Rows = await table221.locator('tr').all();
    if (table221Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 2.2.1.`);
    }
    // Podrubryka 2.2.2 - Skarb Państwa
    const table222 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.2.2 - Skarb Państwa")))');
    const table222Rows = await table222.locator('tr').all();
    if (table222Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 2.2.2.`);
    }
    // Podrubryka 2.2.3 - Jednostka samorządu terytorialnego (związek międzygminny)
    const table223 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.2.3 - Jednostka samorządu terytorialnego (związek międzygminny)")))');
    const table223Rows = await table223.locator('tr').all();
    if (table223Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 2.2.3.`);
    }
    // Podrubryka 2.2.4 - Inna osoba prawna lub jednostka organizacyjna niebędąca osobą prawną
    const table224 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.2.4 - Inna osoba prawna lub jednostka organizacyjna niebędąca osobą prawną")))');
    const table224Rows = await table224.locator('tr').all();
    if (table224Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 2.2.4.`);
    }
    // Podrubryka 2.2.5 - Osoba fizyczna
    const table225 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.2.5 - Osoba fizyczna")))');
    const table225Rows = await table225.locator('tr').all();
    if (table225Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w podrubryce 2.2.5.`);
    }
    // Rubryka 2.3 - Właściciel wyodrębnionego lokalu
    const table23 = page.locator('table:has(tbody tr:has(td:text("Rubryka 2.3 - Właściciel wyodrębnionego lokalu")))');
    const table23Rows = await table23.locator('tr').all();
    if (table23Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.3.`);
    }
    // Rubryka 2.4 - Użytkownik wieczysty
    const table24 = page.locator('table:has(tbody tr:has(td:text("Rubryka 2.4 - Użytkownik wieczysty")))');

    // Podrubryka 2.4.1 - Napis
    const table241 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.4.1 - Napis")))');
    const table241Rows = await table241.locator('tr').all();
    if (table241Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.4.1.`);
    }
    // Podrubryka 2.4.2 - Udział
    const table242 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.4.2 - Udział")))');
    const table242Rows = await table242.locator('tr').all();
    if (table242Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.4.2.`);
    }
    // Podrubryka 2.4.3 - Skarb Państwa
    const table243 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.4.3 - Skarb Państwa")))');
    const table243Rows = await table243.locator('tr').all();
    if (table243Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.4.3.`);
    }
    // Podrubryka 2.4.4 - Jednostka samorządu terytorialnego (związek międzygminny)
    const table244 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.4.4 - Jednostka samorządu terytorialnego (związek międzygminny)")))');
    const table244Rows = await table244.locator('tr').all();
    if (table244Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.4.4.`);
    }
    // Podrubryka 2.4.5 - Inna osoba prawna lub jednostka organizacyjna niebędąca osobą prawną
    const table245 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.4.5 - Inna osoba prawna lub jednostka organizacyjna niebędąca osobą prawną")))');
    const table245Rows = await table245.locator('tr').all();
    if (table245Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.4.5.`);
    }
    // Podrubryka 2.4.6 - Osoba fizyczna
    const table246 = page.locator('table:has(tbody tr:has(td:text("Podrubryka 2.4.6 - Osoba fizyczna")))');
    const table246Rows = await table246.locator('tr').all();
    if (table246Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.4.6.`);
    }
    // Rubryka 2.5 - Uprawniony
    const table25 = page.locator('table:has(tbody tr:has(td:text("Rubryka 2.5 - Uprawniony")))');
    const table25Rows = await table25.locator('tr').all();
    if (table25Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.5.`);
    }
    // Rubryka 2.6 - Podstawa nabycia
    const table26 = page.locator('table:has(tbody tr:has(td:text("Rubryka 2.6 - Podstawa nabycia")))');
    const table26Rows = await table26.locator('tr').all();
    if (table26Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.6.`);
    }
    // Rubryka 2.7 - Dane o wniosku i chwili wpisu
    const table27 = page.locator('table:has(tbody tr:has(td:text("Rubryka 2.7 - Dane o wniosku i chwili wpisu")))');
    const table27Rows = await table27.locator('tr').all();
    if (table27Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.7.`);
    }
    // Rubryka 2.8 - Komentarz
    const table28 = page.locator('table:has(tbody tr:has(td:text("Rubryka 2.8 - Komentarz")))');
    const table28Rows = await table28.locator('tr').all();
    if (table28Rows.length > 2) {
        console.log(`\tZnaleziono wpisy w rubryce 2.8.`);
    }

    let people: person[] = [];
    let person: person = {
        firstName: ``,
        secondName: ``,
        firstSurname: ``,
        secondSurname: ``,
        fatherName: ``,
        motherName: ``,
        pesel: ``
    };
    for (let i = 5; i < table225Rows.length; i++) {
        const row = table225Rows[i];

        const cells = await row.locator('td').all();
        let fieldName = ``;
        let fieldValue = ``;

        if (cells.length === 6) {
            person = {
                firstName: ``,
                secondName: ``,
                firstSurname: ``,
                secondSurname: ``,
                fatherName: ``,
                motherName: ``,
                pesel: ``
            };
            fieldName = await cells[5]?.innerText();
            fieldValue = await cells[2]?.innerText();

        } else {
            fieldName = await cells[0]?.innerText();
            fieldValue = await cells[4]?.innerText();
        }

        if (fieldName && fieldValue) {
            switch (fieldName.trim()) {
                case '2. Imię pierwsze':
                    person.firstName = fieldValue.trim();
                    break;
                case '3. Imię drugie':
                    person.secondName = fieldValue.trim();
                    break;
                case '4. Nazwisko / pierwszy człon nazwiska złożonego':
                    person.firstSurname = fieldValue.trim();
                    break;
                case '5. Drugi człon nazwiska złożonego':
                    person.secondSurname = fieldValue.trim();
                    break;
                case '6. Imię ojca':
                    person.fatherName = fieldValue.trim();
                    break;
                case '7. Imię matki':
                    person.motherName = fieldValue.trim();
                    break;
                case '8. PESEL':
                    person.pesel = fieldValue.trim();
                    break;
            }
        }
        if (fieldName === '8. PESEL') {
            people.push(person);
        }
    }

    return people;
}