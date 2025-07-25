export default function createMessage(
  messages: { from: string; time: number; text: string }[],
  list: string[],
  id: string,
  name: string,
  customMessage?: string
) {
  const template = list[Math.floor(Math.random() * list.length)];

  messages.push({
    from: id,
    time: Date.now(),
    text: `${name.split(" ")[0]} ${template} ${
      customMessage ? customMessage : ""
    }`,
  });
}
