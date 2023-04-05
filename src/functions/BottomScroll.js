//Automatically scroll to bottom on message list div

export default function scrollToBottom(messagesEndRef) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
}