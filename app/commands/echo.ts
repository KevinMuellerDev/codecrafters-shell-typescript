export default function echo(value: string[]): void {
    const text = value.slice(1);
    const slicedText = text.join(" ");
    console.log(slicedText);
}