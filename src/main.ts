import { Page, chromium } from 'playwright';

import { parse } from 'ts-command-line-args';

interface CommandLineArgs {
    departmentCode: string;
    documentStartingNumber: number;
    documentQuantity: number;
};

const lettersScores = {
    "A": 11, "B": 12, "C": 13, "D": 14, "E": 15, "F": 16, "G": 17, "H": 18, "I": 19, "J": 20,
    "K": 21, "L": 22, "M": 23, "N": 24, "O": 25, "P": 26, "R": 27, "S": 28, "T": 29,
    "U": 30,  "W": 31, "X": 10, "Y": 32, "Z": 33, "0": 0, "1": 1, "2": 2, "3": 3, "4": 4,
    "5": 5, "6": 6, "7": 7, "8": 8, "9": 9
}

const positionsScores = [1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7];

function calculateControlDigit(kodWydzialu: string, numer: string): string {
    let result = 0;
    let letterScoring: number[] = [];
    for (const letter of kodWydzialu) {
        if (letter in lettersScores) {
            letterScoring.push(lettersScores[letter as keyof typeof lettersScores]);
        }
    }
    for (const letter of numer) {
        if (letter in lettersScores) {
            letterScoring.push(lettersScores[letter as keyof typeof lettersScores]);
        }
    }
    for (let i = 0; i < positionsScores.length; i++) {
        result += letterScoring[i] * positionsScores[i];
    }
    return (result % 10).toString();
}

async function runWithRetry(
    func: (page: Page) => Promise<void>,
    retryDelay = 2000
) {
    while (true) {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        try {
            await func(page);
            await browser.close();
            return;
        } catch (error) {
            console.error(error);
            await browser.close();
            if (error) {
                console.warn(`TimeoutError, retrying...`);
                await new Promise((res) => setTimeout(res, retryDelay));
            } else {
                throw error;
            }
        }
    }
}

async function performSearch(page: Page, departmentCode: string, documentNumber: number) {
    const checkDigit = calculateControlDigit(departmentCode, documentNumber.toString().padStart(8, `0`));
    page.context().clearCookies();
    await page.goto(`https://przegladarka-ekw.ms.gov.pl/eukw_prz/KsiegiWieczyste/wyszukiwanieKW`, {
        timeout: 5000
    });

    await page.waitForLoadState(`domcontentloaded`, { timeout: 5000 });
    await page.fill(`input[id='kodWydzialuInput']`, departmentCode);
    await page.fill(`input[id='numerKsiegiWieczystej']`, documentNumber.toString().padStart(8, `0`));
    await page.fill(`input[id='cyfraKontrolna']`, checkDigit.toString());
    await page.click(`button#wyszukaj`);
    await page.waitForLoadState(`domcontentloaded`);
    await page.waitForTimeout(500);
    const errorLocator = page.locator("#cyfraKontrolna\\.errors");
    if (await errorLocator.isVisible()) {
        console.log(`${departmentCode}/${documentNumber.toString().padStart(7, '0')}/${checkDigit}: Nie znaleziono księgi wieczystej.`);
    } else {
        console.log(`${departmentCode}/${documentNumber.toString().padStart(7, '0')}/${checkDigit}: Znaleziono księgę wieczystą.`);
        const documentNotFoundErrorElement = await page.waitForSelector("xpath=/html/body/div/div[2]/div/div[2]/div", { timeout: 2000 });
        if (documentNotFoundErrorElement) {
            const documentNotFoundErrorElementInnerText = await documentNotFoundErrorElement.innerText();
            if (documentNotFoundErrorElementInnerText.includes("nie została odnaleziona")) {
                console.log(`${departmentCode}/${documentNumber.toString().padStart(7, '0')}/${checkDigit}: Nie odnaleziono księgi wieczystej.`);
            }
        }
    }
}

async function main() {
    const args = parse<CommandLineArgs>({
        departmentCode: { type: String, defaultValue: `WR1K` },
        documentStartingNumber: { type: Number, defaultValue: 0 },
        documentQuantity: { type: Number, defaultValue: 100 },
    });

    for (let i = args.documentStartingNumber; i < args.documentStartingNumber + args.documentQuantity; i++) {
        let documentNumber = i;
        await runWithRetry((page) => performSearch(page, args.departmentCode, documentNumber))
            .then(() => console.log("Success!"))
            .catch((error) => console.error("Error:", error));
    }
}

main().catch(console.error);
