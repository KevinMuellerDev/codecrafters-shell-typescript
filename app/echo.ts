export default function echo(value: string[]): void {
    const text = value.slice(1);
    console.log(text.join(" "));
}