export interface person {
    firstName: string;
    secondName: string;
    firstSurname: string;
    secondSurname: string;
    fatherName: string;
    motherName: string;
    pesel: string;
}

export interface location {
    city: string;
    commune: string;
    cityDistrict: string;
    district: string;
    voivodeship: string;
}

export interface document {
    department: string;
    number: string;
    checkDigit: string;
    location?: location;
    owners?: person[];
}