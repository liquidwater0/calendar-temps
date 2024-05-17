export default function convertTemp(temp: number, convertTo: "F" | "C") {
    if (convertTo === "F") {
        return (temp * 9/5) + 32;
    } else if (convertTo === "C") {
        return (temp - 32) * 5/9;
    } else {
        return temp;
    }
}